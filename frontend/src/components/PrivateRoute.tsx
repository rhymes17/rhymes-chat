import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { ThreeDots } from "react-loader-spinner";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-[100%] w-[100%] flex items-center justify-center">
        <ThreeDots
          visible={true}
          height="50"
          width="30"
          color="secondary"
          radius="10"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
