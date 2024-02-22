'useClient'

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import { MdOutlineLocationOn } from "react-icons/md";
import { useAtom } from "jotai";
import { placeAtom } from "@/app/atoms";
import { FiSun } from "react-icons/fi";

type Props = { location?: string };

export default function Navbar({ location }: Props) {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [place, setPlace] = useAtom(placeAtom);

    //appid visable, needs to be protected before publishing
    async function handleInputChange(value: string) {
        setCity(value);
        if (value.length >= 3) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=f721a7a85b591659335b8012a3cbe2e0`
                );

                const suggestions = response.data.list.map((item: any) => item.name);
                setSuggestions(suggestions);
                setError("");
                setShowSuggestions(true);
            } catch (error) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
    }

    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (suggestions.length == 0) {
            setError("Location not found");
        } else {
            setError("");
            setTimeout(() => {
                setPlace(city);
                setShowSuggestions(false);
            }, 500);
        }
    }

    return (
        <>
            {/* Navbar */}
            <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
                <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
                    <span className=" flex items-center text-yellow-500 text-3xl">
                        <FiSun />&nbsp;
                        <h2 className=" flex items-center text-gray-500 text-3xl">Katla's weather forecast</h2>
                    </span>
                    <div className="flex justif-between gap-2 items-center">
                        <MdOutlineLocationOn className="text-3xl" />
                        <p className="text-slate-900/80 text-sm">{location}</p>
                        <div className="relative hidden md:flex">

                            {/* SearchBar */}
                            <SearchBar
                                value={city}
                                onSubmit={handleSubmitSearch}
                                onChange={(e) => handleInputChange(e.target.value)}
                            />
                            <SuggetionBox
                                {...{
                                    showSuggestions,
                                    suggestions,
                                    handleSuggestionClick,
                                    error
                                }}
                            />
                        </div>
                    </div>
                </div>
            </nav>
            <section className="flex   max-w-7xl px-3 md:hidden ">
                <div className="relative ">
                    <SearchBar
                        value={city}
                        onSubmit={handleSubmitSearch}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                    <SuggetionBox
                        {...{
                            showSuggestions,
                            suggestions,
                            handleSuggestionClick,
                            error
                        }}
                    />
                </div>
            </section>
        </>
    );
}

//Functions to handle suggegstions in the searchbar
function SuggetionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
}: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
}) {
    return (
        <>
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
                    {error && suggestions.length < 1 && (
                        <li className="text-red-500 p-1 "> {error}</li>
                    )}
                    {suggestions.map((item, i) => (
                        <li
                            key={i}
                            onClick={() => handleSuggestionClick(item)}
                            className="cursor-pointer p-1 rounded   hover:bg-gray-200">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
