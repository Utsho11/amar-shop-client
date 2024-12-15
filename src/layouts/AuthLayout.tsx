import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-w-full">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
