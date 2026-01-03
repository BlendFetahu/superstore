import React from "react";
import logo from "../../../images/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Sales Metrics logo"
            className="h-9 w-9"
          />
          <span className="text-lg font-bold text-gray-900">
            Sales Metrics
          </span>
        </div>

        {/* Center: Copyright */}
        <div className="text-sm font-semibold text-gray-700 text-center">
          © 2026 Sales Metrics. All rights reserved.
        </div>

        {/* Right: Contact */}
        <div className="text-sm text-gray-600 space-y-1 text-center md:text-right">
          <div>📧 contact@salesmetrics.app</div>
          <div>📍 Prishtina, Kosovo</div>
          <div>📞 +383 44 000 000</div>
        </div>

      </div>
    </footer>
  );
}
