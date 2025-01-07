import Loading from "../shared/Loading";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface ASOrderTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ASOrderTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading,
}: ASOrderTableProps<T>) => {
  // console.log("data:", data);

  return (
    <div className="w-full">
      <div className="overflow-y-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key as string} className="text-left">
                    {col.label}
                  </th>
                ))}
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
                  return (
                    <tr key={rowIndex}>
                      {columns.map((col) => (
                        <td key={`${rowIndex}-${col.key as string}`}>
                          {col.key === "productImage" ? (
                            <img
                              src={row[col.key] as string}
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
        )}
      </div>
    </div>
  );
};

export default ASOrderTable;
