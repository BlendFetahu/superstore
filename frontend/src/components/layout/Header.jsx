import React from "react";
import logo from "../../../images/logo.svg";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo & Name */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sales Metrics" className="h-9 w-9" />
          <span className="text-xl font-bold text-gray-900">
            SalesMetrics
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-red-600 transition"
            >
          Home
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
         Log in
         </Link>

        </div>
      </div>
    </header>
  );
};


