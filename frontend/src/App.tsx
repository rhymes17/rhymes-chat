import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="relative h-[100%] w-[100%]">
      <Header />
      <div className="border-black border-2 min-h-[90%] md:min-h-[100%]">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
