/** @format */
"use client";

import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { WeatherData } from '../types/types';
import TodayWeatherDetails from "@/components/TodayWeatherDetails";
import { useAtom } from "jotai";
import { placeAtom } from "./atoms";
import { useEffect } from "react";

//appid visable, needs to be protected before publishing
export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  
  const { isLoading, error, data, refetch } = useQuery<WeatherData>("repoData", async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=1abd7fc9eda97d21468b871ad07970e5&cnt=56`)
    return data;
  }
  )

  useEffect(() => {
    refetch();
  }, [place, refetch])

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
  const firstDataToday = data?.list[0];

  return (
    <div className="flex flex-col gap-4 bg-gradient-to-b from-indigo-100 ... min-h-screen ">
      <Navbar location={data?.city.name} />
      <main className="px-20 mx-auto flex flex-col w-full pt-4 ">
        <section className="space-y-4 ">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl  items-end ">
              <p className="text-s">Today</p>
            </h2>
          </div>
        </section>
      </main>
      <TodayWeatherDetails weatherData={data} />
      <section className="space-y-4 px-20 mx-auto flex flex-col w-full pt-4 ">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl  items-end ">
              <p className="text-s">5 day weather forecast</p>
            </h2>
          </div>
        </section>
      <ForecastWeatherDetails weatherData={data} />
    </div>
  )
}