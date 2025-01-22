import { Schema, model } from "mongoose";

const languageSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Language = model("Language", languageSchema);
export default Language;
