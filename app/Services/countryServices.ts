import axios from "axios";
import { Country } from "../Models/Country";

const createNewCountry = async ({
  name,
  description,
  population,
  lat,
  lng,
  imageUrl,
  playlistUrl,
}: Country) => {
  let response = await axios.post<Country>(
    "https://www.eattheworld.se/api/register",
    {
      name: name,
      description: description,
      population: population,
      lat: lat,
      lng: lng,
      imageUrl: imageUrl,
      recipes: [],
      playlistUrl: playlistUrl,
    }
  );
  return response.data;
};

export default createNewCountry;
