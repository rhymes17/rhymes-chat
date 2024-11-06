import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import '../index.css'

const Layout = () => {
  return (
    <main className="h-[100vh] w-[100vw] bg-offwhite-bg flex justify-center items-center overflow-hidden">
      <div className="h-[100vh] w-[100vw] md:h-[650px] md:w-[352px] bg-primary md:rounded-[1.5rem] shadow-xl font-monts overflow-y-scroll scrollbar-hidden">
        <Outlet />
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
