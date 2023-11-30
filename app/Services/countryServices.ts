import { Country } from "../Models/Country";

const createNewCountry = async (data: Country) => {
  fetch("https://www.eattheworld.se/api/countries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export default createNewCountry;
