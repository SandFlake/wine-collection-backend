import { Response } from "express";

export const handleErrors = (res: Response, error: unknown): void => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred." });
  }
};
