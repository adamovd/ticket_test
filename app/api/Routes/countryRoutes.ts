import express from "express";
import {
  createCountry,
  getAllCountries,
} from "../Controllers/countryController";

const router = express.Router();

router.get("/", getAllCountries);

router.post("/", createCountry);

export { router as countryRouter };
