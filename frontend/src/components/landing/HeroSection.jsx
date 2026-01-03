import React from "react";
import { Link } from "react-router-dom";


export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-red-700 via-red-600 to-red-500">
      <div className="max-w-7xl mx-auto px-6 py-28 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-6">
          Sales Management & Analytics Platform
        </h1>
        <p className="max-w-3xl mx-auto text-red-100 text-lg mb-10">
          A centralized platform built on a normalized database to manage sales, staff operations,
          and business analytics through integrated Power BI reporting.

        </p>

        <Link
        to="/login"
        className="inline-block bg-white text-red-700 px-10 py-4 rounded-full font-semibold hover:bg-red-100 transition"
        >
        Log in to Dashboard
        </Link>

      </div>
    </section>
  );
}
