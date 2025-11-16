import React from 'react';
import { FaRegUser, FaUtensils, FaHandsHelping, FaSmile } from 'react-icons/fa';

const steps = [
    {
        icon: <FaRegUser size={40} className="text-white" />,
        title: 'Sign Up / Login',
        description: 'Create an account or log in to access the food donation platform easily.',
        bgColor: 'bg-blue-500'
    },
    {
        icon: <FaUtensils size={40} className="text-white" />,
        title: 'Browse Foods',
        description: 'Check out available food items shared by donors in your area.',
        bgColor: 'bg-green-500'
    },
    {
        icon: <FaHandsHelping size={40} className="text-white" />,
        title: 'Make a Request / Donate',
        description: 'Request the food you need or donate food to help someone in need.',
        bgColor: 'bg-yellow-500'
    },
    {
        icon: <FaSmile size={40} className="text-white" />,
        title: 'Enjoy & Spread Happiness',
        description: 'Receive your requested food or see your donation make someone happy!',
        bgColor: 'bg-purple-500'
    }
];

const HowItWorks = () => {
    return (
        <div className="py-16 px-4 bg-gray-50">
            
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-2">How It Works</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Understand the simple steps of our platform and how you can help or benefit from it.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-white">
                        <div className={`p-4 rounded-full mb-4 ${step.bgColor}`}>
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                        <p className="text-gray-600 text-center">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
