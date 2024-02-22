import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { WeatherData, ListItem } from "@/types/types";
import { Backdrop, Box, Fade, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format, fromUnixTime, parseISO } from "date-fns";
import { convertKelvinToCelsius } from "@/Utilities/convertKalvinToCelcius";
import { metersToKilometers } from "@/Utilities/convertMToKm";
import WeatherIcon from "./WeatherIcon";

type Props = {
    weatherData?: WeatherData;
}

export default function ForecastWeatherDetails({ weatherData }: Props) {
    const [open, setOpen] = React.useState(false);
    const [selectedRowDate, setSelectedRowDate] = useState<string | null>(null);
    const [weatherDataForSelectedDate, setWeatherDataForSelectedDate] = useState<ListItem[]>([]);

    //Handler for opening the modal and setting selected row date
    const handleOpen = (rowDataIndex: number) => {
        const selectedRow = firstDataForEachDate[rowDataIndex];
        if (selectedRow) {
            setOpen(true);
            setSelectedRowDate(new Date(selectedRow.dt * 1000).toISOString().split("T")[0]);
        }
    }
    //Filters the weatherdata for the selectedrow to use in the modal
    useEffect(() => {
        if (selectedRowDate) {
            const filteredWeatherData = weatherData?.list.filter(entry => {
                const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
                return entryDate === selectedRowDate;
            }) || [];
            setWeatherDataForSelectedDate(filteredWeatherData);
        }
    }, [selectedRowDate, weatherData]);

    const handleClose = () => setOpen(false);

    //getting all unique dates from weatherdata to use in firstDataForEachDate
    const uniqueDates = new Set(
        weatherData?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split("T")[0])
    );

    // Filtering data to get the first entry after 6 AM for each unique date
    const firstDataForEachDate = Array.from(uniqueDates).map((date) => {
        return weatherData?.list.find((entry) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
            const entryTime = new Date(entry.dt * 1000).getHours();
            return entryDate === date && entryTime >= 6;
        });
    });

    return (
        <main className="px-20 mx-auto flex w-full">
            <Card className="flex flex-col gap-4 w-full">
                <CardContent>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-gray-100">
                                    <TableCell>Date</TableCell>
                                    <TableCell>Visability</TableCell>
                                    <TableCell>Humidity</TableCell>
                                    <TableCell>Wind speed</TableCell>
                                    <TableCell>Air pressure</TableCell>
                                    <TableCell>Sunrise</TableCell>
                                    <TableCell>Sunset</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {firstDataForEachDate.map((d, i) => (
                                    <TableRow className="hover:bg-gray-100" onClick={() => handleOpen(i)} key={i}>
                                        <TableCell>
                                            <p className="flex gap-1 text-2xl  items-end ">
                                                {i === 0 ? (
                                                    <span className="text-sm">Today</span>
                                                ) : (
                                                    <span className="text-sm">{format(parseISO(d?.dt_txt ?? ""), "EEEE")}</span>
                                                )}
                                                <span className="text-sm">{format(parseISO(d?.dt_txt ?? ""), "dd/MM")}</span>
                                            </p>
                                            <p className="text-xs space-x-2">
                                                <span className="text-red-700 font-bold">
                                                    {" "}{convertKelvinToCelsius(weatherData?.list[0].main.temp_max ?? 0)}°↑
                                                </span>
                                                <span className="text-blue-700 font-bold">
                                                    {convertKelvinToCelsius(weatherData?.list[0].main.temp_min ?? 0)}°↓{" "}
                                                </span>
                                            </p>
                                            <p> {Math.round(d?.wind.speed ?? 0)} {"m/s"}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>
                                                {metersToKilometers(d?.visibility ?? 0)}
                                            </p>
                                        </TableCell>
                                        <TableCell>{d?.main.humidity ?? 0}{"%"}</TableCell>
                                        <TableCell>{Math.round(d?.wind.speed ?? 0)} {"km/h"}</TableCell>
                                        <TableCell>{d?.main.pressure ?? 0} {"hPa"}</TableCell>
                                        <TableCell>{format(fromUnixTime(weatherData?.city.sunrise ?? 0), "H:mm")}</TableCell>
                                        <TableCell>{format(fromUnixTime(weatherData?.city.sunset ?? 0), "H:mm")}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open} // Open modal if data for the row is available
                onClose={handleClose} // Close modal
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto max-w-screen-lg h-96 overflow-y-auto bg-white border-2 border-black shadow-lg p-4">
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {weatherDataForSelectedDate.map((d, i) => (
                                        <TableRow>
                                            <TableCell>
                                                <div
                                                    key={i}
                                                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                                                    <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <WeatherIcon iconName={d.weather[0].icon} />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                                                    <p>{convertKelvinToCelsius(d.main.temp ?? 0)}°</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Fade>
            </Modal>
        </main>

    )
}

