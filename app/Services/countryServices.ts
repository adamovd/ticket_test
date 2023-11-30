import { Country } from "../Models/Country";

export const createNewCountry = async (data: Country) => {
  fetch("https://www.eattheworld.se/api/countries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getAllCountries = async () => {
  const response = await fetch("https://www.eattheworld.se/api/countries", {
    next: { revalidate: 10 },
  });
  console.log(response);

  return response;
};
