import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    // Backend theke payment data fetch kora
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
            return res.data;
        }
    });

    // Loading state handling
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
    );

    // Total spending calculate kora
    const totalSpent = payments.reduce((sum, payment) => sum + parseFloat(payment.price), 0);

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                            Payment <span className="text-indigo-600">History</span>
                        </h2>
                        <p className="text-gray-500 mt-1">View all your successful transactions here.</p>
                    </div>
                    <div className="stats shadow bg-white border border-gray-100">
                        <div className="stat">
                            <div className="stat-title font-bold text-gray-500">Total Spent</div>
                            <div className="stat-value text-indigo-600 text-2xl">৳ {totalSpent.toFixed(2)}</div>
                            <div className="stat-desc font-medium text-gray-400">Total {payments.length} Payments</div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Head */}
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="py-5 px-6">#</th>
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {payments.map((payment, index) => (
                                    <tr key={payment._id} className="hover:bg-indigo-50/30 transition-colors border-b last:border-0">
                                        <td className="px-6 font-medium text-gray-400">{index + 1}</td>
                                        <td className="font-mono text-indigo-600 font-semibold text-sm">
                                            {payment.transactionId}
                                        </td>
                                        <td className="font-bold text-gray-800">
                                            ৳ {payment.price}
                                        </td>
                                        <td className="text-gray-500 text-sm italic">
                                            {new Date(payment.date).toLocaleDateString()}
                                            <span className="block text-[10px] text-gray-400 not-italic">
                                                {new Date(payment.date).toLocaleTimeString()}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge badge-success bg-green-100 text-green-700 border-none font-bold text-[10px] px-3 py-3 uppercase">
                                                {payment.status || 'Paid'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {payments.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-5xl mb-4">💳</div>
                            <h3 className="text-xl font-bold text-gray-400 italic">No payment history found!</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;