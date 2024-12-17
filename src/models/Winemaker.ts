import mongoose, { Schema, Document } from "mongoose";

export interface IWinemaker extends Document {
  id: string;
  name: string;
  address: string;
}

const WinemakerSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

WinemakerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

WinemakerSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IWinemaker>("Winemaker", WinemakerSchema);
