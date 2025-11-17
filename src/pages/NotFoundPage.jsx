import React from 'react';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
                <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
                
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
