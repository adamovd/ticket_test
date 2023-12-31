"use client";
import { useForm, Resolver } from "react-hook-form";
import { Country } from "../../Models/Country";
import { createNewCountry } from "../../Services/countryServices";
import { UploadButton } from "../../utils/uploadthing";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { countryList } from "../../utils/countryList";

// eslint-disable-next-line @next/next/no-async-client-component
export default function CountryForm() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [uploading, setUploading] = useState(false);

  const defaultOption = "Select a country";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Country>();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await createNewCountry(data);
      reset();
    } catch (error) {
      console.error("Error creating new country:", error);
    }
  });

  const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountryValue = e.target.value;
    setSelectedCountry(selectedCountryValue);
    setValue("name", selectedCountryValue);
    const country = countryList.find(
      (country) => country.name === selectedCountryValue
    );
    console.log(country?.code);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${country?.code}?fields=latlng,population`
      );

      const countryInfo = response.data;

      setValue("population", countryInfo.population);
      setValue("lat", countryInfo.latlng[0]);
      setValue("lng", countryInfo.latlng[1]);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const handleUploadComplete = (res: any[]) => {
    const url = res.map((image) => {
      return image.url;
    });
    setValue("imageUrl", url.toString());
    setUploading(false);
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <form onSubmit={onSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select a country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected>
                      {defaultOption}
                    </option>
                    {countryList.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description")}
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    placeholder="Short description of the country's food culture"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <div className="flex sm:max-w-md">
                    <UploadButton
                      endpoint="imageUploader"
                      onUploadBegin={() => setUploading(true)}
                      onClientUploadComplete={handleUploadComplete}
                      onUploadError={handleUploadError}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="playlistUrl"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Playlist
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      {...register("playlistUrl")}
                      placeholder="URL to playlist"
                      id="playlistUrl"
                      name="playlistUrl"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading === true}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
