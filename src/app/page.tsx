/** @format */
"use client";

import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useQuery } from "react-query";


//types from weather api, might delete some later.
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Snow {
  '3h': number;
}

interface Sys {
  pod: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface ListItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  snow?: Snow;
  sys: Sys;
  dt_txt: string;
}

interface Coord {
  lat: number;
  lon: number;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: ListItem[];
  city: City;
}


export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>("repoData", async () => 
  {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=reykjavik&appid=1abd7fc9eda97d21468b871ad07970e5&cnt=56`)
      return data;
  }
  )
  console.log(data)

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )

  return (
 <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
  <Navbar/>
  <ForecastWeatherDetails/>
 </div>
  )
}