

import { useEffect, useState } from "react";
import { useGetAllUnitsQuery } from "../slices/shopSlice";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";

const ShopList = () => {
  const { data: shopsData, isLoading, error } = useGetAllUnitsQuery();
  const [approvedShops, setApprovedShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    if (shopsData?.data) {
      const approved = shopsData.data.filter(
        (shop) => shop.approval === true && shop.rejected === false
      );
      setApprovedShops(approved);
      setFilteredShops(approved); // initialize filtered view
    }
  }, [shopsData]);

  // Search & Filter Logic
  useEffect(() => {
    let filtered = [...approvedShops];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (shop) =>
          shop.name.toLowerCase().includes(term) ||
          shop.email.toLowerCase().includes(term)
      );
    }

    if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortOption === "pending") {
      // 🧠 Replace this logic with real payment data lookup if available
      filtered = filtered.filter((shop) => shop.subscription.isPaid === false);
    }

    setFilteredShops(filtered);
    setCurrentPage(1); // reset to first page on new search/sort
  }, [searchTerm, sortOption, approvedShops]);

  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShops = filteredShops.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) return <div className="text-center mt-10">Loading approved shops...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error loading shops.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Approved Shops</h2>

      {/* 🔍 Search + Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 cursor-pointer"
        >
          <option value="">-- Filter --</option>
          <option value="name">Sort by Name</option>
          <option value="pending">Sort by Pending Payments</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentShops.map((shop) => (
              <tr key={shop._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">{shop.name}</td>
                <td className="py-2 px-4">{shop.email}</td>
                <td className="py-2 px-4">{shop.phone}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/superadmin/shop-details/${shop._id}`}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <FiEye className="inline text-xl" />
                  </Link>
                </td>
              </tr>
            ))}
            {currentShops.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No approved shops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination Controls */}
      {filteredShops.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopList;


