import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const TrackParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParcels = async () => {
    try {
      setLoading(true);

      let url = "/parcels";

      // Conditional: if user is not admin or rider, fetch only their parcels
      if (user.role !== "admin" && user.role !== "rider") {
        url = `/parcels?email=${user.email}`;
      }

      const res = await axiosSecure.get(url);
      setParcels(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch parcels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.email) return;

    fetchParcels();

    const interval = setInterval(fetchParcels, 10000); // auto refresh every 10s
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Parcel Tracking</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr className="text-left">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Sender</th>
              <th className="p-3">Receiver</th>
              <th className="p-3">Weight</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{parcel.title}</td>
                <td className="p-3">{parcel.senderName}</td>
                <td className="p-3">{parcel.receiverName}</td>
                <td className="p-3">{parcel.weight} kg</td>
                <td className="p-3">৳ {parcel.cost}</td>
                <td className="p-3 font-semibold">
                  {parcel.status.charAt(0).toUpperCase() + parcel.status.slice(1)}
                </td>
                <td className="p-3 font-semibold">
                  {parcel.payment_status.charAt(0).toUpperCase() + parcel.payment_status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackParcel;