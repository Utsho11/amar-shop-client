import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const AuthLayout = () => {
  return (
    <div className="min-w-full">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
