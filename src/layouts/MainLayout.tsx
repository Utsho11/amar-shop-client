import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 shadow-md bg-base-100">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 mt-auto">
        {/* <p>© {new Date().getFullYear()} AmarShop. All rights reserved.</p> */}
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
