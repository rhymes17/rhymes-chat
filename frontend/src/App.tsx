import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="relative h-[100%] w-[100%] overflow-hidden">
      <Header />
      <div className="overflow-y-scroll h-[100%] px-3">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default App;
