import { useState } from "react";
import ReactPaginate from "react-paginate";
import ASUserTable from "../../components/table/ASUserTable";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useSuspendUserMutation,
} from "../../redux/services/userApi";
import { TUsers } from "../../types";

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const ManageUser = () => {
  const { data } = useGetUsersQuery(null);
  const [suspendUser] = useSuspendUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of users per page

  // Columns configuration
  const columns: Column<TUsers>[] = [
    { key: "email", label: "User Email" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" },
  ];

  // Paginated data
  const paginatedData = data?.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
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

  return (
    <div className="sm:mx-12 my-16">
      <div className="mb-4">
        <h2 className="text-2xl text-center font-semibold">Manage Users</h2>
      </div>
      <div>
        <ASUserTable
          onSuspend={toggleSuspend}
          onDelete={handleDelete}
          columns={columns}
          data={paginatedData || []}
          isLoading={false}
        />
      </div>
      {/* Pagination Controls */}
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center gap-2 mt-4"
        pageClassName="px-4 py-2 border rounded hover:bg-gray-200"
        activeClassName="bg-blue-500 text-white"
        previousClassName={`px-4 py-2 border rounded ${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        nextClassName={`px-4 py-2 border rounded ${
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
