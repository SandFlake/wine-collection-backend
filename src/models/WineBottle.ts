import mongoose, { Schema, Document } from "mongoose";

export interface IWineBottle extends Document {
  id: string;
  name: string;
  year: number;
  size: string;
  countInCellar: number;
  style: string;
  taste: string[];
  description: string;
  foodPairing: string;
  link: string;
  image: string;
  winemakerId: mongoose.Types.ObjectId;
}

const WineBottleSchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  size: { type: String, required: true },
  countInCellar: { type: Number, default: 0 },
  style: { type: String, required: true },
  taste: { type: [String], default: [] },
  description: { type: String, default: "" },
  foodPairing: { type: String, default: "" },
  link: { type: String, default: "" },
  image: { type: String, default: "" },
  winemakerId: {
    type: Schema.Types.ObjectId,
    ref: "Winemaker",
    required: true,
  },
});

WineBottleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

WineBottleSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IWineBottle>("WineBottle", WineBottleSchema);
