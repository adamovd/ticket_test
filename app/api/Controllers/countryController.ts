import { Country } from "../../Models/Country";
import { Request, Response } from "express";

export const getAllCountries = async (req: Request, res: Response) => {
  const countries = await Country.find();
  const totalAmount = await Country.countDocuments();

  return res.json({
    data: countries,
    meta: {
      count: countries.length,
      total: totalAmount,
    },
  });
};

export const createCountry = async (req: Request, res: Response) => {
  const {
    name,
    description,
    population,
    lat,
    lng,
    imageUrl,
    recipes,
    playlistUrl,
  } = req.body;
  try {
    const country = Country.create({
      name,
      description,
      population,
      lat,
      lng,
      imageUrl,
      recipes,
      playlistUrl,
    });

    (await country).save();
    console.log(country);
    return res.status(201).json(country);
  } catch (error: unknown) {
    return res.status(500).json({ message: error });
  }
};
