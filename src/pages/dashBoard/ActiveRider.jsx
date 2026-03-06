import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ActiveRider = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const axiosSecure = useAxiosSecure();

  // Fetch active riders
  const { data: riders = [], refetch, isLoading } = useQuery({
    queryKey: ['activeRiders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=approved'); // "approved" is active in backend
      return res.data;
    },
  });

  // Deactivate rider
  const handleDeactivate = async (rider) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Deactivate Rider',
      text: `Are you sure you want to deactivate ${rider.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate!',
      confirmButtonColor: '#dc2626',
    });

    if (isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${rider._id}`, { status: 'pending' });
        Swal.fire('Deactivated!', `${rider.name} is now pending.`, 'success');
        refetch();
      } catch (err) {
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    }
  };

  // Filter riders based on search input
  const filteredRiders = riders.filter((rider) =>
    (rider.name?.toLowerCase().includes(search.toLowerCase()) || 
     rider.phone?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Active Riders</h2>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">District</th>
                <th className="border px-4 py-2 text-left">Vehicle</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No active riders found
                  </td>
                </tr>
              ) : (
                filteredRiders.map((rider) => (
                  <tr key={rider._id} className="hover:bg-gray-50 transition-colors">
                    <td className="border px-4 py-2">{rider.name}</td>
                    <td className="border px-4 py-2">{rider.email}</td>
                    <td className="border px-4 py-2">{rider.district}</td>
                    <td className="border px-4 py-2">{rider.vehicleType}</td>
                    <td className="border px-4 py-2 flex justify-center gap-2">
                      <button
                        className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 transition"
                        onClick={() => {
                          setSelectedRider(rider);
                          setShowModal(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={() => handleDeactivate(rider)}
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for rider details */}
      {showModal && selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <h3 className="text-2xl font-bold mb-4 text-gray-700">{selectedRider.name}</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>Covered Area:</strong> {selectedRider.coveredArea}</p>
              <p><strong>Vehicle:</strong> {selectedRider.vehicleType}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
            </div>
            <button
              className="mt-6 btn w-full bg-gray-800 hover:bg-gray-900 text-white"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveRider;