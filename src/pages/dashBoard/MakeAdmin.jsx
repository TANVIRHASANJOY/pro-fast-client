import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MakeAdmin = () => {
  const [search, setSearch] = useState('');

  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Filter users based on email search (case-insensitive) and take top 10
  const filteredUsers = users
    .filter((user) => user.email.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  // Toggle admin role
  const handleToggleAdmin = async (user) => {
    const isAdmin = user.role === 'admin';
    const { isConfirmed } = await Swal.fire({
      title: isAdmin ? 'Remove Admin' : 'Make Admin',
      text: `Are you sure you want to ${isAdmin ? 'remove admin role from' : 'make'} ${user.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: isAdmin ? 'Yes, remove admin!' : 'Yes, make admin!',
    });

    if (isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${user._id}`, { role: isAdmin ? 'user' : 'admin' });
        Swal.fire('Success!', `${user.name} is now ${isAdmin ? 'a user' : 'an admin'}.`, 'success');
        refetch();
      } catch (err) {
        Swal.fire('Error', 'Something went wrong', 'error');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Manage Admins</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2 capitalize">{user.role}</td>
                    <td className="border px-4 py-2 flex justify-center gap-2">
                      <button
                        className={`btn btn-sm ${
                          user.role === 'admin'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        } transition`}
                        onClick={() => handleToggleAdmin(user)}
                      >
                        {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;