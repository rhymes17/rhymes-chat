import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="h-[100vh] w-[100vw] bg-offwhite-bg flex justify-center items-center overflow-hidden">
      <div className="h-[100vh] w-[100vw] md:h-[650px] md:w-[352px] bg-primary md:rounded-[1.5rem] px-3 shadow-xl font-monts overflow-y-scroll">
        <Outlet />
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
