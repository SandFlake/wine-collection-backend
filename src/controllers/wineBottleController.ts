import { handleErrors } from "../utils/errorHandler";
import { RouteHandler } from "../utils/types";
import WineBottle from "../models/WineBottle";
import {
  buildRangeQuery,
  caseInsensitiveRegex,
  parseTastes,
  parseYears,
} from "../utils/queryHelpers";
import { Request, Response } from "express";

const deleteWineBottle: RouteHandler = async (req, res) => {
  try {
    const deletedWineBottle = await WineBottle.findByIdAndDelete(req.params.id);
    if (!deletedWineBottle) {
      res.status(404).json({ error: "Wine bottle not found" });
      return;
    }
    res.status(200).json({ msg: "Wine bottle deleted successfully" });
  } catch (error) {
    handleErrors(res, error);
  }
};

const getWineBottles: RouteHandler = async (req, res) => {
  try {
    const { winemakerId, style, year, taste, name, minCount, maxCount } =
      req.query;
    const query: any = {};

    // Filter by winemaker
    if (winemakerId) {
      query.winemakerId = winemakerId;
    }

    // Filter by style
    if (style) {
      if (typeof style !== "string") {
        throw new Error("Invalid style filter: must be a string");
      }
      query.style = caseInsensitiveRegex(style as string);
    }

    // Filter by year range
    if (year) {
      if (typeof year !== "string" && typeof year !== "object") {
        throw new Error(
          "Invalid year filter: must be a number or a range object"
        );
      }
      query.year = parseYears(year as string);
    }

    // Filter by taste
    if (taste) {
      query.taste = { $all: parseTastes(taste as string) };
    }

    // Filter by name
    if (name) {
      query.name = caseInsensitiveRegex(name as string);
    }

    // Filter by count in cellar range
    if (minCount || maxCount) {
      query.countInCellar = buildRangeQuery(
        minCount as string,
        maxCount as string
      );
    }

    const wineBottles = await WineBottle.find(query);
    if (!wineBottles || wineBottles.length === 0) {
      res
        .status(404)
        .json({ error: "Wine bottles matching filters not found" });
      return;
    }
    res.json(wineBottles);
  } catch (error) {
    handleErrors(res, error);
  }
};

const getWineBottleById: RouteHandler = async (req, res) => {
  try {
    const wineBottle = await WineBottle.findById(req.params.id);
    if (!wineBottle) {
      res.status(404).json({ error: "Wine bottle not found" });
      return;
    }
    res.json(wineBottle);
  } catch (error) {
    handleErrors(res, error);
  }
};

const postWineBottle: RouteHandler = async (req, res) => {
  try {
    const wineBottle = await WineBottle.create(req.body);
    res.status(201).json(wineBottle);
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateWineBottle: RouteHandler = async (req, res) => {
  try {
    const wineBottle = await WineBottle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(wineBottle);
  } catch (error) {
    handleErrors(res, error);
  }
};

const uploadWineBottleImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bottleId = req.params.id;

    // Ensure file was uploaded
    if (!req.file) {
      res.status(400).json({ error: "No image file uploaded." });
      return;
    }

    // Find the wine bottle by ID
    const wineBottle = await WineBottle.findById(bottleId);
    if (!wineBottle) {
      res.status(404).json({ error: "Wine bottle not found." });
      return;
    }

    const imagePath = `uploads/${req.file.filename}`;
    const imageURL = `${req.protocol}://${req.get("host")}/${imagePath}`;

    // Update the wine bottle with image path and link
    wineBottle.image = imagePath;
    wineBottle.link = imageURL;

    await wineBottle.save();

    res.status(200).json({
      message: "Image uploaded successfully to wine bottle.",
      bottle: wineBottle,
    });
  } catch (error) {
    handleErrors(res, error);
  }
};

export {
  deleteWineBottle,
  getWineBottles,
  getWineBottleById,
  postWineBottle,
  updateWineBottle,
  uploadWineBottleImage,
};
