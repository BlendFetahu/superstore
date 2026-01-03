import React from "react";
import { Database, Users, BarChart3, Layers } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Database size={32} />,
      title: "Normalized Database",
      desc: "Data is structured into fully normalized tables to ensure consistency and integrity.",
    },
    {
      icon: <Users size={32} />,
      title: "Role-Based Access",
      desc: "Admins and staff have separate access levels based on their responsibilities.",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Advanced Analytics",
      desc: "Interactive reports and insights powered by real-time data and Power BI.",
    },
    {
      icon: <Layers size={32} />,
      title: "Microservice Architecture",
      desc: "Frontend, backend, and database are separated using Docker-based services.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          Powerful Features
        </h2>
        <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
          A modern system designed to manage data, users, and analytics efficiently.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="
                group
                bg-white
                p-8
                rounded-2xl
                shadow
                transition-all
                duration-700
                ease-in-out
                hover:shadow-xl
                hover:-translate-y-1
                hover:bg-gradient-to-br
                hover:from-red-700
                hover:to-red-900
              "
            >
              <div className="mb-4 text-red-600 transition-colors duration-500 ease-in-out group-hover:text-red-100">
                {f.icon}
              </div>

              <h3 className="font-semibold text-lg mb-3 transition-colors duration-500 ease-in-out group-hover:text-white">
                {f.title}
              </h3>

              <p className="text-sm text-gray-600 transition-colors duration-500 ease-in-out group-hover:text-red-200">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
