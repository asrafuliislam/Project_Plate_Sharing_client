import React, { useState } from "react";

const FoodsBanner = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="w-full  btn-primary text-white py-12 px-4 rounded-2xl shadow-lg mb-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Banner Text */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">Find Your Meal</h1>
          <p className="text-lg text-white/90">
            Browse through the available foods and request the ones you need.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md w-full">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search for food..."
            className="w-full border-2 border-yellow-400  px-4 py-3 rounded-xl text-white outline-none hover:opacity-90 "
          />
        </div>
      </div>
    </div>
  );
};

export default FoodsBanner;
