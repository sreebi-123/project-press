// import React from "react";
// import {
//   useGetProductionReadyOrdersQuery ,
//   useMarkOrderAsCompletedMutation,
//   useMarkOrderAsDeliveredMutation,
// } from "../slices/orderSlice";

// const ProductionDashboard = () => {
//   const { data, isLoading, error, refetch } = useGetProductionReadyOrdersQuery();
//   const [markAsCompleted] = useMarkOrderAsCompletedMutation();
//   const [markAsDelivered] = useMarkOrderAsDeliveredMutation();

//   const handleMarkCompleted = async (orderId) => {
//     try {
//       await markAsCompleted(orderId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Error marking completed:", err);
//     }
//   };

//   const handleDelivered = async (orderId) => {
//     try {
//       await markAsDelivered(orderId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Error marking delivered:", err);
//     }
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">Failed to load orders</p>;

//   const orders = data?.orders || [];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Production Dashboard</h2>
//       {orders.length === 0 ? (
//         <p className="text-gray-500">No print-ready orders available.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border p-4 rounded shadow flex justify-between items-center"
//             >
//               <div>
//                 <p><strong>Customer:</strong> {order.onlineCustomer?.name || order.walkInCustomer?.name || "Unknown"}</p>
//                 <p><strong>Job Type:</strong> {order.jobType}</p>
//                 <p><strong>Status:</strong> {order.status}</p>
//               </div>
//               <div className="space-x-2">
//                 <button className="bg-blue-500 text-white px-3 py-1 rounded">View Details</button>
//                 <button
//                   onClick={() => handleMarkCompleted(order._id)}
//                   className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                 >
//                   Work Completed
//                 </button>
//                 <button
//                   onClick={() => handleDelivered(order._id)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                 >
//                   Delivered
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductionDashboard;



// import React, { useState } from "react";
// import {
//   useGetProductionReadyOrdersQuery,
//   useMarkOrderAsCompletedMutation,
//   useMarkOrderAsDeliveredMutation,
// } from "../slices/orderSlice";
// import DesignPreviewModal from "../pages/DesignPreview";

// const ProductionDashboard = () => {
//   const { data, isLoading, error, refetch } = useGetProductionReadyOrdersQuery();
//   const [markAsCompleted] = useMarkOrderAsCompletedMutation();
//   const [markAsDelivered] = useMarkOrderAsDeliveredMutation();
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleMarkCompleted = async (orderId) => {
//     try {
//       await markAsCompleted(orderId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Error marking completed:", err);
//     }
//   };

//   const handleDelivered = async (orderId) => {
//     try {
//       await markAsDelivered(orderId).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Error marking delivered:", err);
//     }
//   };

//   const handleViewDesign = (designUrl) => {
//     setSelectedDesign(designUrl);
//     setModalOpen(true);
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">Failed to load orders</p>;

//   const orders = data?.orders || [];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Production Dashboard</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500">No production-ready orders available.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => {
//             const customerName =
//               order.walkInCustomer?.name ||
//               order.onlineCustomer?.name ||
//               "Unknown";

//             return (
//               <div
//                 key={order._id}
//                 className="border p-4 rounded shadow flex justify-between items-center"
//               >
//                 <div>
//                   <p><strong>Customer:</strong> {customerName}</p>
//                   <p><strong>Job Type:</strong> {order.jobType}</p>
//                   <p><strong>Status:</strong> {order.productionStatus?.replaceAll("_", " ")}</p>
//                 </div>

//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleViewDesign(order.designFileUrl || order._id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                   >
//                     View Design
//                   </button>

//                   <button
//                     onClick={() => handleMarkCompleted(order._id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                   >
//                     Work Completed
//                   </button>

//                   <button
//                     onClick={() => handleDelivered(order._id)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                   >
//                     Delivered
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {modalOpen && selectedDesign && (
//         <DesignPreviewModal
//           imageUrl={selectedDesign}
//           onClose={() => setModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductionDashboard;

import React, { useState } from "react";
import {
  useGetProductionReadyOrdersQuery,
  useMarkOrderAsCompletedMutation,
  useMarkOrderAsDeliveredMutation,
} from "../slices/orderSlice";
import DesignPreviewModal from "../pages/DesignPreview";

const ProductionDashboard = () => {
  const { data, isLoading, error, refetch } = useGetProductionReadyOrdersQuery();
  const [markAsCompleted] = useMarkOrderAsCompletedMutation();
  const [markAsDelivered] = useMarkOrderAsDeliveredMutation();
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMarkCompleted = async (orderId) => {
    try {
      await markAsCompleted(orderId).unwrap();
      // refetch();
       if (refetch) refetch();
    } catch (err) {
      console.error("Error marking completed:", err);
    }
  };

  const handleDelivered = async (orderId) => {
    try {
      await markAsDelivered(orderId).unwrap();
      // refetch();
       if (refetch) refetch();
    } catch (err) {
      console.error("Error marking delivered:", err);
    }
  };

  const handleViewDesign = (designUrl) => {
    setSelectedDesign(designUrl);
    setModalOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load orders</p>;

  const orders = data?.orders || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Production Dashboard</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No production-ready orders available.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const customerName =
              order.walkInCustomer?.name ||
              order.onlineCustomer?.name ||
              "Unknown";

            return (
              <div
                key={order._id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p><strong>Customer:</strong> {customerName}</p>
                  <p><strong>Job Type:</strong> {order.jobType}</p>
                  <p><strong>Status:</strong> {order.productionStatus?.replaceAll("_", " ")}</p>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => handleViewDesign(order.designFileUrl || order._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View Design
                  </button>

                  <button
                    onClick={() => handleMarkCompleted(order._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Work Completed
                  </button>

                  <button
                    onClick={() => handleDelivered(order._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && selectedDesign && (
        <DesignPreviewModal
          imageUrl={selectedDesign}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductionDashboard;
