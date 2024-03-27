import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

// Define the LogoutButton component
const LogoutButton = () => {
  // Define the useLogout hook inside the LogoutButton component
  const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const logout = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "content-type": "application/json" },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    return { loading, logout };
  };

  // Call the useLogout hook inside the functional component
  const { loading, logout } = useLogout();

  return (
    <button onClick={logout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
