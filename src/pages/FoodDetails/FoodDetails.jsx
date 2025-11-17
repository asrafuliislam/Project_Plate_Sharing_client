import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = UseAuth();;
    const ReqModalRef = useRef(null);
    const [req, setReq] = useState([]);

    const { _id, food_name, food_image, food_quantity, pickup_location, expire_date, additional_notes, donator_name, donator_email, donator_photo, food_status } = food;

    const handleRequestOpen = () => ReqModalRef.current.showModal();

    // Submit request
    const handleRequestSubmit = (e) => {
        e.preventDefault();
        const newReq = {
            food: _id,
            Food_name: food_name,
            user_name: user?.displayName,
            user_email: user?.email,
            userPhoto: user?.photoURL,
            whyNeedFood: e.target.whyNeedFood.value,
            location: pickup_location,
            req_number: e.target.contactNo.value,
            status: "pending",
        };
        fetch("https://community-food-sharing-server-azure.vercel.app/request_food", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReq)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    newReq._id = data.insertedId;
                    setReq(prev => [...prev, newReq]);
                    ReqModalRef.current.close();
                    Swal.fire({ icon: 'success', title: 'Request Placed', timer: 1200, showConfirmButton: false });
                }
            });
    };

    useEffect(() => {
        fetch(`https://community-food-sharing-server-azure.vercel.app/foods/request_food/${_id}`)
            .then(res => res.json())
            .then(data => setReq(data));
    }, [_id]);

    const handleAccept = (reqId) => {
        fetch(`https://community-food-sharing-server-azure.vercel.app/request_food/accept/${reqId}`, { method: 'PATCH' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setReq(prev => prev.map(r => r._id === reqId ? { ...r, status: 'accepted' } : r));
                    Swal.fire({ icon: 'success', title: 'Request Accepted', timer: 1200, showConfirmButton: false });
                }
            })
            .catch(err => Swal.fire({ icon: 'error', title: 'Error accepting request', text: err.message }));
    };

    const handleReject = (reqId) => {
        fetch(`https://community-food-sharing-server-azure.vercel.app/request_food/reject/${reqId}`, { method: 'PATCH' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setReq(prev => prev.map(r => r._id === reqId ? { ...r, status: 'rejected' } : r));
                    Swal.fire({ icon: 'error', title: 'Request Rejected', timer: 1200, showConfirmButton: false });
                }
            })
            .catch(err => Swal.fire({ icon: 'error', title: 'Error rejecting request', text: err.message }));
    };


    return (
        <div className="min-h-screen py-12 px-4 flex flex-col justify-center items-center bg-gradient-to from-[#f9fafb] to-[#eef2f7]">
            {/* Food info card */}
            <div className="card w-full max-w-5xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
                <div className="relative w-full h-80">
                    <img src={food_image} alt={food_name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to from-black/70 to-transparent"></div>
                    <div className="absolute bottom-5 left-6 text-white">
                        <h1 className="text-4xl font-bold drop-shadow-lg">{food_name}</h1>
                        <p className="text-sm opacity-90 mt-1">{pickup_location}</p>
                    </div>
                </div>

                <div className="p-8 grid lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Food Information 🍱</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li><span className="font-semibold">Quantity:</span> {food_quantity}</li>
                            <li><span className="font-semibold">Pickup Location:</span> {pickup_location}</li>
                            <li><span className="font-semibold">Expire Date:</span> {expire_date}</li>
                        </ul>
                        <p className="mt-5 italic border-l-4 border-primary pl-3 text-gray-600">{additional_notes}</p>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="bg-gradient-to from-[#f8f9fa] to-[#e9ecef] rounded-xl p-5 shadow-inner flex gap-4 items-center">
                            <img src={donator_photo} alt={donator_name} className="w-16 h-16 rounded-full border-2 border-primary" />
                            <div>
                                <h3 className="text-lg font-bold">{donator_name}</h3>
                                <p className="text-sm text-gray-500">{donator_email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <span className={`badge px-5 py-2 text-white text-sm ${food_status === 'Available' ? 'bg-green-600' : 'bg-red-500'}`}>
                                {food_status}
                            </span>
                            <button onClick={handleRequestOpen} className="btn btn-primary shadow-md hover:shadow-lg transition-all duration-200">
                                Request This Food 🍽️
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <dialog ref={ReqModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center my-4">
                        Request This Food
                    </h3>

                    <form onSubmit={handleRequestSubmit}>
                        <fieldset className="fieldset space-y-3">
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-4 bg-base-200 p-3 rounded-xl">
                                <img
                                    src={user?.photoURL || "https://i.ibb.co/YpGmPNt/user21.jpg"}
                                    alt="User"
                                    className="w-14 h-14 rounded-full border-2 border-primary"
                                />
                                <div>
                                    <p className="font-semibold">{user?.displayName || "Your Name"}</p>
                                    <p className="text-sm text-gray-500">{user?.email || "Your Email"}</p>
                                </div>
                            </div>

                            {/* Food Owner Email */}
                            <div>
                                <label className="label text-black font-semibold">Food Owner Email</label>
                                <input
                                    type="email"
                                    name="ownerEmail"
                                    className="input input-bordered w-full text-gray-600"
                                    value={donator_email}
                                    readOnly
                                />
                            </div>

                            {/* Pickup Location */}
                            <div>
                                <label className="label text-black font-semibold">Pickup Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="input input-bordered w-full text-gray-600"
                                    defaultValue={pickup_location}
                                    readOnly
                                />
                            </div>

                            {/* Why Need Food */}
                            <div>
                                <label className="label text-black font-semibold">
                                    Why Do You Need This Food?
                                </label>
                                <textarea
                                    name="whyNeedFood"
                                    className="textarea textarea-bordered w-full h-24 text-gray-600"
                                    placeholder="Explain why you need this food..."
                                ></textarea>
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="label text-black font-semibold">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNo"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6 flex justify-between items-center">
                                <button type="submit" className="btn btn-primary w-full">
                                    Submit Request 🚀
                                </button>
                            </div>
                        </fieldset>

                        {/* Modal Action */}
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn border-primary text-primary font-bold">Cancel</button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>


            {/* Requests Table */}
            <div className="card w-full max-w-5xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden my-5">
                <h1 className="text-3xl text-center p-5">Request for this product: <span className="text-primary">{req.length}</span></h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SL No</th>
                                <th>Requester profile</th>
                                <th>Why Food Need</th>
                                <th>Food Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {req.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-4 text-gray-500">No requests yet 🍽️</td></tr>
                            ) : req.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td className="flex items-center gap-3">
                                        <img src={item.userPhoto || "https://i.ibb.co/YpGmPNt/user21.jpg"} alt={item.user_name} className="w-12 h-12 rounded-full" />
                                        <div>
                                            <div className="font-bold">{item.user_name}</div>
                                            <div className="text-sm opacity-50">{item.user_email}</div>
                                        </div>
                                    </td>
                                    <td>{item.whyNeedFood}</td>
                                    <td>{item.Food_name}</td>
                                    <td>{item.status}</td>

                                    {/* action */}
                                    <td className="flex gap-3">
                                        <button
                                            onClick={() => handleReject(item._id)}
                                            disabled={item.status !== 'pending'}
                                            className={`btn btn-ghost py-1 px-3 transition ${item.status === 'rejected' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                        >
                                            {item.status === 'rejected' ? 'Rejected' : 'Reject'}
                                        </button>
                                        <button
                                            onClick={() => handleAccept(item._id)}
                                            disabled={item.status !== 'pending'}
                                            className={`btn btn-ghost py-1 px-3 transition ${item.status === 'accepted' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                                        >
                                            {item.status === 'accepted' ? 'Accepted' : 'Accept'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
