import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth"; // Added for email
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Added for auto-refresh

const SendParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Get current logged-in user
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [warehouses, setWarehouses] = useState([]);
  const [regions, setRegions] = useState([]);

  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // Load warehouse data
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setWarehouses(data);
        const uniqueRegions = [...new Set(data.map((w) => w.region))];
        setRegions(uniqueRegions);
      });
  }, []);

  const getCentersByRegion = (region) => {
    return warehouses.filter((w) => w.region === region);
  };

  // ===== COST CALCULATION =====
  const calculateCost = (data) => {
    const sameCity = data.senderRegion === data.receiverRegion;
    const w = Number(data.weight) || 0;

    let base = 0;
    let extra = 0;
    let outsideCharge = 0;

    if (data.type === "document") {
      base = sameCity ? 60 : 80;
    }

    if (data.type === "non-document") {
      if (w <= 3) {
        base = sameCity ? 110 : 150;
      } else {
        base = sameCity ? 110 : 150;
        extra = (w - 3) * 40;
        if (!sameCity) {
          outsideCharge = 40;
        }
      }
    }

    const total = base + extra + outsideCharge;
    return { base, extra, outsideCharge, total };
  };

  // ===== TANSTACK MUTATION (Handle Save) =====
  const mutation = useMutation({
    mutationFn: async (parcelData) => {
      const res = await axiosSecure.post("/parcels", parcelData);
      return res.data;
    },
    onSuccess: () => {
      // This tells the dashboard to refresh data immediately
      queryClient.invalidateQueries(["parcels", user?.email]);
      
      Swal.fire({
        title: "Success! 🎉",
        text: "Your parcel has been booked and saved.",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });
      reset();
    },
    onError: (error) => {
      console.error("❌ Database Error:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to save parcel. Please try again.",
        icon: "error",
      });
    }
  });

  // ===== SUBMIT LOGIC =====
  const onSubmit = async (data) => {
    const costDetails = calculateCost(data);

    // 1. Show Confirmation Modal
    Swal.fire({
      title: "Confirm Your Parcel",
      html: `
        <div style="text-align:left">
          <p><b>Base Cost:</b> ৳${costDetails.base}</p>
          <p><b>Extra Weight Charge:</b> ৳${costDetails.extra}</p>
          <p><b>Outside City Charge:</b> ৳${costDetails.outsideCharge}</p>
          <hr/>
          <h3>Total Cost: ৳${costDetails.total}</h3>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Pay",
      cancelButtonText: "Edit",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        // 2. Prepare Data (CRITICAL: Added senderEmail)
        const parcelData = {
          ...data,
          senderEmail: user?.email, // Connects parcel to your email
          weight: data.weight ? Number(data.weight) : 0,
          cost: costDetails.total,
          status: "pending",
          payment_status: "paid",
          creation_date: new Date().toISOString(),
        };

        // 3. Trigger Mutation
        mutation.mutate(parcelData);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-2">Add Parcel</h1>
      <p className="text-center text-gray-600 mb-6">Door to Door Delivery Service</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ===== Parcel Info ===== */}
        <div className="border p-6 rounded-xl shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                />
                Document
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                />
                Non-Document
              </label>
            </div>

            <input
              type="text"
              placeholder="Parcel Title"
              {...register("title", { required: true })}
              className="border p-2 rounded-lg"
            />

            {parcelType === "non-document" && (
              <input
                type="number"
                step="0.1"
                placeholder="Weight (kg)"
                {...register("weight", { required: true })}
                className="border p-2 rounded-lg"
              />
            )}
          </div>
        </div>

        {/* ===== Sender Info ===== */}
        <div className="border p-6 rounded-xl shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Sender Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              defaultValue={user?.displayName || "Joy"}
              {...register("senderName", { required: true })}
              className="border p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Contact"
              {...register("senderContact", { required: true })}
              className="border p-2 rounded-lg"
            />
            <select
              {...register("senderRegion", { required: true })}
              className="border p-2 rounded-lg"
            >
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
            <select
              {...register("senderCenter", { required: true })}
              className="border p-2 rounded-lg"
            >
              <option value="">Select Service Center</option>
              {getCentersByRegion(senderRegion).map((c, i) => (
                <option key={i} value={c.district}>{c.district}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address"
              {...register("senderAddress", { required: true })}
              className="border p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Pick up Instruction"
              {...register("pickupInstruction", { required: true })}
              className="border p-2 rounded-lg"
            />
          </div>
        </div>

        {/* ===== Receiver Info ===== */}
        <div className="border p-6 rounded-xl shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Receiver Name"
              {...register("receiverName", { required: true })}
              className="border p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Contact"
              {...register("receiverContact", { required: true })}
              className="border p-2 rounded-lg"
            />
            <select
              {...register("receiverRegion", { required: true })}
              className="border p-2 rounded-lg"
            >
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
            <select
              {...register("receiverCenter", { required: true })}
              className="border p-2 rounded-lg"
            >
              <option value="">Select Service Center</option>
              {getCentersByRegion(receiverRegion).map((c, i) => (
                <option key={i} value={c.district}>{c.district}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address"
              {...register("receiverAddress", { required: true })}
              className="border p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Delivery Instruction"
              {...register("deliveryInstruction", { required: true })}
              className="border p-2 rounded-lg"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={mutation.isPending}
          className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition ${mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {mutation.isPending ? "Submitting..." : "Submit Parcel"}
        </button>
      </form>
    </div>
  );
};

export default SendParcel;