import { findReliefCenters } from "../relief/relief.repository";
import { sendSOSEmail } from "../../utils/email.service";
import dotenv from "dotenv";

dotenv.config();

// Default values from .env or fallbacks
const getMAX_DISTANCE = () => parseInt(process.env.MAX_DISTANCE_KM || "30");
const getMAX_ALERTS = () => parseInt(process.env.MAX_ALERTS || "5");

// In-memory rate limiting map: key (userId or IP) -> timestamp
const lastSOSRequest = new Map<string, number>();
const COOLDOWN_SECONDS = 60;

/**
 * Calculates the distance between two points on Earth using the Haversine formula.
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface SOSRequestPayload {
  latitude: number;
  longitude: number;
  weather: string;
  sos_message: string;
  timestamp: string;
  requesterKey: string; // userId or IP
}

/**
 * Orchestrates the SOS alerting process with rate limiting and detailed reporting.
 */
export const processSOSAlert = async (payload: SOSRequestPayload) => {
  const { latitude, longitude, weather, sos_message, timestamp, requesterKey } = payload;
  
  // 1. Rate Limiting Check
  const now = Date.now();
  const lastRequestTime = lastSOSRequest.get(requesterKey);
  
  if (lastRequestTime && (now - lastRequestTime) < COOLDOWN_SECONDS * 1000) {
    const remaining = Math.ceil((COOLDOWN_SECONDS * 1000 - (now - lastRequestTime)) / 1000);
    throw new Error(`Rate limit exceeded. Please wait ${remaining} seconds before sending another SOS.`);
  }

  // Update last request time
  lastSOSRequest.set(requesterKey, now);

  console.log(`Processing SOS Alert for ${requesterKey} at (${latitude}, ${longitude})`);

  // 2. Fetch all relief centers
  const allCenters = await findReliefCenters();
  
  const MAX_DISTANCE_KM = getMAX_DISTANCE();
  const MAX_ALERTS = getMAX_ALERTS();

  // 3. Calculate distances and filter
  const candidateCenters = allCenters
    .map((center: any) => {
      const dist = calculateDistance(
        latitude,
        longitude,
        parseFloat(center.latitude),
        parseFloat(center.longitude)
      );
      return { 
        name: center.CenterName, 
        email: center.email, 
        distance: dist 
      };
    })
    .filter(center => center.email && center.distance <= MAX_DISTANCE_KM)
    .sort((a, b) => a.distance - b.distance);

  // 4. Select top centers
  const selectedCenters = candidateCenters.slice(0, MAX_ALERTS);

  let recipients: string[] = [];
  let fallbackUsed = false;
  
  if (selectedCenters.length > 0) {
    console.log(`Found ${selectedCenters.length} centers within ${MAX_DISTANCE_KM}km`);
    recipients = selectedCenters.map(c => c.email);
  } else {
    const fallbackEmail = process.env.EMAIL_FALLBACK;
    if (fallbackEmail) {
      console.warn(`No centers within ${MAX_DISTANCE_KM}km. Using fallback: ${fallbackEmail}`);
      recipients = [fallbackEmail];
      fallbackUsed = true;
    } else {
      throw new Error("No nearby relief centers found and no fallback configured.");
    }
  }

  // 5. Send emails in parallel
  const emailPromises = recipients.map(email => 
    sendSOSEmail({
      to: email,
      latitude,
      longitude,
      weather,
      sos_message,
      timestamp
    })
  );

  const results = await Promise.allSettled(emailPromises);
  const successCount = results.filter(r => r.status === 'fulfilled').length;
  const failedCount = results.length - successCount;

  return {
    success: successCount > 0,
    sent: successCount,
    failed: failedCount,
    fallbackUsed
  };
};
