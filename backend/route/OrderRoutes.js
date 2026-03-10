// import express from "express";
// import { CreateOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,updateBillingDetails,markAsPaid,getDesignerOrders,updateDesignStatus,uploadDesignFile} from "../controller/orderController.js";
// import authenticateToken from "../middleware/authenticateToken.js"
// import authorizeRoles from "../middleware/authMiddleware.js";
// import upload from "../file-upload/onlineCustomerFileUpload.js";

// const orderRouter = express.Router();

// // Create a new order (Receptionist/Admin)
// orderRouter.route("/CreateOrder").post(authenticateToken, authorizeRoles('admin'), CreateOrder);

// // Get all orders (All staff)
// orderRouter.route("/getAllOrders").get(authenticateToken, authorizeRoles('admin', 'superadmin'), getAllOrders);

// // Get a single order by ID
// orderRouter.route("/:id").get(authenticateToken, authorizeRoles('designer', 'admin'), getOrderById);

// // Update an order
// orderRouter.route("/updateOrder/:id").put(authenticateToken, authorizeRoles('designer', 'admin', 'printing', 'production'), updateOrder);


// // orderRouter.route('/confirmed').get(authenticateToken, authorizeRoles('admin'), getConfirmedOrders);

// // Delete an order
// orderRouter.route("/deleteOrder/:id").delete(authenticateToken, authorizeRoles('admin'), deleteOrder);
// // ✅ Update Billing Details (Designer/Admin/Receptionist)
// orderRouter.route("/:id/billing").patch(authenticateToken, authorizeRoles("designer", "admin"), updateBillingDetails);

// // ✅ Mark as Paid (Admin only)
// orderRouter.route("/:id/mark-paid").patch(authenticateToken, authorizeRoles("admin"), markAsPaid);

// // Get assigned orders for designer
// orderRouter.route("/designer").get(authenticateToken, authorizeRoles("designer"), getDesignerOrders);

// // Update design status (start / complete)
// orderRouter.route("/designer/:id/status").put(authenticateToken, authorizeRoles("designer"), updateDesignStatus);

// // Upload design files
// // orderRouter.route("/:id/upload-design").post(authenticateToken, authorizeRoles("designer"), uploadDesignFile);
// // orderRouter.route("/:id/upload-design").post(authenticateToken,authorizeRoles("designer"),upload.single("design"), // 👈 multer handles the file
// //     uploadDesignFile
// //   );

// // orderRouter.route("/:id/upload-design").post(
// //   authenticateToken,
// //   authorizeRoles("designer"),
// //   upload.single("design"), // 👈 multer handles the file
// //   uploadDesignFile
// // );
// orderRouter.route("/:id/upload-design").post(
//   authenticateToken,            // verifies JWT and attaches user info to req.user
//   authorizeRoles("designer"),  // checks if req.user.role === 'designer'
//   upload.single("design"),     // multer middleware to handle single file upload (field name: 'design')
//   uploadDesignFile             // your controller function to save file info in DB
// );

// export default orderRouter;
import express from "express";
import {
  CreateOrder,
  getAllOrders,
  getOrderById,
  getEmployeeStats,
  updateOrder,
  deleteOrder,
  updateBillingDetails,
  markAsPaid,
  getDesignerOrders,
  updateDesignStatus,
  uploadDesignFile,
   getDesignCompleteOrders,
  getPrintReadyOrders,
  getProductionReadyOrders,
   markAsPrinted,       
  markAsCompleted,    
  markAsDelivered, 
} from "../controller/orderController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRoles from "../middleware/authMiddleware.js";
import upload from "../file-upload/onlineCustomerFileUpload.js";

const orderRouter = express.Router();

// Create a new order (Admin only)
orderRouter.route("/CreateOrder").post(
  authenticateToken,
  upload.single("profilePic"),
  // authorizeRoles("admin"),
  CreateOrder
);
// GET /api/stats/employee/:userId
orderRouter.get(
  "/employee/:userId",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  getEmployeeStats
);


// Get all orders (Admin/Superadmin)
orderRouter.route("/getAllOrders").get(
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  getAllOrders
);

// Get all orders assigned to designer
orderRouter.route("/designer").get(
  authenticateToken,
  authorizeRoles("designer"),
  getDesignerOrders
);
// ✅ Get Employee Stats
orderRouter.get(
  "/employee/:userId",
  authenticateToken,
  authorizeRoles("admin", "superadmin"),
  getEmployeeStats
)
// Update design status (start / complete)
orderRouter.route("/designer/:id/status").put(
  authenticateToken,
  authorizeRoles("designer"),
  updateDesignStatus
);

// Upload design files
orderRouter.route("/:id/upload-design").post(
  authenticateToken,
  authorizeRoles("designer"),
  upload.single("design"),
  uploadDesignFile
);

// Update billing details (Designer/Admin)
orderRouter.route("/:id/billing").patch(
  authenticateToken,
  authorizeRoles("designer", "admin"),
  updateBillingDetails
);

// Mark as Paid (Admin only)
orderRouter.route("/:id/mark-paid").patch(
  authenticateToken,
  authorizeRoles("admin"),
  markAsPaid
);

// Update an order (Designer/Admin/Printing/Production)
orderRouter.route("/updateOrder/:id").put(
  authenticateToken,
  authorizeRoles("designer", "admin", "printing", "production"),
  updateOrder
);

// Delete an order (Admin only)
orderRouter.route("/deleteOrder/:id").delete(
  authenticateToken,
  authorizeRoles("admin"),
  deleteOrder
);
// ✅ Get all design-complete orders (Printing Dashboard)
orderRouter.get(
  "/design-complete",
  authenticateToken,
  authorizeRoles("printing", "admin"), // adjust roles as needed
  getDesignCompleteOrders
);

// Get a single order by ID (Designer/Admin)
orderRouter.route("/:id").get(
  authenticateToken,
  authorizeRoles("designer", "admin"),
  getOrderById
);

// ✅ Get all print-ready orders (Production Dashboard)
orderRouter.get(
  "/printing-done",
  authenticateToken,
  authorizeRoles("production", "admin"), // for production team
  getPrintReadyOrders
);

// ✅ Get all production-ready (in_production) orders
orderRouter.get(
  "/production-ready",
  authenticateToken,
  authorizeRoles("production", "admin"),
  getProductionReadyOrders
);



// ✅ Production & Printing Related Status Updates

// Mark as Printed (used in Printing Dashboard)
orderRouter.patch(
  "/:id/printed",
  authenticateToken,
  authorizeRoles("printing", "admin"),
  markAsPrinted
);

// Mark as Completed (used in Production Dashboard)
orderRouter.patch(
  "/:id/completed",
  authenticateToken,
  authorizeRoles("production", "admin"),
  markAsCompleted
);



// Mark as Delivered (used in Production Dashboard)
orderRouter.patch(
  "/:id/delivered",
  authenticateToken,
  authorizeRoles("production", "admin"),
  markAsDelivered
);


export default orderRouter;
