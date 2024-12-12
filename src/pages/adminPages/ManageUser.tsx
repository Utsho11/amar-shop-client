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
  const [suspenUser] = useSuspendUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const columns: Column<TUsers>[] = [
    { key: "email", label: "User Email" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" },
  ];

  const toggleSuspend = (id: string) => {
    suspenUser(id);
  };
  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  return (
    <div className="">
      <div className=""></div>
      <div className="">
        <ASUserTable
          onSuspend={toggleSuspend}
          onDelete={handleDelete}
          columns={columns}
          data={data?.data || []}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default ManageUser;
