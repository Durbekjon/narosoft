import { Schema, model } from "mongoose";

const languageSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  flag: String,
  dial_code: String,
});

const Language = model("Language", languageSchema);
export default Language;
