import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth"; 
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SendParcel = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 
  const queryClient = useQueryClient();

  const [warehouses, setWarehouses] = useState([]);
  const [regions, setRegions] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue, // Manual value set korar jonno
    formState: { errors },
  } = useForm();

  // User load hole name field-e value set kore dibe
  useEffect(() => {
    if (user?.displayName) {
      setValue("senderName", user.displayName);
    }
  }, [user, setValue]);

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

  const calculateCost = (data) => {
    const sameCity = data.senderRegion === data.receiverRegion;
    const w = Number(data.weight) || 0;
    let base = 0, extra = 0, outsideCharge = 0;

    if (data.type === "document") {
      base = sameCity ? 60 : 80;
    } else {
      base = sameCity ? 110 : 150;
      if (w > 3) {
        extra = (w - 3) * 40;
        if (!sameCity) outsideCharge = 40;
      }
    }
    return { base, extra, outsideCharge, total: base + extra + outsideCharge };
  };

  const mutation = useMutation({
    mutationFn: async (parcelData) => {
      const res = await axiosSecure.post("/parcels", parcelData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["parcels", user?.email]);
      Swal.fire("Success!", "Parcel booked successfully", "success");
      reset();
    }
  });

  const onSubmit = async (data) => {
    const costDetails = calculateCost(data);
    const parcelData = {
      ...data,
      email: user?.email,
      cost: costDetails.total,
      status: "pending",
      payment_status: "unpaid",
      creation_date: new Date().toISOString(),
    };
    mutation.mutate(parcelData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Send New Parcel</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4 border-b pb-2">Parcel Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-4 p-2">
              <label><input {...register("type", { required: true })} type="radio" value="document" /> Document</label>
              <label><input {...register("type", { required: true })} type="radio" value="non-document" /> Non-Doc</label>
            </div>
            <input {...register("title", { required: true })} placeholder="Parcel Title" className="border p-2 rounded" />
            {parcelType === "non-document" && (
              <input type="number" {...register("weight", { required: true })} placeholder="Weight (kg)" className="border p-2 rounded" />
            )}
          </div>
        </div>

        {/* Sender Info (Now Editable & Simple) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4 border-b pb-2">Sender Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              {...register("senderName", { required: "Name is required" })} 
              placeholder="Sender Name" 
              className={`border p-2 rounded ${errors.senderName ? 'border-red-500' : ''}`}
            />
            <input {...register("senderContact", { required: true })} placeholder="Contact Number" className="border p-2 rounded" />
            
            <select {...register("senderRegion", { required: true })} className="border p-2 rounded">
              <option value="">Select Region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>

            <select {...register("senderCenter", { required: true })} className="border p-2 rounded">
              <option value="">Select Center</option>
              {getCentersByRegion(senderRegion).map((c, i) => <option key={i} value={c.district}>{c.district}</option>)}
            </select>
          </div>
        </div>

        {/* Receiver Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4 border-b pb-2">Receiver Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="border p-2 rounded" />
            <input {...register("receiverContact", { required: true })} placeholder="Receiver Contact" className="border p-2 rounded" />
            
            <select {...register("receiverRegion", { required: true })} className="border p-2 rounded">
              <option value="">Select Region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>

            <select {...register("receiverCenter", { required: true })} className="border p-2 rounded">
              <option value="">Select Center</option>
              {getCentersByRegion(receiverRegion).map((c, i) => <option key={i} value={c.district}>{c.district}</option>)}
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default SendParcel;