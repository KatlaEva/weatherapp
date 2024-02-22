import React from "react";
import { FaSearchLocation } from "react-icons/fa";

type Props = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;

}

export default function SearchBar(props: Props) {
    return (
        <form onSubmit={props.onSubmit} className="flex relative items-center justify-center h-10">
            <input 
            type="text" 
            value={props.value}
            placeholder="Search location" 
            className="px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-300 h-full"
            onChange={props.onChange}
            />
            <button className="px-4 py-[px9] bg-indigo-200 text-white rounded-r-md focus:outline-none hover:bg-indigo-300 whitespace-nowrap h-full">
            <FaSearchLocation />
            </button>
        </form>
    )
}