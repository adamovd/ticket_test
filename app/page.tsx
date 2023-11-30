"use client";
import React, { useEffect, useState } from "react";
import { getAllCountries } from "./Services/countryServices";
import { Country } from "./Models/Country";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    getAllCountries().then((response) => {
      console.log(response);
      setCountries(response);
    });
  });
  return (
    <>
      <h1>Home</h1>
      {countries.map((country, index) => {
        <>
          <h3>{country.name}</h3>
          <p>{country.description}</p>
        </>;
      })}
    </>
  );
};

export default Home;
