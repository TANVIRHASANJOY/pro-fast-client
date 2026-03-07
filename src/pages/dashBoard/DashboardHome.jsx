import React, { useEffect, useState } from "react";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalRiders: 0,
    totalParcels: 0,
    pendingParcels: 0,
    paidParcels: 0,
    deliveredParcels: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roleLoading) {
      const fetchData = async () => {
        try {
          let res;

          if (role === "admin") {
            const usersRes = await axiosSecure.get("/users");
            const ridersRes = await axiosSecure.get("/riders");
            const parcelsRes = await axiosSecure.get("/parcels");

            const parcels = parcelsRes.data;

            const totalUsers = usersRes.data.length;
            const totalRiders = ridersRes.data.length;
            const totalParcels = parcels.length;

            const pendingParcels = parcels.filter(
              p => p.status !== "delivered"
            ).length;

            const deliveredParcels = parcels.filter(
              p => p.status === "delivered"
            ).length;

            const paidParcels = parcels.filter(
              p => p.payment_status === "paid"
            ).length;

            setSummary({
              totalUsers,
              totalRiders,
              totalParcels,
              pendingParcels,
              paidParcels,
              deliveredParcels
            });
          }

          else if (role === "rider") {
            const email = localStorage.getItem("email");
            res = await axiosSecure.get(`/rider-parcels?email=${email}`);
            setData(res.data);
          }

          else {
            const email = localStorage.getItem("email");
            res = await axiosSecure.get(`/parcels?email=${email}`);
            setData(res.data);
          }

          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }
  }, [role, roleLoading, axiosSecure]);

  if (roleLoading || loading) return <p className="p-6">Loading Dashboard...</p>;

  const chartData = [
    { name: "Delivered", value: summary.deliveredParcels },
    { name: "Pending", value: summary.pendingParcels },
    { name: "Paid", value: summary.paidParcels },
  ];

  return (
    <div className="p-6 space-y-8">
<h1 className="text-4xl md:text-5xl font-extrabold text-center">
  <span className="text-red-500 italic">D</span>
  <span className="text-orange-500 italic">a</span>
  <span className="text-yellow-500 italic">s</span>
  <span className="text-green-500 italic">h</span>
  <span className="text-blue-500 italic">b</span>
  <span className="text-indigo-500 italic">o</span>
  <span className="text-purple-500 italic">a</span>
  <span className="text-pink-500 italic">r</span>
  <span className="text-red-500 italic">d</span>{" "}
  <span className="text-green-500 italic">H</span>
  <span className="text-blue-500 italic">o</span>
  <span className="text-purple-500 italic">m</span>
  <span className="text-pink-500 italic">e</span>
</h1>

      {/* ADMIN CARDS */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            <div className="bg-blue-500 text-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-2xl font-bold">{summary.totalUsers}</p>
            </div>

            <div className="bg-green-500 text-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold">Total Riders</h2>
              <p className="text-2xl font-bold">{summary.totalRiders}</p>
            </div>

            <div className="bg-yellow-500 text-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold">Total Parcels</h2>
              <p className="text-2xl font-bold">{summary.totalParcels}</p>
            </div>

            <div className="bg-red-500 text-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold">Pending Parcels</h2>
              <p className="text-2xl font-bold">{summary.pendingParcels}</p>
            </div>

            <div className="bg-purple-500 text-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold">Paid Parcels</h2>
              <p className="text-2xl font-bold">{summary.paidParcels}</p>
            </div>

          </div>

          {/* PIE CHART */}
          <div className="flex justify-center mt-10">
            <PieChart width={400} height={400}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </>
      )}

      {/* RIDER TABLE */}
      {role === "rider" && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3">Assigned Parcels</h2>

          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Parcel</th>
                <th className="p-2 border">Sender</th>
                <th className="p-2 border">Receiver</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map(parcel => (
                <tr key={parcel._id}>
                  <td className="p-2 border">{parcel.title}</td>
                  <td className="p-2 border">{parcel.senderName}</td>
                  <td className="p-2 border">{parcel.receiverName}</td>
                  <td className="p-2 border">{parcel.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* USER TABLE */}
      {role === "user" && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-3">Your Parcels</h2>

          <table className="min-w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Parcel</th>
                <th className="p-2 border">Cost</th>
                <th className="p-2 border">Payment</th>
                <th className="p-2 border">Delivery</th>
              </tr>
            </thead>

            <tbody>
              {data.map(parcel => (
                <tr key={parcel._id}>
                  <td className="p-2 border">{parcel.title}</td>
                  <td className="p-2 border">{parcel.cost}</td>
                  <td className="p-2 border">{parcel.payment_status}</td>
                  <td className="p-2 border">{parcel.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;