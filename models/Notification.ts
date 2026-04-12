import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    latitude:{
      type:String,
      required:true
    },
    longitude:{
      type:String,
      required:true
    },
  },
  
  { timestamps: true }

);

export default mongoose.model("notification", NotificationSchema);