import React from 'react';
import { FaLeaf, FaHandsHelping, FaHeart } from 'react-icons/fa';

const missions = [
    {
        icon: <FaLeaf size={30} className="text-green-500" />,
        title: 'Sustainable Food Sharing',
        description: 'Promote responsible food usage and reduce waste by connecting donors and recipients.'
    },
    {
        icon: <FaHandsHelping size={30} className="text-blue-500" />,
        title: 'Community Support',
        description: 'Empower local communities by making food accessible to those in need.'
    },
    {
        icon: <FaHeart size={30} className="text-red-500" />,
        title: 'Spread Kindness',
        description: 'Encourage generosity and compassion through sharing food with others.'
    }
];



const Mission = () => {
    return (
        <div className="py-16 px-4 bg-gray-100">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-2">Our Mission</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Our mission is to create a community where food is shared responsibly, kindness is spread, and no one goes hungry.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {missions.map((mission, index) => (
                    <div key={index} className="flex flex-col items-center p-6 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform duration-300">
                        <div className="mb-4">{mission.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-center">{mission.title}</h3>
                        <p className="text-gray-600 text-center">{mission.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mission;
