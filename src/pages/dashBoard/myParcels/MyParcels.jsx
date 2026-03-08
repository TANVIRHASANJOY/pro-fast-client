import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom'; 
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth'; 
import Swal from 'sweetalert2';

const MyParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();
    const queryClient = useQueryClient();
    const [editData, setEditData] = useState(null);
 
console.log("User before API call:", user);

    // 1. Fetching Parcels
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['parcels', user?.email], 
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

    // 2. Delete/Cancel Mutation
    const { mutateAsync: deleteParcel } = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/parcels/${id}`),
        onSuccess: () => {
            Swal.fire({ title: "Cancelled!", text: "Your booking has been removed.", icon: "success", timer: 1500, showConfirmButton: false });
            queryClient.invalidateQueries(['parcels', user?.email]);
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will cancel your booking permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444", 
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) await deleteParcel(id);
        });
    };

    // 3. Update Mutation
    const { mutateAsync: updateParcel } = useMutation({
        mutationFn: async (updated) => await axiosSecure.patch(`/parcels/${editData._id}`, updated),
        onSuccess: () => {
            queryClient.invalidateQueries(['parcels', user?.email]);
            document.getElementById('edit_modal').close();
            Swal.fire({ title: "Updated!", icon: "success", timer: 1500, showConfirmButton: false });
        }
    });

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        await updateParcel({ 
            title: form.title.value, 
            receiverName: form.receiver.value 
        });
    };

    if (authLoading || isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mt-10">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                    My Booked Parcels <span className="text-indigo-600">({parcels.length})</span>
                </h2>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <th className="py-4">Parcel Title</th>
                            <th>Receiver</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {parcels.map(p => (
                            <tr key={p._id} className="hover:bg-indigo-50/30 transition-colors border-b last:border-0">
                                <td className="font-medium py-4">{p.title}</td>
                                <td>{p.receiverName}</td>
                                <td>
                                    <span className={`badge border-none px-3 py-3 font-bold text-[10px] uppercase 
                                        ${p.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                          p.status === 'booked' ? 'bg-blue-100 text-blue-700' : 
                                          'bg-green-100 text-green-700'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td>
                                    {p.payment_status === 'paid' ? (
                                        <div className="flex flex-col">
                                            <span className="text-green-600 font-bold text-xs flex items-center gap-1">
                                                Paid ✅
                                            </span>
                                            <span className="text-[9px] text-gray-400 font-mono tracking-tighter truncate w-24">
                                                {p.transactionId}
                                            </span>
                                        </div>
                                    ) : (
                                        <Link to={`/dashboard/payment/${p._id}`}>
                                            <button 
                                                className="btn btn-xs bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-md px-4"
                                                disabled={p.status !== 'pending'}
                                            >
                                                Pay
                                            </button>
                                        </Link>
                                    )}
                                </td>
                                <td className="flex justify-center items-center gap-3 py-4">
                                    <button 
                                        onClick={() => { setEditData(p); document.getElementById('edit_modal').showModal(); }} 
                                        className="btn btn-xs btn-outline btn-warning rounded-md" 
                                        // Disable edit if paid OR if it's already on its way
                                        disabled={p.status !== 'pending' || p.payment_status === 'paid'}
                                    >
                                        Edit
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDelete(p._id)} 
                                        className="btn btn-xs btn-outline btn-error rounded-md" 
                                        // Cannot cancel after paying
                                        disabled={p.status !== 'pending' || p.payment_status === 'paid'}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {parcels.length === 0 && (
                    <div className="text-center py-20 text-gray-400 font-medium">
                        No parcels found. Time to send something? 📦
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white text-gray-800 rounded-2xl p-8 border">
                    <h3 className="font-black text-2xl mb-6">Update Details</h3>
                    {editData && (
                        <form onSubmit={handleEditSubmit} className="space-y-5">
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400 italic">Parcel Title</label>
                                <input name="title" defaultValue={editData.title} className="input input-bordered w-full bg-gray-50" required />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400 italic">Receiver Name</label>
                                <input name="receiver" defaultValue={editData.receiverName} className="input input-bordered w-full bg-gray-50" required />
                            </div>
                            <div className="modal-action flex gap-2">
                                <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none flex-1">Save</button>
                                <button type="button" onClick={() => document.getElementById('edit_modal').close()} className="btn btn-ghost flex-1">Close</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyParcels;