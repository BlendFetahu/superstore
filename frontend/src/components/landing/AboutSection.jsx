import React from "react";
import logo from "../../../images/section-image.svg";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text */}
        <div>
          <p className="text-red-600 font-semibold mb-3">
            About the System
          </p>

          <h2 className="text-4xl font-extrabold mb-6">
            Built on Real Business Data
          </h2>

          <p className="text-gray-600 leading-relaxed">
            This project is based on a real-world dataset, which has been carefully
            normalized into multiple relational tables to ensure data integrity, consistency,
            and efficient querying for analytical purposes.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Database & Analytics"
            className="w-full max-w-sm rounded-2xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
