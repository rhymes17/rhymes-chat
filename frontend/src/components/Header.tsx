import useLogout from "../hooks/useLogout";
import Button from "./Button";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Header = () => {
  const { isLoading, logout } = useLogout();
  return (
    <div className="py-5 w-full flex justify-between sticky top-0 bg-[rgb(255,255,255)]">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl font-medium tracking-wide ">RhymesChat</h1>
        <Button
          style={{
            width: "55px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          isLoading={isLoading}
          onClick={logout}
          title={<RiLogoutBoxRLine className="text-2xl font-[900]" />}
        />
      </div>
    </div>
  );
};

export default Header;
