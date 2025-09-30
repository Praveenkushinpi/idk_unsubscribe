import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface InWaitlistEmail extends Document {
  email: string;
  createdAt: Date;
  username: string;
  lastsenseAt?: Date;
}


const WaitlistEmailSchema = new Schema<InWaitlistEmail>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
});


const WaitlistEmail = mongoose.models.WaitlistEmail ||
  mongoose.model<InWaitlistEmail>("WaitlistEmail", WaitlistEmailSchema);

export default WaitlistEmail;
