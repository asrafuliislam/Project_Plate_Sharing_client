import React, { use, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import MyFoodsBanner from './MyFoodsBanner';

const ManageMyfoods = () => {
    const [myFoods, setMyFoods] = useState([]);
    const [foodToEdit, setFoodToEdit] = useState(null);
    const { user } = use(AuthContext);
    const editModalRef = useRef(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://community-food-sharing-server-azure.vercel.app/foods?email=${user.email}`)
                .then(res => res.json())
                .then(data => setMyFoods(data));
        }
    }, [user?.email]);

    const handleEditClick = (food) => {
        setFoodToEdit(food);
        editModalRef.current.showModal();
    };
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this food?",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://community-food-sharing-server-azure.vercel.app/foods/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setMyFoods(prev => prev.filter(food => food._id !== id));

                            Swal.fire("Deleted!", "Food removed successfully", "success");
                        }
                    });
            }
        });
    };
    const handleEditSubmit = (e) => {
        e.preventDefault();

        const updatedFood = {
            food_name: e.target.food_name.value,
            food_quantity: e.target.food_quantity.value,
            additional_notes: e.target.additional_notes.value,
        };

        fetch(`https://community-food-sharing-server-azure.vercel.app/foods/${foodToEdit._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFood),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Food updated!",
                        timer: 1500,
                        showConfirmButton: false
                    });

                    // UI Update
                    setMyFoods(prev =>
                        prev.map(food =>
                            food._id === foodToEdit._id
                                ? { ...food, ...updatedFood }
                                : food
                        )
                    );

                    editModalRef.current.close();
                }
            });
    };


    return (
        <div>

            <div className=" max-w-7xl mx-auto my-5 py-10 btn-primary text-white p-6 rounded-xl mb-6 text-center">
                <h1 className="text-3xl font-bold">Hello {user?.displayName}!</h1>
                <p className="mt-2 text-lg">You have currently listed <span className="font-semibold">{myFoods.length}</span> foods for donation.</p>
            </div>

            <div className='max-w-5xl mx-auto ' >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {myFoods.map(food => (
                        <div key={food._id}
                            className="bg-white shadow-md rounded-xl overflow-hidden"
                        >
                            <img src={food.food_image} className="w-full h-44 object-cover" />

                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{food.food_name}</h3>
                                <p className="text-sm">Qty: {food.food_quantity}</p>
                                <p className="text-sm text-gray-500">
                                    {food.additional_notes?.slice(0, 70)}...
                                </p>

                                <div className="flex gap-3 justify-around mt-4">
                                    <button
                                        className="btn w-1/2 btn-sm btn-info"
                                        onClick={() => handleEditClick(food)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn w-1/2 btn-sm btn-error"
                                        onClick={() => handleDelete(food._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Modal */}
                <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-3 text-center">Edit Food</h3>

                        <form onSubmit={handleEditSubmit}>
                            <label className="font-semibold">Food Name</label>
                            <input className="input input-bordered w-full mb-3"
                                name="food_name"
                                defaultValue={foodToEdit?.food_name}
                            />

                            <label className="font-semibold">Quantity</label>
                            <input className="input input-bordered w-full mb-3"
                                name="food_quantity"
                                defaultValue={foodToEdit?.food_quantity}
                            />

                            <label className="font-semibold">Notes</label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                name="additional_notes"
                                defaultValue={foodToEdit?.additional_notes}
                            />

                            <button className="btn btn-primary w-full mt-4">
                                Update Food
                            </button>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            <MyFoodsBanner user={user} totalFoods={myFoods.length}
            ></MyFoodsBanner>
        </div>
    );
};

export default ManageMyfoods;
