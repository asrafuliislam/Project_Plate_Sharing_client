import React from 'react';
import BannerImg from '../../assets/NGO.jpg'
import { Link } from 'react-router';

const MyFoodsBanner = ({ user, totalFoods }) => {
    return (
        <div className="max-w-6xl mx-auto  my-10 border-gray-900 flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden mb-10">

            <div className=" p-8 md:p-12 flex flex-col gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Hello {user?.displayName}, thank you for sharing your food!
                </h1>
                <p className="text-gray-600 text-lg">
                    You have donated <span className="font-semibold">{totalFoods}</span> foods so far. Every donation helps reduce food waste and feed those in need.
                </p>
                <button
                    className="mt-4 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-xl shadow-md transition"
                >
                    <Link to='/addfood' >+ Donate Food</Link>
                </button>
            </div>
            <div className="md:w-1/2">
                <img
                    src={BannerImg}
                    alt="Donated food app preview"
                    className="w-full h-full rounded-2xl object-cover"
                />
            </div>
        </div>
    );
};

export default MyFoodsBanner;
