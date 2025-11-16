import React, { Suspense } from 'react';
import RecentFood from './RecentFood';
import FoodSlider from './FoodSlider';
import Mission from './Mission';
import LoadingSpinner from '../LoadingSpinner';



const recentProductsPromise = fetch('http://localhost:3000/latest-food').then(res => res.json());
const Home = () => {
    return (
        <div>
            <FoodSlider></FoodSlider>
            <Suspense fallback= {<LoadingSpinner></LoadingSpinner>}>
                <RecentFood recentProductsPromise={recentProductsPromise} ></RecentFood>
            </Suspense>
            <Mission></Mission>
        </div>
    );
};

export default Home;