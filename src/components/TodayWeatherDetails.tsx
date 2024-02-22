import { convertKelvinToCelsius } from "@/Utilities/convertKalvinToCelcius";
import { WeatherData } from "@/types/types";
import { Card, CardContent } from "@mui/material";
import { format, parseISO } from "date-fns";
import React from "react";
import WeatherIcon from "./WeatherIcon";

type Props = {
    weatherData?: WeatherData;
}



export default function TodayWeatherDetails({ weatherData }: Props) {

    const firstdata = weatherData?.list[0];

    return (
        <main className="px-20 mx-auto flex w-full">
            <Card className="flex gap-10 w-90 mx-auto sm:gap-16 items-center">
                <CardContent>
                    <div className=" flex flex-col px-4 h-auto items-center">
                        <p className="text-5xl">
                            {convertKelvinToCelsius(weatherData?.list[0].main.temp ?? 296.37)}°
                        </p>
                        <p className="text-s space-x-2 whitespace-nowrap font-semibold">
                            <span>Feels like</span>
                            <span>
                                {convertKelvinToCelsius(weatherData?.list[0].main.feels_like ?? 0)}°
                            </span>
                        </p>
                        <p className="text-s space-x-2 font-semibold">
                            <span className="text-red-700">
                                {" "}{convertKelvinToCelsius(weatherData?.list[0].main.temp_max ?? 0)}°↑
                            </span>
                            <span className="text-blue-700">
                                {convertKelvinToCelsius(weatherData?.list[0].main.temp_min ?? 0)}°↓{" "}
                            </span>
                        </p>
                    </div>
                </CardContent>
                <CardContent className="overflow-x-auto">
                    <div className="flex gap-10 sm:gap-6 overflow-x-auto w-full justify-between pr-3">
                        {weatherData?.list.map((d, i) => (
                            <div
                                key={i}
                                className="flex flex-col justify-between gap-2 items-center text-xs font-semibold pb-4">
                                <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                                <WeatherIcon iconName={d.weather[0].icon} />
                                <p>{convertKelvinToCelsius(d.main.temp ?? 0)}°</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}