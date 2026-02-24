import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth'; 
import Swal from 'sweetalert2';

const MyParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const queryClient = useQueryClient();
    const [editData, setEditData] = useState(null);

    // Fetch User Parcels
    const { data: parcels = [], isLoading, isError, error } = useQuery({
        queryKey: ['parcels', user?.email], 
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

    // Delete Mutation
    const { mutateAsync: deleteParcel } = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/parcels/${id}`),
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Your parcel has been removed.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            // Refresh specific query for this user
            queryClient.invalidateQueries(['parcels', user?.email]);
        },
        onError: (err) => {
            Swal.fire("Error", err.message, "error");
        }
    });

    // Handle Delete with Confirmation
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444", // match btn-error
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteParcel(id);
            }
        });
    };

    // Update Mutation
    const { mutateAsync: updateParcel } = useMutation({
        mutationFn: async (updated) => await axiosSecure.patch(`/parcels/${editData._id}`, updated),
        onSuccess: () => {
            queryClient.invalidateQueries(['parcels', user?.email]);
            document.getElementById('edit_modal').close();
            Swal.fire({
                title: "Updated!",
                text: "Details saved.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedDoc = { 
            title: form.title.value, 
            receiverName: form.receiver.value 
        };
        await updateParcel(updatedDoc);
    };

    if (authLoading) return <div className="p-10 text-center"><span className="loading loading-spinner text-success"></span><p>Checking login status...</p></div>;
    
    if (isLoading) return <div className="p-10 text-center"><progress className="progress w-56"></progress><p>Fetching your parcels...</p></div>;

    if (isError) return <div className="alert alert-error m-5">Error: {error.message}</div>;

    return (
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Booked Parcels ({parcels.length})</h2>
            </div>
            
            {parcels.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No parcels found for <span className="font-semibold">{user?.email}</span></p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full text-gray-700">
                        <thead>
                            <tr className="bg-gray-100 text-gray-800 border-b">
                                <th className="py-4">Parcel Title</th>
                                <th>Receiver</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map(p => (
                                <tr key={p._id} className="hover:bg-gray-50 border-b border-gray-100">
                                    <td className="font-semibold text-gray-900">{p.title}</td>
                                    <td>{p.receiverName}</td>
                                    <td>
                                        <span className={`badge border-none px-3 py-3 font-medium ${
                                            p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                            p.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="flex gap-2">
                                        <button 
                                            onClick={() => { setEditData(p); document.getElementById('edit_modal').showModal(); }} 
                                            className="btn btn-sm btn-warning font-semibold"
                                            disabled={p.status !== 'pending'} 
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(p._id)} 
                                            className="btn btn-sm btn-error text-white font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-xl mb-4 text-green-700">Update Parcel Info</h3>
                    {editData && (
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-bold text-gray-700">Parcel Title</label>
                                <input name="title" defaultValue={editData.title} className="input input-bordered w-full bg-white text-gray-900 border-gray-300" required />
                            </div>
                            <div className="form-control">
                                <label className="label font-bold text-gray-700">Receiver Name</label>
                                <input name="receiver" defaultValue={editData.receiverName} className="input input-bordered w-full bg-white text-gray-900 border-gray-300" required />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-success text-white">Save Updates</button>
                                <button type="button" onClick={() => document.getElementById('edit_modal').close()} className="btn btn-ghost">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyParcels;