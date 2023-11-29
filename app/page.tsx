"use client";
import { useForm, Resolver } from "react-hook-form";
import { Country } from "./Models/Country";
import createNewCountry from "./Services/countryServices";
import { UploadButton } from "./utils/uploadthing";
import axios from "axios";

const resolver: Resolver<Country> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

// eslint-disable-next-line @next/next/no-async-client-component
export default function CountryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Country>({ resolver });
  const onSubmit = handleSubmit(async (data) => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${data.name}?fields=latlng,population`
        );
        return response.data[0]; // Assuming data is an array and taking the first result
      } catch (error) {
        console.error("Error fetching country data:", error);
        return null;
      }
    };

    const countryInfo = await getInfo();

    if (countryInfo) {
      setValue("population", countryInfo.population);
      setValue("lat", countryInfo.latlng[0]);
      setValue("lon", countryInfo.latlng[1]);
    }

    console.log(data);
    await createNewCountry(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    {...register("name")}
                    placeholder="Name of the country"
                    id="name"
                    name="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                  {errors?.name && <p>{errors.name.message}</p>}
                </div>
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

            {/* <div className="border-b border-gray-900/10 pb-12 col-span-8">
              <h4 className="text-base font-semibold leading-7 text-gray-900">
                Information
              </h4>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-9">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="population"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Population
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("population")}
                      type="number"
                      name="population"
                      id="population"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="lat"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Latitude
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("lat")}
                      type="int"
                      name="lat"
                      id="lat"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="lon"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Longitude
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("lon")}
                      type="int"
                      name="lon"
                      id="lon"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div> */}

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
                    onClientUploadComplete={(res: any[]) => {
                      console.log("Files: ", res);
                      const url = res.map((image) => {
                        return image.url;
                      });
                      setValue("imageUrl", url.toString());
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
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
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
