import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CompleteDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [deliveries, setDeliveries] = useState([]);
  const [totalEarn, setTotalEarn] = useState(0);
  const [cashOut, setCashOut] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/rider/completed-deliveries/${user.email}`)
      .then((res) => {
        const data = res.data;

        setDeliveries(data);

        // calculate earnings (50%)
        const earning = data.reduce((sum, item) => {
          return sum + item.cost * 0.5;
        }, 0);

        setTotalEarn(earning);
      })
      .catch(() => {
        toast.error("Failed to load deliveries");
      });
  }, [axiosSecure, user]);

  const remaining = totalEarn - cashOut;

  const handleCashOut = async () => {
    if (remaining <= 0) {
      toast.error("No balance available");
      return;
    }

    try {
      const res = await axiosSecure.post("/cashout", {
        email: user.email,   // ✅ FIXED HERE
        amount: remaining,
      });

      if (res.data.insertedId || res.data.success) {
        setCashOut(totalEarn);
        toast.success("Cashout Successful");
      }
    } catch (error) {
      toast.error("Cashout failed");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Completed Deliveries
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Earnings</h2>
          <p className="text-3xl font-bold mt-2">৳ {totalEarn}</p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Cashed Out</h2>
          <p className="text-3xl font-bold mt-2">৳ {cashOut}</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Available Balance</h2>
          <p className="text-3xl font-bold mt-2">৳ {remaining}</p>

          <button
            onClick={handleCashOut}
            disabled={remaining <= 0}
            className="mt-4 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
          >
            Cash Out
          </button>
        </div>

      </div>

      {/* Completed Parcel Table */}

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full text-sm">

          <thead className="bg-gray-900 text-white">

            <tr className="text-left">

              <th className="p-3">#</th>
              <th className="p-3">Parcel</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Price</th>
              <th className="p-3">Your Earn (50%)</th>

            </tr>

          </thead>

          <tbody>

            {deliveries.map((item, index) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 transition"
              >

                <td className="p-3">{index + 1}</td>

                <td className="p-3 font-medium">
                  {item.title}
                </td>

                <td className="p-3">
                  {item.receiverName}
                </td>

                <td className="p-3">
                  ৳ {item.cost}
                </td>

                <td className="p-3 text-green-600 font-semibold">
                  ৳ {item.cost * 0.5}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default CompleteDelivery;