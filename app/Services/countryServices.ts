import { Country } from "../Models/Country";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/countries"
    : "https://www.eattheworld.se/api/countries";

export const createNewCountry = async (data: Country) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data }),
  });
};

export const getAllCountries = async () => {
  const response = await fetch(url, {
    next: { revalidate: 10 },
  });

  return response.json();
};
