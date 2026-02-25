import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import PaymentForm from '../PaymentForm'; 

// Use your actual Public Key here
const stripePromise = loadStripe('pk_test_51T4BdNQ6bBQQtEgWHvX2Vrq1WYwsq2EuVgCzAFvOHQJdhXIMbZtOamUoECvNYTnQ2IMf2Igr0TD5TppqHt1Y2a1p005nvUxKrp');

const Payments = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: parcel, isLoading } = useQuery({
        queryKey: ['parcel', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center flex justify-center items-center min-h-[400px]"><span className="loading loading-spinner loading-lg text-indigo-600"></span></div>;

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl border mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Checkout</h2>
            <div className="divider"></div>
            <div className="space-y-2 mb-6 text-gray-700">
                <p>Item: <span className="font-bold">{parcel?.title}</span></p>
                <p>Receiver: <span className="font-semibold">{parcel?.receiverName}</span></p>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-xl mb-8 border border-indigo-100">
                <p className="text-indigo-900 font-black text-2xl text-center">Total Payable: ৳{parcel?.cost}</p>
            </div>

            {/* Elements context provides access to Stripe tools */}
            <Elements stripe={stripePromise}>
                <PaymentForm parcel={parcel} />
            </Elements>
        </div>
    );
};

export default Payments;