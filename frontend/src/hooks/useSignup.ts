import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async ({
    fullName,
    username,
    gender,
    password,
    confirmPassword,
  }: {
    fullName: string;
    username: string;
    gender: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { verify, errorMsg } = verifyInputs({
      fullName,
      username,
      gender,
      password,
      confirmPassword,
    });
    if (!verify) {
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/auth/signup", {
        fullName,
        username,
        gender,
        password,
        confirmPassword,
      });

      const data = await response.data;
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
    signup,
  };
};

const verifyInputs = ({
  fullName,
  username,
  gender,
  password,
  confirmPassword,
}: {
  fullName: string;
  username: string;
  gender: string;
  password: string;
  confirmPassword: string;
}) => {
  let verify = true;
  let errorMsg = "";

  if (!fullName || !username || !gender || !password || !confirmPassword) {
    errorMsg = "All input fields are required";
    verify = false;
    return { verify, errorMsg };
  }
  if (password !== confirmPassword) {
    errorMsg = "Passwords does not match";
    verify = false;
    return { verify, errorMsg };
  }

  return { verify, errorMsg };
};

export default useSignup;
