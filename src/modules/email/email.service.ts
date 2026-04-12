import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "corescue6@gmail.com",
    pass: "ubot woed gcrh oskm",
  },
});

export const sendEmailsService = async (data: any) => {
  const { emailData, latitude, longitude } = data;
  try {
    const emailPromises = emailData.map(async (email: any) => {
      const mailOptions = {
        from: "corescue6@gmail.com",
        to: email.email,
        subject: "Alert",
        html: `Emergency at ${latitude} ${longitude}`,
      };
      return transporter.sendMail(mailOptions);
    });

    const emailResponses = await Promise.all(emailPromises);
    console.log("Emails sent successfully:", emailResponses);
    return { status: 200, payload: { success: true, message: "Emails sent successfully" } };
  } catch (error: any) {
    console.error("Error sending emails:", error);
    throw new Error(error.message);
  }
};
