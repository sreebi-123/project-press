import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllUnitsQuery } from "../slices/shopSlice";

const LandingPage = () => {
  const { data, isLoading, isError } = useGetAllUnitsQuery();
  const shops = data?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const shopsPerPage = 15;

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch(searchTerm);
    setCurrentPage(1);
  };

  const getAverageRating = (reviews = []) => {
    if (!reviews.length) return "0.0";
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  };

  const approvedShops = shops.filter(
    (shop) => shop.approval === true || shop.approval === "true"
  );

  const filteredShops = approvedShops.filter((shop) => {
    const name = shop.shopName ?? shop.name ?? "";
    return name.toLowerCase().includes(submittedSearch.toLowerCase());
  });

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Explore Printing Units
        </h1>

        <form
          onSubmit={handleSearchSubmit}
          className="flex justify-center gap-2 max-w-lg mx-auto"
        >
          <input
            type="text"
            placeholder="Search shops by name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            🔍 Search
          </button>
        </form>
      </div>

      {isLoading ? (
        <p className="text-center mt-10 text-gray-500">Loading shops...</p>
      ) : isError ? (
        <p className="text-center mt-10 text-red-500">Error fetching shops</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 max-w-7xl mx-auto">
            {currentShops.length > 0 ? (
              currentShops.map((shop) => (
                <div
                  key={shop._id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
                >
                  <Link to={`/shop-details/${shop._id}`}>
                    <img
                      src={
                        shop.profilePic
                          ? `http://localhost:3000/uploads/${shop.profilePic}`
                          : "https://placehold.co/300x200?text=No+Profile"
                      }
                      alt="Shop Profile"
                      className="w-full h-44 object-cover rounded-t-xl"
                    />
                  </Link>

                  <div className="px-4 pb-4">
                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                      {shop.shopName ?? shop.name ?? "Unnamed Shop"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {shop.address || "No address provided"}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-yellow-500 font-semibold">
                        ⭐ {getAverageRating(shop.reviews)}
                      </span>
                      <span className="text-gray-500">/ 5</span>
                    </div>

                    <div className="mt-3">
                      <Link
                        to={`/shop-details/${shop._id}`}
                        className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No shops found
              </div>
            )}
          </div>

          {filteredShops.length > shopsPerPage && (
            <div className="flex justify-center mt-8 gap-4 items-center">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              >
                ◀ Prev
              </button>
              <span className="text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LandingPage;

