import axios from "axios";
import { Country } from "../Models/Country";

const createNewCountry = async ({
  name,
  description,
  population,
  lat,
  lon,
  imageUrl,
  playlistUrl,
}: Country) => {
  let response = await axios.post<Country>(
    "http://localhost:5127/api/v1/countries",
    {
      name: name,
      description: description,
      population: population,
      lat: lat,
      lon: lon,
      imageUrl: imageUrl,
      recipes: [],
      playlistUrl: playlistUrl,
    }
  );
  return response.data;
};

export default createNewCountry;
