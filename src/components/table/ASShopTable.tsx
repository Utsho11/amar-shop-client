import { BanIcon, TickIcon } from "../icons/icon";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface ASShopTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onBlock: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ASShopTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  onBlock,
}: ASShopTableProps<T>) => {
  return (
    <div className="w-full">
      <div className="overflow-y-auto max-h-96">
        <table className="table w-full">
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
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => {
                const id = row.id as string;
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
                    <td className="text-left">
                      {row.isBlacklisted === false ? (
                        <button onClick={() => onBlock(id)} title="Block Shop">
                          <BanIcon size={16} />
                        </button>
                      ) : (
                        <button onClick={() => onBlock(id)} title="Active Shop">
                          <TickIcon size={16} />
                        </button>
                      )}
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
    </div>
  );
};

export default ASShopTable;
