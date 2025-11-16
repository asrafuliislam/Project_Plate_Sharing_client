import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router";

const RecentFood = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch('https://community-food-sharing-server-azure.vercel.app/latest-food')
            .then(res => res.json())
            .then(data => setFoods(data))
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="my-10 px-6 max-w-7xl mx-auto">

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800">
                    Featured <span className="text-blue-600">Foods</span>
                </h2>
                <p className="text-gray-500 mt-2">
                    Discover the most highlighted foods shared by our community.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition duration-300 border">

                        {/* Image */}
                        <img
                            src={food.food_image}
                            alt={food.food_name}
                            className="w-full h-52 object-cover"
                        />

                        {/* Content */}
                        <div className="p-5 space-y-2">
                            <h3 className="text-lg font-semibold">{food.food_name}</h3>
                            <p className="text-sm text-gray-600">
                                Quantity: <span className="font-medium">{food.food_quantity}</span>
                            </p>



                            <p className="text-sm text-gray-500">
                                {food.additional_notes}
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

                            {/* Status + Button */}
                            <div className="flex justify-between items-center pt-3">
                                <span
                                    className={`text-xs px-3 py-1 rounded-full ${food.food_status === "Available"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    {food.food_status}
                                </span>

                                <Link to={`/foodDetails/${food._id}`} className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" flex justify-center items-center my-5">
                <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl text-lg font-medium hover:bg-yellow-600 transition">
                    <NavLink to='/availableFoods'> Show All Foods</NavLink>
                </button>
            </div>
        </div>
    );
};

export default RecentFood;
