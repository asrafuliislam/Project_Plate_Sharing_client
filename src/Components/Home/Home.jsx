import React, { Suspense } from 'react';
import RecentFood from './RecentFood';
import FoodSlider from './FoodSlider';
import Mission from './Mission';
import LoadingSpinner from '../LoadingSpinner';

const Home = () => {
    return (
        <div>
            <FoodSlider></FoodSlider>
            <Suspense fallback= {<LoadingSpinner></LoadingSpinner>}>
                <RecentFood></RecentFood>
            </Suspense>
            <Mission></Mission>
        </div>
    );
};

export default Home;