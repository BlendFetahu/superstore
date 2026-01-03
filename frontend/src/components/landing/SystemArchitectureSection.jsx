import React from "react";
import { Monitor, Server, Database, BarChart3 } from "lucide-react";

export default function SystemArchitecture() {
  const steps = [
    {
      side: "left",
      icon: <Monitor size={16} />,
      title: "User Interaction",
      text: "Users operate through internal dashboards.",
    },
    {
      side: "right",
      icon: <Server size={16} />,
      title: "Service Layer",
      text: "Requests are handled by REST services.",
    },
    {
      side: "left",
      icon: <Database size={16} />,
      title: "Data Persistence",
      text: "Structured data is stored efficiently.",
    },
    {
      side: "right",
      icon: <BarChart3 size={16} />,
      title: "Analytics Pipeline",
      text: "Operational data feeds analytics.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-red-600 to-red-800 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT – DIAGRAM */}
        <div className="relative">
          {/* center line */}
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/30" />

          <div className="space-y-5">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex ${
                  step.side === "left"
                    ? "justify-start pr-8"
                    : "justify-end pl-8"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 w-56">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-full bg-white text-red-600 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h4 className="text-white font-semibold text-xs">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-red-100 text-xs leading-relaxed">
                    {step.text}
                  </p>
                </div>

                {/* connector */}
                <span
                  className={`absolute top-1/2 ${
                    step.side === "left"
                      ? "right-0 w-8"
                      : "left-0 w-8"
                  } h-px bg-white/30`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – TEXT */}
        <div className="lg:pl-16">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            System Architecture
          </h2>
          <p className="text-red-100 text-lg leading-relaxed max-w-md">
            A compact overview of how requests, data, and analytics flow through
            the platform, focusing on structure rather than repeating features.
          </p>
        </div>

      </div>
    </section>
  );
}
