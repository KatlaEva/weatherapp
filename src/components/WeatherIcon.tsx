/** @format */

import React from "react";
import Image from "next/image";

type Props = {};

export default function WeatherIcon(
  props: { iconName: string }
) {
  return (
    <div className="relative h-20 w-20" title={props.iconName}>
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
        src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}
      />
    </div>
  );
}