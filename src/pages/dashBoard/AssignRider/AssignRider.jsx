import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch parcels
  const { data: parcels = [], isLoading: parcelsLoading } = useQuery({
    queryKey: ['parcels'],
    queryFn: async () => {
      const res = await axiosSecure.get('/parcels');
      return res.data;
    },
  });

  // Fetch approved riders
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=approved');
      return res.data;
    },
  });

  // Assign rider mutation
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, riderEmail }) => {
      return await axiosSecure.patch(`/parcels/${parcelId}`, {
        riderEmail,
        status: 'picked',
      });
    },
    onSuccess: () => {
      toast.success('Rider assigned successfully!');
      queryClient.invalidateQueries(['parcels']);
    },
    onError: () => toast.error('Failed to assign rider.'),
  });

  if (parcelsLoading || ridersLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Assign Rider
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-100">
        <table className="table w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th>#</th>
              <th>Parcel</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Assign</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover:bg-green-50 transition-colors border-b last:border-0">
                <td className="px-4">{index + 1}</td>
                <td className="font-mono text-indigo-600 truncate max-w-[120px]">{parcel._id}</td>
                <td className="truncate max-w-[120px]">{parcel.email}</td>
                <td>
                  <span className={`badge ${parcel.payment_status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                    {parcel.payment_status}
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    parcel.status === 'picked' ? 'badge-info' :
                    parcel.status === 'booked' ? 'badge-success' :
                    'badge-warning'
                  }`}>
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <select
                    disabled={parcel.status === 'picked'}
                    className="select select-bordered select-sm w-full max-w-[140px] border-green-500 text-green-600"
                    onChange={(e) => {
                      const riderEmail = e.target.value;
                      if (!riderEmail) return;
                      assignMutation.mutate({ parcelId: parcel._id, riderEmail });
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Assign Rider
                    </option>
                    {riders.map((rider) => (
                      <option key={rider._id} value={rider.email}>
                        {rider.name?.split(' ')[0]} ({rider.district})
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📦</div>
            <h3 className="text-lg font-semibold text-gray-400 italic">No parcels found!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignRider;