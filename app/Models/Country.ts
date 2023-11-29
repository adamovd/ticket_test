import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { Recipe } from "./Recipe";

type Country = {
  name: string;
  description: string;
  population: number;
  lat: number;
  lon: number;
  imageUrl: string;
  recipes: Recipe[];
  playlistUrl: string;
};

interface CountryDoc extends mongoose.Document {
  name: string;
  description: string;
  population: number;
  lat: number;
  lon: number;
  imageUrl: string;
  recipes: [];
  playlistUrl: string;
}

interface CountryModelInterface extends mongoose.Model<CountryDoc> {
  build(attr: Country): CountryDoc;
}

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  population: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  recipes: [],
  playlistUrl: {
    type: String,
  },
});

const Country = mongoose.model<CountryDoc, CountryModelInterface>(
  "Country",
  countrySchema
);

countrySchema.statics.build = (attr: Country) => {
  return new Country(attr);
};

export { Country };
