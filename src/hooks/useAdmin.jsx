import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

/**
 * Custom hook to check if the current user is an admin.
 * Returns:
 *   [isAdmin: boolean, isLoading: boolean]
 */
const useAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // React Query to fetch user role from backend
  const { data: isAdmin = false, isLoading } = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !authLoading && !!user?.email, // only run when user exists
    queryFn: async () => {
      if (!user?.email) return false;

      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data?.role === 'admin'; // true if admin
      } catch (err) {
        console.error('Error checking admin role:', err);
        return false;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false, // avoid unnecessary refetch
  });

  return [isAdmin, isLoading || authLoading];
};

export default useAdmin;