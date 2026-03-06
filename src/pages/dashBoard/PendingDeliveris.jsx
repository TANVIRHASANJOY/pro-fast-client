import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const PendingDeliveris = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // get assigned parcels for rider
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["rider-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider-parcels?email=${user.email}`);
      return res.data;
    },
  });

  // deliver parcel
  const handleDeliver = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcel-delivered/${id}`);

      if (res.data.modifiedCount > 0) {
        toast.success("Parcel Delivered ✅");
        refetch();
      }
    } catch (error) {
      toast.error("Delivery Failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Deliveries</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>District</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>

                <td>{parcel.senderName}</td>

                <td>{parcel.receiverName}</td>

                <td>{parcel.receiverDistrict}</td>

                <td>
                  <span className="badge badge-warning">
                    {parcel.status}
                  </span>
                </td>

                <td className="flex gap-2">

                  <button className="btn btn-sm btn-outline">
                    Booked
                  </button>

                  <button
                    onClick={() => handleDeliver(parcel._id)}
                    className="btn btn-sm btn-success"
                  >
                    Deliver
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No pending deliveries
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingDeliveris;