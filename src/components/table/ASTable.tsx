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
  columns: Column<T>[]; // Array of column definitions
  data: T[]; // Array of data objects
  isLoading?: boolean; // Optional loading state
  onDelete: (id: string) => void; // Callback for delete action
  onEdit: (id: string) => void; // Callback for edit action
  onView: (id: string) => void; // Callback for view action
  onDuplicate: (id: string) => void; // Callback for duplicate action
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
  return (
    <div className="overflow-x-auto w-full">
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
                      {row[col.key]}
                    </td>
                  ))}
                  <td className="space-x-2">
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
