"use client";
import React, { useEffect } from "react";
import { getAllCountries } from "./Services/countryServices";

const Home = () => {
  useEffect(() => {
    getAllCountries().then((response) => {
      console.log(response.json());
    });
  });
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
