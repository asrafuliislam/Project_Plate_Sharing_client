import React, { useState, useContext, forwardRef } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaLeaf, FaImage, FaUser } from "react-icons/fa6";

const AddFood = forwardRef((props, ref) => {
    const { user } = useContext(AuthContext);  
    const [loading, setLoading] = useState(false);

    const handleAddFood = (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const newFood = {
            food_name: form.food_name.value,
            food_image: form.food_image.value,
            food_quantity: form.food_quantity.value,
            pickup_location: form.pickup_location.value,
            expire_date: form.expire_date.value,
            additional_notes: form.additional_notes.value,
            donator_name: user?.displayName,
            donator_email: user?.email,
            donator_photo: user?.photoURL,
            food_status: "Available"
        };

        fetch("http://localhost:3000/foods", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newFood),
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Food Added Successfully!",
                        icon: "success",
                    });
                    form.reset();
                }
            })
            .catch(() => setLoading(false));
    };

    return (
        <div ref={ref} className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl border">

                {/* Header */}
                <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                    <FaLeaf className="text-green-700 text-3xl" />
                    Donate Food
                </h1>

                {/* FORM */}
                <form onSubmit={handleAddFood} className="space-y-6">

                    {/* Food Name */}
                    <div>
                        <label className="font-semibold">Food Name</label>
                        <input
                            name="food_name"
                            type="text"
                            placeholder="Food Name"
                            className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-xl outline-none"
                            required
                        />
                    </div>

                    {/* Food Image */}
                    <div>
                        <label className="font-semibold flex items-center gap-2">
                            <FaImage /> Food Image URL
                        </label>
                        <input
                            name="food_image"
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-xl outline-none"
                            required
                        />
                    </div>

                    {/* Quantity + Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="font-semibold">Quantity</label>
                            <input
                                name="food_quantity"
                                type="text"
                                placeholder="How Many.."
                                className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-xl outline-none"
                                required
                            />
                        </div>
                            {/* Expire Date */}
                        <div>
                            <label className="font-semibold">Expire Date</label>
                            <input
                                name="expire_date"
                                type="date"
                                className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-xl outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="font-semibold flex items-center gap-2">
                             Pickup Location
                        </label>
                        <input
                            name="pickup_location"
                            type="text"
                            placeholder="Location"
                            className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-xl outline-none"
                            required
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="font-semibold">Additional Notes</label>
                        <textarea
                            name="additional_notes"
                            placeholder="Any notes..."
                            rows="3"
                            className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-xl outline-none"
                        ></textarea>
                    </div>

                    {/* User Info */}
                    <h2 className="text-2xl font-bold mt-6">Your Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="font-semibold flex items-center gap-2">
                                <FaUser /> Your Name
                            </label>
                            <input
                                name="donator_name"
                                type="text"
                                defaultValue={user?.displayName}
                                className="w-full mt-2 px-4 py-3 bg-gray-200 border rounded-xl outline-none cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Your Email</label>
                            <input
                                name="donator_email"
                                type="email"
                                defaultValue={user?.email}
                                className="w-full mt-2 px-4 py-3 bg-gray-200 border rounded-xl outline-none cursor-not-allowed"
                                readOnly
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold">Your Photo URL</label>
                        <input
                            name="donator_photo"
                            type="text"
                            defaultValue={user?.photoURL}
                            className="w-full mt-2 px-4 py-3 bg-gray-200 border rounded-xl outline-none cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 py-3 border-2 border-sky-500 text-sky-500  font-semibold text-lg rounded-xl hover:bg-sky-500 hover:text-sky-50 transition disabled:bg-gray-500"
                    >
                        {loading ? "Adding..." : "+ Add Food"}
                    </button>
                </form>
            </div>
        </div>
    );
});

export default AddFood;
