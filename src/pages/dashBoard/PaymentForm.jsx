import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentForm = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handlePay = async (e) => {
        e.preventDefault();
        
        // Simulation of a payment process
        const paymentInfo = {
            transactionId: `TRX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.patch(`/parcels/pay/${id}`, paymentInfo);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Payment Successful!",
                    text: `Transaction ID: ${paymentInfo.transactionId}`,
                    icon: "success",
                    confirmButtonColor: "#4F46E5"
                });
                navigate("/dashboard/my-parcels");
            }
        } catch (error) {
            Swal.fire("Error", "Payment failed. Please try again.", "error");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-gray-100">
                <div className="card-body p-8">
                    <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Complete Payment</h2>
                    
                    <form onSubmit={handlePay} className="space-y-5">
                        {/* Cardholder Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Cardholder Name</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter full name" 
                                className="input input-bordered focus:border-indigo-500 w-full" 
                                required 
                            />
                        </div>

                        {/* Card Number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Card Number</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="0000 0000 0000 0000" 
                                    className="input input-bordered w-full pr-10" 
                                    maxLength="16"
                                    required 
                                />
                                <span className="absolute right-3 top-3 text-xl">💳</span>
                            </div>
                        </div>

                        {/* Row for Expiry and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Expiry Date</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="MM / YY" 
                                    className="input input-bordered w-full" 
                                    required 
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">CVV</span>
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="123" 
                                    className="input input-bordered w-full" 
                                    maxLength="3"
                                    required 
                                />
                            </div>
                        </div>

                        {/* Summary Info */}
                        <div className="bg-indigo-50 p-4 rounded-lg mt-4">
                            <div className="flex justify-between text-sm text-indigo-900">
                                <span>Service Charge</span>
                                <span>৳ 0.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-indigo-900 mt-1 border-t border-indigo-200 pt-1">
                                <span>Total Payable</span>
                                <span>Calculated at Booking</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-indigo bg-indigo-600 hover:bg-indigo-700 text-white border-none text-lg">
                                Pay for Parcel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;