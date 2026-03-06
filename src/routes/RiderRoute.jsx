import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isRider, setIsRider] = useState(false);
  const [riderLoading, setRiderLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/users/rider/${user.email}`)
      .then(res => {
        // ✅ MATCH BACKEND RESPONSE
        setIsRider(res.data.rider === true);
        setRiderLoading(false);
      })
      .catch(() => {
        setIsRider(false);
        setRiderLoading(false);
      });
  }, [user, axiosSecure]);

  if (loading || riderLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user || !isRider) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RiderRoute;