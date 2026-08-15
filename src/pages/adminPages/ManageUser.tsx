import { useState } from "react";
import ReactPaginate from "react-paginate";
import ASUserTable from "../../components/table/ASUserTable";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useSuspendUserMutation,
} from "../../redux/services/userApi";
import { TUsers } from "../../types";
import { useTheme } from "../../context/ThemeContext";

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const ManageUser = () => {
  const { data, isLoading } = useGetUsersQuery(null);
  const [suspendUser] = useSuspendUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of users per page

  // Columns configuration
  const columns: Column<TUsers>[] = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "email", label: "User Email" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" },
  ];

  // Paginated data
  const paginatedData = data?.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );
  const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleSuspend = (id: string) => {
    suspendUser(id);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      <div className="text-center sm:text-left">
        <p
          className={`text-xs font-medium uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          Users Management
        </p>

        <h1
          className={`mt-2 text-2xl sm:text-3xl font-bold ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Manage All Accounts
        </h1>
      </div>
      <div>
        <ASUserTable
          onSuspend={toggleSuspend}
          onDelete={handleDelete}
          columns={columns}
          data={paginatedData || []}
          isLoading={isLoading}
        />
      </div>
      {/* Pagination Controls */}
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center gap-2 mt-4"
        pageClassName="px-4 py-2 border rounded hover:bg-gray-200"
        activeClassName="bg-[#A66B55] hover:text-white"
        previousClassName={`px-4 py-2 border rounded hover:bg-[#A66B55] hover:text-white ${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        nextClassName={`px-4 py-2 border rounded hover:bg-[#A66B55] hover:text-white ${
          currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        previousLabel="Previous"
        nextLabel="Next"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default ManageUser;
