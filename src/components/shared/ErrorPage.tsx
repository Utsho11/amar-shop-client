import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ErrorPage = () => {
  const error: any = useRouteError();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  let errorMessage = "An unexpected error occurred.";
  let isChunkError = false;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText} - ${error.data || ""}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    if (
      errorMessage.includes("Failed to fetch dynamically imported module") ||
      errorMessage.includes("Loading chunk") ||
      errorMessage.includes("Failed to load module")
    ) {
      isChunkError = true;
    }
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        isDark ? "bg-[#141312] text-[#F9F5F0]" : "bg-[#F9F5F0] text-[#3D352F]"
      }`}
    >
      <div
        className={`max-w-lg w-full rounded-3xl p-8 text-center border shadow-xl ${
          isDark ? "bg-[#211E1D] border-white/10" : "bg-white border-[#E8DED2]"
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-error/10 text-error flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={32} />
        </div>

        <h1 className="text-2xl font-bold mb-2">
          {isChunkError ? "App Updated" : "Something Went Wrong"}
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          {isChunkError
            ? "A newer version of AmarShop is available. Please reload the page to load the latest features."
            : errorMessage}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRefresh}
            className="btn btn-primary rounded-full w-full sm:w-auto gap-2 px-6"
          >
            <RotateCcw size={16} />
            Reload Page
          </button>
          <Link
            to="/"
            className="btn btn-outline rounded-full w-full sm:w-auto gap-2 px-6"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
