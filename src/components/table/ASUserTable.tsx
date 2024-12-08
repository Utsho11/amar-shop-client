import { BanIcon, ThrashIcon, TickIcon } from "../icons/icon";

interface Column<T> {
  key: keyof T; // Key corresponding to the data field
  label: string; // Display name for the column
}

interface ASTableProps<T> {
  columns: Column<T>[]; // Array of column definitions
  data: T[]; // Array of data objects
  isLoading?: boolean; // Optional loading state
  onSuspend: (id: string) => void; // Callback for delete action
  onDelete: (id: string) => void; // Callback for delete action
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ASUserTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  onSuspend,
  onDelete,
}: ASTableProps<T>) => {
  console.log(data);

  return (
    <div className="overflow-scroll w-full">
      <table className="table w-full">
        {/* ASTable Header */}
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
        {/* ASTable Body */}
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
                      {col.key === "imageUrls" ? (
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
                    {row.status === "ACTIVE" ? (
                      <button
                        onClick={() => onSuspend(id)}
                        title="Suspend User"
                      >
                        <BanIcon size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => onSuspend(id)}
                        title="Activate User"
                      >
                        <TickIcon size={16} />
                      </button>
                    )}
                    <button onClick={() => onDelete(id)} title="Delete User">
                      {row.isDeleted === true ? (
                        <span className="badge badge-error badge-outline">
                          deleted
                        </span>
                      ) : (
                        <ThrashIcon size={16} />
                      )}
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

export default ASUserTable;
