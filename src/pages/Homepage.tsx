import Banner1 from "../components/banner/Banner1";
import { useGetCategoriesQuery } from "../redux/services/categoryApi";

const Homepage = () => {
  const { data } = useGetCategoriesQuery(null);

  console.log(data);

  return (
    <div className="">
      <Banner1 />
    </div>
  );
};

export default Homepage;
