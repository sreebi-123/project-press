import { useEffect, useState } from "react";
import { useGetAllCustomersQuery } from "../slices/onlineSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomersList() {
  const { data, isLoading, error } = useGetAllCustomersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const customers = Array.isArray(data) ? data : [];

  const filteredCustomers = customers.filter((customer) =>
  typeof customer.name === "string" &&
  customer.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  useEffect(() => {
//   console.log("Fetched Data:", data);
}, [data]);


  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handleViewProfile = (id) => {
    navigate(`/superadmin/customers/${id}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-semibold mb-6">Customer Management Panel</h2>

      <div className="mb-4 max-w-md">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading customers...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load customers.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">View Profile</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer._id} className="border-t">
                    <td className="py-2 px-4">{customer.name}</td>
                    <td className="py-2 px-4">{customer.email}</td>
                    <td className="py-2 px-4">{customer.phone}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleViewProfile(customer._id)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="View Profile"
                      >
                        <Eye className="w-5 h-5 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>
              <span className="text-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomersList;
