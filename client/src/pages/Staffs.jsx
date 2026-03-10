import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useGetUsersQuery } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
// import { ClipLoader } from "react-spinners";

const EmployeeListPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();

  const { data: users = [], isLoading, error } = useGetUsersQuery();

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        roleFilter === "all" ? true : user.role === roleFilter
      )
      .filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
  }, [users, search, roleFilter]);

  const columns = [
    {
      header: "Employee",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 border rounded p-2">
            <img
              src={row.original?.photo || "/default-avatar.png"}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <button
          onClick={() => handleViewDetails(row.original._id)}
          className="text-sm bg-slate-600 hover:bg-indigo-950 cursor-pointer text-white  py-1.5 px-4 rounded-lg transition"
        >
          View Details
        </button>
      ),
    },
  ];
  /*
  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
*/
  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // 👈 Show 5 rows per page
      },
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">{/* <ClipLoader /> */}</div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load employees.
      </div>
    );

  const handleRegisterClick = () => {
    navigate("/admin/register");
  };


  const handleViewDetails = (staffId) => {
    console.log("View details for:", staffId);
    navigate(`/admin/staff/${staffId}`);
  };


  return (
    <div className="flex-1 pb-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Employee Directory</h2>
          <button
            onClick={handleRegisterClick}
            className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm shadow"
          >
            + Register New Employee
          </button>
        </div>

        {/* <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-1/2 shadow-sm"
          />

          <select
            className="border px-4 py-2 rounded shadow-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="designer">Designer</option>
            <option value="printing">Printing</option>
            <option value="production">Production</option>
          </select>
        </div> */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 rounded-lg px-5 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm placeholder:text-gray-400 text-sm"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-48 rounded-lg px-4 py-3 border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
          >
            <option value="all">All Roles</option>
            <option value="designer">Designer</option>
            <option value="printing">Printing</option>
            <option value="production">Production</option>
          </select>
        </div>

        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-200">
          <table className="table-auto w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-semibold truncate"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-sm text-gray-600">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;
