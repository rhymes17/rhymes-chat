import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const data = await response.data;
      loginUser(data.user);
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
    login,
  };
};

export default useLogin;
