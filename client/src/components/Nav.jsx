import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-200 p-4 rounded-lg shadow-md">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-end items-center">
                    <NavLink to='/' className="text-black font-bold text-xl hover:text-red-600 mr-10">Home</NavLink>
                    <NavLink to='/dashboard' className="text-black font-bold text-xl hover:text-red-600">Dashboard</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
