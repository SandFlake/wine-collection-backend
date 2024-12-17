import Winemaker from "../models/Winemaker";
import { handleErrors } from "../utils/errorHandler";
import { RouteHandler } from "../utils/types";

const deleteWinemaker: RouteHandler = async (req, res) => {
  try {
    const deletedWinemaker = await Winemaker.findByIdAndDelete(req.params.id);
    if (!deletedWinemaker) {
      res.status(404).json({ error: "Winemaker not found" });
      return;
    }

    res.status(200).json({ msg: "Winemaker deleted successfully" });
  } catch (error) {
    handleErrors(res, error);
  }
};

const getWinemakers: RouteHandler = async (req, res) => {
  try {
    const winemakers = await Winemaker.find();
    if (!winemakers || winemakers.length === 0) {
      res.status(404).json({ msg: "No winemakers found" });
      return;
    }
    res.json(winemakers);
  } catch (error) {
    handleErrors(res, error);
  }
};

const getWinemakerById: RouteHandler = async (req, res) => {
  try {
    const winemaker = await Winemaker.findById(req.params.id);
    if (!winemaker) {
      res.status(404).json({ error: "Winemaker not found" });
      return;
    }
    res.json(winemaker);
  } catch (error) {
    handleErrors(res, error);
  }
};

const postWinemaker: RouteHandler = async (req, res) => {
  try {
    const winemaker = await Winemaker.create(req.body);
    res.status(201).json(winemaker);
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateWinemaker: RouteHandler = async (req, res) => {
  try {
    const winemaker = await Winemaker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(winemaker);
  } catch (error) {
    handleErrors(res, error);
  }
};

export {
  deleteWinemaker,
  getWinemakers,
  getWinemakerById,
  postWinemaker,
  updateWinemaker,
};
