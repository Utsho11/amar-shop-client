import { NavLink } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import ASCategoryTable from "../../components/table/ASCategoryTable";
import { TCategory } from "../../types";

interface Column<T> {
  key: keyof T; // The key should match a field in the data
  label: string; // The display name for the column
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const columns: Column<TCategory>[] = [
  { key: "id", label: "ID" },
  { key: "logoUrl", label: "Image" },
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
];

const ManageCategory = () => {
  const { data } = useGetCategoriesQuery(null);

  console.log(data?.data);

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };

  return (
    <div className="">
      <div className="text-end my-8">
        <button className="btn btn-success btn-sm">
          <NavLink to="/adminDashboard/addCategory">+ADD CATEGORY</NavLink>
        </button>
      </div>
      <div className="">
        <ASCategoryTable
          columns={columns}
          data={data?.data || []}
          isLoading={false}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default ManageCategory;
