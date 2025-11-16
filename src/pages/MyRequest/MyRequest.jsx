import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const MyRequest = () => {
    const { user } = useContext(AuthContext);
    const [req, setReq] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://community-food-sharing-server-azure.vercel.app/request_food?email=${user.email}`)
                .then(res => res.json())
                .then(data => setReq(data));
        }
    }, [user?.email]);

    const handleRemoveRequest = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://community-food-sharing-server-azure.vercel.app/request_food/${_id}`, {
                    method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your request has been deleted.",
                            icon: "success"
                        });
                        setReq(prev => prev.filter(r => r._id !== _id));
                    }
                });
            }
        });
    };

    return (
        <div className="px-3 sm:px-6 lg:px-10 py-8">
            <h1 className="text-2xl sm:text-3xl text-center font-bold mb-6">
                My Requests <span className="text-red-500">({req.length})</span>
            </h1>

            {/* Table for large screens */}
            <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
                <table className="table w-full text-sm sm:text-base">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
                        <tr>
                            <th className="p-3 text-center">SL No</th>
                            <th className="p-3">Requester Profile</th>
                            <th className="p-3">Food Name</th>
                            <th className="p-3">Why Food Need</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {req.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-6">
                                    No requests yet 🍽️
                                </td>
                            </tr>
                        ) : (
                            req.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-50 border-b transition">
                                    <td className="text-center font-medium">{index + 1}</td>
                                    <td className="py-3 flex items-center gap-3">
                                        <img src={item.userPhoto || "https://i.ibb.co/YpGmPNt/user21.jpg"} alt={item.user_name} className="w-12 h-12 rounded-full"/>
                                        <div>
                                            <div className="font-semibold text-gray-800">{item.user_name}</div>
                                            <div className="text-sm text-gray-500">{item.user_email}</div>
                                        </div>
                                    </td>
                                    <td className="font-medium text-gray-800">{item.Food_name || item.food_name || "N/A"}</td>
                                    <td className="py-3 max-w-xs text-gray-700">{item.whyNeedFood}</td>
                                    <td className="text-center">
                                        <span className={`badge px-3 py-1 rounded-full border-none ${item.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="text-center py-3">
                                        <button
                                            onClick={() => handleRemoveRequest(item._id)}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 border border-red-400 rounded-lg hover:bg-red-50 transition font-medium active:scale-95"
                                        >
                                            🗑️ Remove Request
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card view for small screens */}
            <div className="md:hidden flex flex-col gap-4">
                {req.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">No requests yet 🍽️</p>
                ) : req.map((item) => (
                    <div key={item._id} className="bg-white shadow-sm rounded-xl p-4 flex flex-col gap-2 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <img src={item.userPhoto || "https://i.ibb.co/YpGmPNt/user21.jpg"} alt={item.user_name} className="w-12 h-12 rounded-full border"/>
                            <div>
                                <p className="font-semibold text-gray-800">{item.user_name}</p>
                                <p className="text-xs text-gray-500">{item.user_email}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-2"><span className="font-medium text-gray-900">Food Name:</span> {item.Food_name || item.food_name || "N/A"}</p>
                        <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Reason:</span> {item.whyNeedFood}</p>
                        <div className="flex items-center justify-between mt-3">
                            <span className={`text-xs px-3 py-1 rounded-full ${item.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                                {item.status}
                            </span>
                            <button onClick={() => handleRemoveRequest(item._id)} className="text-red-600 text-sm border border-red-400 rounded-lg px-3 py-1.5 hover:bg-red-50 transition flex items-center gap-1">
                                🗑️ Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRequest;
