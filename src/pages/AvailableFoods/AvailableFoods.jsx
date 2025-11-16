import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import FoodsBanner from "./FoodsBanner";
import HowItWorks from "./HowItWorks";

const AvailableFoods = () => {
    const foods = useLoaderData();
    const [filteredFoods, setFilteredFoods] = useState(foods);

    const handleSearch = (term) => {
        const filtered = foods.filter((food) =>
            food.food_name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredFoods(filtered);
    };

    return (
        <div className="my-10 px-3 sm:px-6 lg:px-10">

            {/* Banner  */}
            <HowItWorks></HowItWorks>

            {/* Banner + Search */}
            <FoodsBanner onSearch={handleSearch} />

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredFoods.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden 
                                   transition duration-300 border flex flex-col"
                        >
                            {/* Image */}
                            <img
                                src={food.food_image}
                                alt={food.food_name}
                                className="w-full h-44 sm:h-52 object-cover"
                            />

                            {/* Content */}
                            <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{food.food_name}</h3>

                                    <p className="text-sm text-gray-600">
                                        Quantity: <span className="font-medium">{food.food_quantity}</span>
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {food.additional_notes?.length > 80
                                            ? food.additional_notes.slice(0, 80) + "..."
                                            : food.additional_notes}
                                    </p>

                                    {/* Donator Info */}
                                    <div className="flex items-center gap-3 pt-3 border-t mt-3">
                                        <img
                                            src={food.donator_photo}
                                            alt={food.donator_name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-sm">{food.donator_name}</p>
                                            <p className="text-xs text-gray-500">{food.donator_email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status + Button */}
                                <div className="flex justify-between items-center pt-3">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full 
                                        ${food.food_status === "Available"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-gray-200 text-gray-500"
                                            }`}
                                    >
                                        {food.food_status}
                                    </span>

                                    <Link
                                        to={`/foodDetails/${food._id}`}
                                        className="bg-yellow-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 
                                               rounded-lg hover:bg-yellow-700 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AvailableFoods;
