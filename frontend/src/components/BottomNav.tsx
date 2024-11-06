import { useEffect, useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { HiHome } from "react-icons/hi";
import { GoPerson } from "react-icons/go";
import { GoPersonFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [currentLocation, setCurrentLocation] = useState<
    "home" | "profile" | ""
  >("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentLocation("home");
    } else if (location.pathname === "/profile") {
      setCurrentLocation("profile");
    } else {
      setCurrentLocation("");
    }
  }, [location]);

  return (
    <div className="absolute bottom-0 w-[100%] left-0 right-0 bg-[rgb(255,255,255)] pb-3">
      <div className="flex justify-between h-full w-[70%] mx-auto  py-2 gap-6 items-center">
        <BottomNavIcon
          isActive={currentLocation === "home"}
          activeIcon={<HiHome className="text-2xl" />}
          normalIcon={<HiOutlineHome className="text-2xl" />}
          onClick={() => navigate("/")}
        />

        <div className="flex-1 flex bg-black items-center justify-center gap-1 py-2 rounded-3xl cursor-pointer">
          <IoMdAdd className="text-white text-lg font-bold" />
          <h3 className="text-white text-[0.8rem]">New Chat</h3>
        </div>

        <BottomNavIcon
          isActive={currentLocation === "profile"}
          activeIcon={<GoPersonFill className="text-2xl" />}
          normalIcon={<GoPerson className="text-2xl" />}
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default BottomNav;

const BottomNavIcon = ({
  isActive,
  activeIcon,
  normalIcon,
  onClick,
}: {
  isActive: boolean;
  activeIcon: React.ReactNode;
  normalIcon: React.ReactNode;
  onClick: () => void;
}) => {
  return <div className="cursor-pointer" onClick={onClick}>{isActive ? activeIcon : normalIcon}</div>;
};
