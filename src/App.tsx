import { useTheme } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import CompareFloatingBar from "./components/product/CompareFloatingBar";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={`${theme === "dark" ? "bg-[#0f1115]" : "bg-[#f8f5f0]"}`}>
      <MainLayout />
      <CompareFloatingBar />
    </div>
  );
};

export default App;
