import { useEffect, useState } from "react";
import Input from "../components/Input";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import useLogin from "../hooks/useLogin";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const { isLoading, login } = useLogin();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className=" w-[352px] rounded-[1.5rem] px-3 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Login</h1>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onInputChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type={isPasswordHidden ? "password" : "text"}
          placeholder="Password"
          value={password}
          onInputChange={(e) => setPassword(e.target.value)}
          rightIcon={
            isPasswordHidden ? (
              <IoEyeOutline
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                className="text-xl"
              />
            ) : (
              <IoEyeOffSharp
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                className="text-xl"
              />
            )
          }
        />
        <Button
          isLoading={isLoading}
          onClick={() => login({ username, password })}
          title="Login"
        />

        <div className="">
          <h3 className="md:text-[0.9rem]">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-secondary underline md:text-[0.9rem]"
            >
              Signup instead
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
