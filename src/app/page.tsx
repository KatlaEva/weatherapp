/** @format */
"use client";

import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { WeatherData } from '../types/types';
import { format, parseISO } from "date-fns";
import TodayWeatherDetails from "@/components/TodayWeatherDetails";

//appid visable, needs to be protected
export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>("repoData", async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=reykjavik&appid=1abd7fc9eda97d21468b871ad07970e5&cnt=56`)
    return data;
  }
  )

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center min-h-screen justify-center">
      <p>Error</p>
    </div>
  );

//Getting first entry for todays date
  const firstdata = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
      <Navbar />
      <main className="px-20 mx-auto flex flex-col w-full pt-4 ">
        <section className="space-y-4 ">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl  items-end ">
              <p className="text-sm">{format(parseISO(firstdata?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-sm">{format(parseISO(firstdata?.dt_txt ?? ""), "(dd/MM/yyyy)")}</p>
            </h2>
          </div>
        </section>
      </main>
      <TodayWeatherDetails weatherData={data} />
      <ForecastWeatherDetails weatherData={data} />
    </div>
  )
}