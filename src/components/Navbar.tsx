import React from "react";

type Props = {}

export default function Navbar({}: Props) {
    return (
        <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex justify-between items-center max-w-7x1 px-10 mx-auto">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-gray-500 text-3xl">Katla's weather forecast</h2>
                </div>
            </div>
        </nav>
    )
}