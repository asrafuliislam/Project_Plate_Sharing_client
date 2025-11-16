import React from "react";

const Banner = ({ scrollToAddFood }) => {
  return (
    <div className="w-full bg-gray-100 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-4">Take action</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
        Simply browse through our fundraising goals and donate to the causes that matter to you.
      </p>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-80 md:h-auto">
          <img
            src="https://i.ibb.co.com/Rk0zvt0c/Altruismus-Von-Natur-aus-selbstlos.jpg"
            alt="donated food"
            className="w-full h-full object-cover shadow"
          />
          <span className="absolute bottom-4 left-4 bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow">
            Urgent
          </span>
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Give emergency aid in Palestine</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Shared meals will provide emergency food assistance to families in Palestine.
          </p>

          <div className="flex gap-4">
            <button
              onClick={scrollToAddFood}
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl text-lg font-medium hover:bg-yellow-600 transition"
            >
              Donate now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
