import React from "react";
import { BarChart3, TrendingUp, PieChart } from "lucide-react";

export default function AnalyticsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
            Analytics & Reporting
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed max-w-xl">
            The platform offers structured analytics and reporting tools that
            transform operational data into clear, visual business insights.
          </p>

          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <BarChart3 className="text-red-600 mt-1" size={20} />
              <span>Performance summaries and sales overviews</span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="text-red-600 mt-1" size={20} />
              <span>Trend and comparison analysis across time periods</span>
            </li>
            <li className="flex items-start gap-3">
              <PieChart className="text-red-600 mt-1" size={20} />
              <span>Category and segment distribution insights</span>
            </li>
          </ul>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex justify-center">
          <div
            className="
              w-full max-w-xl rounded-2xl bg-gray-50 border border-gray-200 p-10
              shadow-[0_10px_30px_rgba(220,38,38,0.15)]
            "
          >
            {/* ADVANCED SVG DASHBOARD */}
            <svg
              viewBox="0 0 420 260"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background */}
              <rect width="420" height="260" rx="18" fill="#ffffff" />

              {/* KPI Cards */}
              <rect x="30" y="25" width="110" height="50" rx="10" fill="#fee2e2" />
              <rect x="155" y="25" width="110" height="50" rx="10" fill="#fecaca" />
              <rect x="280" y="25" width="110" height="50" rx="10" fill="#fee2e2" />

              {/* Bars */}
              <rect x="60" y="120" width="24" height="80" rx="4" fill="#ef4444" />
              <rect x="100" y="95" width="24" height="105" rx="4" fill="#f87171" />
              <rect x="140" y="110" width="24" height="90" rx="4" fill="#ef4444" />

              {/* Line Chart */}
              <polyline
                points="210,180 245,145 280,160 315,120"
                fill="none"
                stroke="#dc2626"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle cx="210" cy="180" r="4" fill="#dc2626" />
              <circle cx="245" cy="145" r="4" fill="#dc2626" />
              <circle cx="280" cy="160" r="4" fill="#dc2626" />
              <circle cx="315" cy="120" r="4" fill="#dc2626" />

              {/* Pie Chart */}
              <circle cx="350" cy="165" r="28" fill="#fee2e2" />
              <path
                d="M350 165 L350 137 A28 28 0 0 1 374 185 Z"
                fill="#ef4444"
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
