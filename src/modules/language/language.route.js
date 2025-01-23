import { Router } from "express";
import {
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
} from "./language.controller.js";

const router = Router();

router.get("/", getAllLanguages); // Read all
router.get("/:id", getLanguageById); // Read one
router.put("/:id", updateLanguage); // Update
router.delete("/:id", deleteLanguage); // Delete

export default router;
