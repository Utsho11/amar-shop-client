import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import TriangleBar from "./Shape/TriangleBar";
import { useGetTNXDetailsQuery } from "../../redux/services/userApi";
import { TTNXHistory } from "../../types";
import Loading from "../shared/Loading";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const RevenueChart = () => {
  const { data, isLoading } = useGetTNXDetailsQuery(null);

  // console.log(data);

  const transactionData = data?.data || [];
  // console.log(transactionData);

  const getTotalAmountByYear = (data: TTNXHistory[]) => {
    return data.reduce(
      (acc: { year: number; totalAmount: number }[], transaction) => {
        const year = new Date(transaction.createdAt).getFullYear();
        const amount = parseFloat(transaction.amount);

        // Check if the year already exists in the accumulator array
        const existingYear = acc.find((item) => item.year === year);

        if (existingYear) {
          existingYear.totalAmount += amount; // Add the amount to the existing year's total
        } else {
          acc.push({ year, totalAmount: amount }); // Add a new entry for the year
        }

        return acc;
      },
      []
    );
  };

  // Example usage: Get the total amount for all years
  const totalAmountByYear = getTotalAmountByYear(transactionData);
  // console.log(totalAmountByYear);

  return (
    <div className="">
      <div className="text-2xl font-bold text-center my-8">
        <h1>Revenue Summery Per Year</h1>
      </div>
      <div className="overflow-x-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <BarChart
            width={800}
            height={500}
            data={totalAmountByYear}
            className="mx-auto"
            margin={{
              top: 20,
              right: 30,
              left: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Bar
              dataKey="totalAmount"
              fill="#8884d8"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              shape={(props: any) => <TriangleBar {...props} />}
              label={{ position: "top" }}
            >
              {totalAmountByYear.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
