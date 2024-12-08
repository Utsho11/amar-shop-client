import { EditIcon, ThrashIcon } from "../icons/icon";

interface Column<T> {
  key: keyof T; // Key corresponding to the data field
  label: string; // Display name for the column
}

interface ASCategoryTableProps<T> {
  columns: Column<T>[]; // Array of column definitions
  data: T[]; // Array of data objects
  isLoading?: boolean; // Optional loading state
  onDelete: (id: string) => void; // Callback for delete action
  onEdit: (id: string) => void; // Callback for edit action
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ASCategoryTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  onDelete,
  onEdit,
}: ASCategoryTableProps<T>) => {
  console.log(data);

  return (
    <div className="overflow-scroll w-full">
      <table className="table w-full">
        {/* ASCategoryTable Header */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string} className="text-left">
                {col.label}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        {/* ASCategoryTable Body */}
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                <span className="loading loading-spinner loading-md"></span>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, rowIndex) => {
              const id = row.id as string; // assuming 'id' is part of your data
              return (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={`${rowIndex}-${col.key as string}`}>
                      {col.key === "logoUrl" ? (
                        <img
                          src={row[col.key] as string}
                          alt={`Image for ${id}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  <td className="space-x-2">
                    <button onClick={() => onEdit(id)} title="Edit">
                      <EditIcon size={16} />
                    </button>
                    <button onClick={() => onDelete(id)} title="Delete">
                      <ThrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ASCategoryTable;
