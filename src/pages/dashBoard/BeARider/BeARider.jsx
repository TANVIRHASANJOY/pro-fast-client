import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // <-- import SweetAlert2

const BeARider = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [warehouses, setWarehouses] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [region, setRegion] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user?.displayName || '');

    // Load warehouse data
    useEffect(() => {
        fetch('/warehouses.json')
            .then(res => res.json())
            .then(data => {
                setWarehouses(data);

                // Unique district list
                const uniqueDistricts = [...new Set(
                    data.map(item => item.district)
                )];

                setDistricts(uniqueDistricts);
            })
            .catch(err => console.log(err));
    }, []);

    // Handle district change
    const handleDistrictChange = (e) => {
        const district = e.target.value;
        setSelectedDistrict(district);

        if (!district) {
            setRegion('');
            return;
        }

        const warehouse = warehouses.find(
            item => item.district === district
        );

        if (warehouse) {
            setRegion(warehouse.region);
        }
    };

    // Submit rider application
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const riderData = {
            name: name,
            email: user?.email,
            phone: form.phone.value,
            district: selectedDistrict,
            region: region,
            vehicleType: form.vehicleType.value,
            nid: form.nid.value
            // status & createdAt handled by backend
        };

        try {
            setLoading(true);

            const res = await axiosSecure.post("/riders", riderData);

            if (res.data.insertedId) {
                // SweetAlert success
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    text: '✅ Rider Application Submitted Successfully',
                    confirmButtonColor: '#3085d6'
                });

                form.reset();
                setSelectedDistrict('');
                setRegion('');
                setName(user?.displayName || '');
                navigate('/dashboard');
            }

        } catch (error) {
            console.log(error);

            // SweetAlert error
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: '❌ Failed to submit application',
                confirmButtonColor: '#d33'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Become A Rider
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-800"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            name="phone"
                            type="text"
                            required
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* District */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            District
                        </label>
                        <select
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select District</option>
                            {districts.map(district => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Region */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Region
                        </label>
                        <input
                            type="text"
                            value={region}
                            readOnly
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                        />
                    </div>

                    {/* Vehicle */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Vehicle Type
                        </label>
                        <select
                            name="vehicleType"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select Vehicle</option>
                            <option value="Bike">Bike</option>
                            <option value="Cycle">Cycle</option>
                            <option value="Car">Car</option>
                        </select>
                    </div>

                    {/* NID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            NID Number
                        </label>
                        <input
                            name="nid"
                            type="text"
                            required
                            placeholder="Enter NID"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default BeARider;