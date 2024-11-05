import { useEffect, useState } from "react";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import Button from "../components/Button";
import Input from "../components/Input";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const { isLoading, signup } = useSignup();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[352px] rounded-[1.5rem] px-3 flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Signup</h1>
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onInputChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onInputChange={(e) => setUsername(e.target.value)}
        />
        <select
          id="options"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border-[0.09rem] border-black rounded-md h-12 px-3"
        >
          <option value="">-- Choose gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
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
        <Input
          type={isConfirmPasswordHidden ? "password" : "text"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onInputChange={(e) => setConfirmPassword(e.target.value)}
          rightIcon={
            isConfirmPasswordHidden ? (
              <IoEyeOutline
                onClick={() =>
                  setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                }
                className="text-xl "
              />
            ) : (
              <IoEyeOffSharp
                onClick={() =>
                  setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
                }
                className="text-xl "
              />
            )
          }
        />

        <Button
          isLoading={isLoading}
          onClick={() =>
            signup({
              fullName,
              username,
              gender,
              password,
              confirmPassword,
            })
          }
          title="Signup"
        />

        <div className="">
          <h3 className="md:text-[0.9rem]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-secondary underline md:text-[0.9rem]"
            >
              Login instead
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Signup;
