import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { logout: logoutUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/logout");

      const data = await response.data;
      logoutUser();
      toast.success(data.message);
      new Promise((resolve) => setTimeout(resolve, 2 * 1000));
      navigate("/");
    } catch (error: any) {
      console.log({ error: error.response.data.error });
      toast.error(error.response.data.error || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    logout,
  };
};

export default useLogout;
