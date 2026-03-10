import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetAllUnitsQuery,
  useVerifyUnitMutation,
  useRejectUnitMutation,
} from "../slices/shopSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShopApprovalList() {
  const dispatch = useDispatch();
  const { data: shopsData, isLoading} = useGetAllUnitsQuery();
  const [approveShop] = useVerifyUnitMutation();
  const [rejectShop] = useRejectUnitMutation();

  const [shopList, setShopList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Populate local shopList when API data arrives
 useEffect(() => {
  if (shopsData?.data) {
    const filtered = shopsData.data.filter(
      (shop) => shop.approval !== true && shop.rejected !== true
    );
    setShopList(filtered);
  }
}, [shopsData]);

  const handleApprove = async (id) => {
    try {
      await approveShop(id).unwrap();
      toast.success("✅ Shop approved!");
      setShopList((prev) => prev.filter((shop) => shop._id !== id));
    } catch (error) {
      toast.error("❌ Approval failed.");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectShop(id).unwrap();
      toast.warn("❌ Shop rejected!");
      setShopList((prev) => prev.filter((shop) => shop._id !== id));
    } catch (error) {
      toast.error("❌ Rejection failed.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentShops = shopList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(shopList.length / itemsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-semibold mb-6">Shop Approval Panel</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentShops.map((shop) => (
              <tr key={shop._id} className="border-t">
                <td className="py-2 px-4">{shop.name}</td>
                <td className="py-2 px-4">{shop.email}</td>
                <td className="py-2 px-4">{shop.phone}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{shop.status}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(shop._id)}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(shop._id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded cursor-pointer"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
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
    </div>
  );
}

export default ShopApprovalList;


