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

    const { data: parcels = [], isLoading, isError, error } = useQuery({
        queryKey: ['parcels', user?.email], 
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

    const { mutateAsync: deleteParcel } = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/parcels/${id}`),
        onSuccess: () => {
            Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false });
            queryClient.invalidateQueries(['parcels', user?.email]);
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove your booking!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444", 
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) await deleteParcel(id);
        });
    };

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
        await updateParcel({ title: form.title.value, receiverName: form.receiver.value });
    };

    if (authLoading || isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner text-success"></span></div>;

    return (
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Booked Parcels ({parcels.length})</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800">
                            <th>Parcel Title</th>
                            <th>Receiver</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map(p => (
                            <tr key={p._id} className="hover:bg-gray-50 border-b">
                                <td className="font-semibold">{p.title}</td>
                                <td>{p.receiverName}</td>
                                <td>
                                    <span className={`badge border-none py-3 ${p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="flex items-center gap-2">
                                    {/* 💳 STEP 2: PAY OPTION */}
                                    {p.payment_status === 'paid' ? (
                                        <span className="text-green-600 font-bold px-2">Paid ✅</span>
                                    ) : (
                                        <Link to={`/dashboard/payment/${p._id}`}>
                                            <button className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none" disabled={p.status !== 'pending'}>
                                                Pay
                                            </button>
                                        </Link>
                                    )}
                                    <button onClick={() => { setEditData(p); document.getElementById('edit_modal').showModal(); }} className="btn btn-sm btn-warning" disabled={p.status !== 'pending' || p.payment_status === 'paid'}>Edit</button>
                                    <button onClick={() => handleDelete(p._id)} className="btn btn-sm btn-error text-white" disabled={p.status !== 'pending'}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <dialog id="edit_modal" className="modal">
                <div className="modal-box bg-white text-gray-800">
                    <h3 className="font-bold text-lg mb-4">Update Parcel</h3>
                    {editData && (
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input name="title" defaultValue={editData.title} className="input input-bordered w-full bg-white" required />
                            <input name="receiver" defaultValue={editData.receiverName} className="input input-bordered w-full bg-white" required />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-success text-white">Save</button>
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