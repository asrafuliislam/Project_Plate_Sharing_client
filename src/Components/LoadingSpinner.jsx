import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <span className="loading loading-spinner loading-xl bg-blue-600 scale-[2]"></span>
        </div>
    );
};

export default LoadingSpinner;
