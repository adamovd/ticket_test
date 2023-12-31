import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { Recipe } from "./Recipe";

type Country = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  population: number;
  lat: number;
  lng: number;
  imageUrl: string;
  recipes: Recipe[];
  playlistUrl: string;
};

interface CountryDoc extends mongoose.Document {
  name: string;
  description: string;
  population: number;
  lat: number;
  lng: number;
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
  lng: {
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
  console.log(attr);

  return new Country(attr);
};

export { Country };
