"use client";
import React, { useEffect, useState } from "react";
import { getAllCountries } from "../Services/countryServices";
import { Country } from "../Models/Country";
import Image from "next/image";
import { format } from "date-fns";

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Added Countries
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {countries.map((country, index) => (
            <div key={index} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={country.imageUrl}
                  alt={country.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width={400}
                  height={400}
                />
              </div>
              <div className="mt-4 flex-col justify-between">
                <div>
                  <h2 className="text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {country.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {country.description}
                  </p>
                </div>
                <small className="text-sm font-medium text-gray-900">
                  Created:{" "}
                  {format(
                    new Date(country.createdAt),
                    "dd/MM/yyyy - HH:mm"
                  ).toString()}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
