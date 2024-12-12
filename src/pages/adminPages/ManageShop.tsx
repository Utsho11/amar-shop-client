import { toast } from "sonner";
import ASShopTable from "../../components/table/ASShopTable";
import {
  TShop,
  useBlockShopMutation,
  useGetAllShopQuery,
} from "../../redux/services/shopApi";

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const columns: Column<TShop>[] = [
  { key: "logoUrl", label: "Image" },
  { key: "name", label: "Shop Name" },
  { key: "vendorEmail", label: "Vendor Mail" },
  { key: "description", label: "Description" },
];

const ManageShop = () => {
  const { data } = useGetAllShopQuery(null);
  const [blockShop] = useBlockShopMutation();

  const handleBlock = async (id: string) => {
    try {
      const toastId = toast.loading("Blocking...");
      await blockShop(id);
      toast.success("Shop blocked successfully", {
        id: toastId,
        duration: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to block shop");
    }
  };

  // console.log(data?.data);

  return (
    <div className="">
      <div className="">
        <ASShopTable
          columns={columns}
          data={data?.data || []}
          isLoading={false}
          onBlock={handleBlock}
        />
      </div>
    </div>
  );
};

export default ManageShop;
