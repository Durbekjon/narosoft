import { isObjectIdOrHexString } from "mongoose";
import { createError } from "../../common/handlers/error.handler.js";
import Language from "./language.model.js";
import {
  createCache,
  deleteCache,
  getCache,
} from "../../common/services/redis.service.js";

// Create a new language
export const createLanguage = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(createError(400, "Name is required"));
    }

    const isDataExist = await Language.findOne({ name });
    if (isDataExist) {
      return next(createError(400, "Language already exists"));
    }

    const data = await Language.create({ name });
    await Promise.all([
      createCache("language/" + data.id, data),
      deleteCache("languages"),
    ]);
    res.status(201).json(data);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Get all languages
export const getAllLanguages = async (req, res, next) => {
  try {
    let data = await getCache("languages");
    console.log(data);
    if (!data) {
      data = await Language.find();
      await createCache("languages", data);
    }
    cleanLanguageCaches();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(createError(500, error.message));
  }
};

// Get a language by ID
export const getLanguageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isObjectIdOrHexString(id)) return next(createError(400, "Invalid ID"));

    const language = await Language.findById(id);
    if (!language) {
      return next(createError(404, "Language not found"));
    }

    return res.status(200).json(language);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Update a language
export const updateLanguage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!isObjectIdOrHexString(id)) return next(createError(400, "Invalid ID"));

    if (!name) {
      return next(createError(400, "Name is required"));
    }

    const data = await Language.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!data) {
      return next(createError(404, "Language not found"));
    }

    await Promise.all([
      createCache("language/" + data.id, data),
      deleteCache("languages"),
    ]);

    return res.status(200).json(data);
  } catch (error) {
    next(createError(500, error.message));
  }
};

// Delete a language
export const deleteLanguage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id)) return next(createError(400, "Invalid ID"));

    const data = await Language.findByIdAndDelete(id);
    if (!data) {
      return next(createError(404, "Language not found"));
    }

    await Promise.all([
      deleteCache("languages"),
      deleteCache("languages/" + data.id),
    ]);

    return res.status(200).json({ result: "OK" });
  } catch (error) {
    next(createError(500, error.message));
  }
};
