import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CollectionCenterSchema = new Schema(
  {
    CenterName: {
      type: String,
      required: true,
    },
    InCharge: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true, 
      unique: true,
    },
    Address:{
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    }
},
  
  { timestamps: true }

);

export default mongoose.model("collectionCenter", CollectionCenterSchema);
