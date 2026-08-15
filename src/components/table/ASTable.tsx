import {
  DuplicateIcon,
  EditIcon,
  EyeOpenIcon,
  ThrashIcon,
} from "../icons/icon";

interface Column<T> {
  key: keyof T; // Key corresponding to the data field
  label: string; // Display name for the column
}

interface ASTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDuplicate: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ASTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading = false,
  onDelete,
  onEdit,
  onView,
  onDuplicate,
}: ASTableProps<T>) => {
  // console.log(data);

  return (
    <div className="px-8">
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
                  {columns.map((col) => {
                    const value = row[col.key];

                    let imageSrc: string | undefined;

                    if (col.key === "imageUrl") {
                      if (Array.isArray(value)) {
                        imageSrc = value[0];
                      } else if (typeof value === "string") {
                        if (value.startsWith("[")) {
                          try {
                            const parsed = JSON.parse(value);
                            imageSrc = Array.isArray(parsed) ? parsed[0] : value;
                          } catch {
                            imageSrc = value;
                          }
                        } else {
                          imageSrc = value;
                        }
                      }
                    }

                    return (
                      <td key={`${rowIndex}-${col.key as string}`}>
                        {col.key === "imageUrl" ? (
                          imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={String(row.name || id)}
                              className="w-12 h-12 object-cover rounded-xl border border-base-200 shadow-2xs"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">No Image</span>
                          )
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}

                  <td className="space-x-2 w-full flex justify-center items-center">
                    <button onClick={() => onView(id)} title="View">
                      <EyeOpenIcon size={16} />
                    </button>
                    <button onClick={() => onEdit(id)} title="Edit">
                      <EditIcon size={16} />
                    </button>
                    <button onClick={() => onDuplicate(id)} title="Duplicate">
                      <DuplicateIcon size={16} />
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

export default ASTable;
