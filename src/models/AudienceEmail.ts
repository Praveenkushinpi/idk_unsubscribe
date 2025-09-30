import mongoose, { Schema, model, models } from "mongoose";

const AudienceSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: String,
  joinedAt: { type: Date, default: Date.now },
});

const AudienceEmail = models.AudienceEmail || model("AudienceEmail", AudienceSchema);
export default AudienceEmail;
