import React from "react";

const PowerBIPage = ({ title, src }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h2 className="text-xl font-bold mb-4 text-red-700">{title}</h2>

      <div className="w-full h-[680px] rounded-xl overflow-hidden border">
        <iframe
          title={title}
          src={src}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PowerBIPage;






