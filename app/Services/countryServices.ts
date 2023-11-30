import axios from "axios";
import { Country } from "../Models/Country";

export const createNewCountry = async ({ ...data }: Country) => {
  fetch("https://www.eattheworld.se/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};
