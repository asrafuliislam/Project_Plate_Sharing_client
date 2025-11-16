import React, { useRef } from "react";
import Banner from "./Banner";
import AddFood from "./AddFood";

const AddFoodPage = () => {
    const addFoodRef = useRef(null);

    const scrollToAddFood = () => {
        addFoodRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Banner scrollToAddFood={scrollToAddFood} />
            <AddFood ref={addFoodRef} />
        </>
    );
};

export default AddFoodPage;
