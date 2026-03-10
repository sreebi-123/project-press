// import React, { useState, useEffect } from "react";
// import { useGetConfirmedOrdersQuery, useDeleteOrderMutation, } from "../slices/orderSlice";

// const statusOptions = [
//   { value: "", label: "All Statuses" },
//   { value: "pending_design", label: "Pending Design" },
//   { value: "in_design", label: "In Design" },
//   { value: "design_ready", label: "Design Ready" },
//   { value: "design_approved", label: "Design Approved" },
//   { value: "in_printing", label: "In Printing" },
//   { value: "printing_done", label: "Printing Done" },
//   { value: "in_production", label: "In Production" },
//   { value: "completed", label: "Completed" },
//   { value: "delivered", label: "Delivered" },
// ];

// const orderTypeOptions = [
//   { value: "", label: "All Order Types" },
//   { value: "design", label: "Design" },
//   { value: "design_print", label: "Design & Print" },
//   { value: "design_print_production", label: "Design, Print & Production" },
// ];

// const OrderList = () => {
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10); // items per page
//   const [search, setSearch] = useState("");
//   const [orderType, setOrderType] = useState("");
//   const [status, setStatus] = useState("");

//   const {
//     data,
//     error,
//     isLoading,
//     refetch,
//   } = useGetConfirmedOrdersQuery({ page, limit, orderType, status, search });

//   const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

//   // Total pages from backend response (default 1)
//   const totalPages = data?.totalPages || 1;

//   // Handle delete
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       await deleteOrder(id);
//       refetch();
//     }
//   };

//   // On filters/search change, reset to page 1
//   useEffect(() => {
//     setPage(1);
//   }, [search, orderType, status]);

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Confirmed Orders</h2>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by walk-in customer name or job type"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-3 py-1 rounded w-64"
//         />

//         <select
//           value={orderType}
//           onChange={(e) => setOrderType(e.target.value)}
//           className="border px-3 py-1 rounded"
//         >
//           {orderTypeOptions.map(({ value, label }) => (
//             <option key={value} value={value}>
//               {label}
//             </option>
//           ))}
//         </select>

//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border px-3 py-1 rounded"
//         >
//           {statusOptions.map(({ value, label }) => (
//             <option key={value} value={value}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         {isLoading ? (
//           <p>Loading orders...</p>
//         ) : error ? (
//           <p className="text-red-600">Error loading orders</p>
//         ) : data?.orders?.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <table className="min-w-full border border-gray-300 rounded">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">Order ID</th>
//                 <th className="p-2 border">Walk-in Customer</th>
//                 <th className="p-2 border">Job Type</th>
//                 <th className="p-2 border">Order Type</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Created At</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50">
//                   <td className="p-2 border">{order._id.slice(-6)}</td>
//                   <td className="p-2 border">{order.walkInCustomer?.name || "N/A"}</td>
//                   <td className="p-2 border">{order.jobType}</td>
//                   <td className="p-2 border">{order.orderType}</td>
//                   <td className="p-2 border">{order.status}</td>
//                   <td className="p-2 border">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-2 border space-x-2">
//                     <button
//                       onClick={() => alert(JSON.stringify(order, null, 2))}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => handleDelete(order._id)}
//                       disabled={isDeleting}
//                       className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-4 mt-4">
//           <button
//             onClick={() => setPage((p) => Math.max(p - 1, 1))}
//             disabled={page === 1}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <span>
//             Page{" "}
//             <input
//               type="number"
//               min={1}
//               max={totalPages}
//               value={page}
//               onChange={(e) => {
//                 let val = Number(e.target.value);
//                 if (val >= 1 && val <= totalPages) setPage(val);
//               }}
//               className="border w-12 text-center rounded"
//             />{" "}
//             of {totalPages}
//           </span>

//           <button
//             onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//             disabled={page === totalPages}
//             className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderList;

import React, { useState } from "react";
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../slices/orderSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // ✅ Added

const AdminOrderList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const shopId = userInfo?._id;
  console.log("Fetching orders with shopId:", shopId);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [orderType, setOrderType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate(); // ✅ Initialize navigate

  const { data, isLoading, error, refetch } = useGetAllOrdersQuery({
    shopId,
    page,
    limit,
    orderType,
    search,
    status,
  });

  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id);
        toast.success("Order deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete order");
      }
    }
  };

  const totalPages = data?.totalPages || 1;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Confirmed Orders</h2>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-full md:w-auto"
        />

        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">All Order Types</option>
          <option value="design">Design</option>
          <option value="design_print">Design + Print</option>
          <option value="design_print_production">Design + Print + Production</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">All Status</option>
          <option value="pending_design">Pending Design</option>
          <option value="in_design">In Design</option>
          <option value="design_ready">Design Ready</option>
          <option value="design_approved">Design Approved</option>
          <option value="in_printing">In Printing</option>
          <option value="printing_done">Printing Done</option>
          <option value="in_production">In Production</option>
          <option value="completed">Completed</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load orders</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Job</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.orders.map((order, idx) => (
                  <tr key={order._id} className="border-t">
                    <td className="p-2">{(page - 1) * limit + idx + 1}</td>
                    <td className="p-2">
                      {order?.walkInCustomer?.name || order?.onlineCustomer?.name}
                    </td>
                    <td className="p-2">{order.jobType}</td>
                    <td className="p-2">{order.orderType}</td>
                    <td className="p-2 capitalize">{order.status.replaceAll("_", " ")}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/admin/billing/${order._id}`)}
                        className="px-2 py-1 text-sm bg-indigo-600 text-white rounded"
                      >
                        Billing
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4 items-center">
            <div>
              Page {data.page} of {totalPages}
            </div>
            <div className="space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded border ${
                    i + 1 === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* View Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow-lg w-11/12 max-w-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <p><strong>Customer:</strong> {selectedOrder.walkInCustomer?.name || selectedOrder.onlineCustomer?.name}</p>
            <p><strong>Phone:</strong> {selectedOrder.walkInCustomer?.phone || "N/A"}</p>
            <p><strong>Job:</strong> {selectedOrder.jobType}</p>
            <p><strong>Type:</strong> {selectedOrder.orderType}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Amount Paid:</strong> ₹{selectedOrder.amountPaid || 0}</p>
            <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount || 0}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
