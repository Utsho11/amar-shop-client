import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import Loading from "../shared/Loading";

const CategorySection = () => {
  const { data, isFetching } = useGetCategoriesQuery(null);
  const { theme } = useTheme();

  const categories = data?.data || [];

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="py-10">
      <h1 className="text-start text-3xl font-semibold mb-8">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-500"
                : "bg-white hover:bg-gray-200"
            }  p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden mb-3">
              <img
                src={category.logoUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2
              className={`text-lg font-medium ${
                theme === "dark" ? "text-white" : "text-gray-700"
              } hover:text-primary transition-colors`}
            >
              <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="text-blue-500 hover:underline"
              >
                {category.name}
              </Link>
              {/* {category.name} */}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
