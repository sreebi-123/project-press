// import { Order } from '../model/OrderSchema.js';

// // Create a new Order
// const CreateOrder = async (req, res) => {
//     try {
//         const shopId=req.user?.shopId;
//         const onlineCustomerid=req.body;
//         if (!shopId) {
//             return res.status(400).json({ message: "No shopId found in token" });
//           }

//         const order = await Order.create({
//           ...req.body,
//           shopId: shopId,
//           onlineCustomerid:onlineCustomerid||null
//         });
//         res.status(201).json(order);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get All Orders
// const getAllOrders = async (req, res) => {
//     try {
//         const { shopId } = req.query;

//         if (!shopId) {
//           return res.status(400).json({ message: 'shopId is required' });
//         }
//         const orders = await Order.find({shopId: shopId})
//             .populate('onlineCustomer createdBy assignedDesigner printingUnit');
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get Single Order
// const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id)
//             .populate('onlineCustomer createdBy assignedDesigner printingUnit');
//         if (!order) return res.status(404).json({ message: 'Order not found' });
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update Order (Designer / Printing / Production / Admin updates)
// const updateOrder = async (req, res) => {
//     try {
//         const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!order) return res.status(404).json({ message: 'Order not found' });
//         res.status(200).json(order);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete Order (Admin only)
// const deleteOrder = async (req, res) => {
//     try {
//         await Order.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Order deleted' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get Confirmed Orders with Pagination, Search & Filters
// const getConfirmedOrders = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, orderType, search = "", status } = req.query;
//     const shopId = req.user?.shopId;

//     if (!shopId) {
//       return res.status(400).json({ message: "No shopId found in token" });
//     }

//     const query = {
//       shopId,
//       orderType: { $exists: true }, // Considered "confirmed" only if orderType is set
//     };

//     // Add filter by orderType (design / design_print / design_print_production)
//     if (orderType) {
//       query.orderType = orderType;
//     }

//     // Add filter by order status (e.g., inprogress, completed, delivered)
//     if (status) {
//       query.status = status;
//     }

//     // Add search by walk-in or online customer name
//     if (search) {
//       query.$or = [
//         { "walkInCustomer.name": { $regex: search, $options: "i" } },
//         { "onlineCustomer.name": { $regex: search, $options: "i" } }
//       ];
//     }

//     const total = await Order.countDocuments(query);
//     const orders = await Order.find(query)
//       .populate("onlineCustomer createdBy assignedDesigner printingUnit")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));

//     res.status(200).json({
//       total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / limit),
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { CreateOrder, getAllOrders, getOrderById, updateOrder, deleteOrder,getConfirmedOrders };

// import { Order } from '../model/OrderSchema.js';

// // ✅ Create a new Order
// const CreateOrder = async (req, res) => {
//   try {
//     const shopId = req.user?.shopId;
//     const onlineCustomerid = req.body.onlineCustomer;

//     if (!shopId) {
//       return res.status(400).json({ message: "No shopId found in token" });
//     }

//     const order = await Order.create({
//       ...req.body,
//       shopId,
//       onlineCustomer: onlineCustomerid || null,
//     });

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // ✅ Get All Orders with Pagination, Filter, and Search
// const getAllOrders = async (req, res) => {
//   try {
//     const {
//       shopId,
//       page = 1,
//       limit = 10,
//       orderType,
//       status,
//       search = "",
//     } = req.query;

//     if (!shopId) {
//       return res.status(400).json({ message: "shopId is required" });
//     }

//     const query = { shopId };

//     if (orderType) query.orderType = orderType;
//     if (status) query.status = status;

//     if (search) {
//       query.$or = [
//         { "walkInCustomer.name": { $regex: search, $options: "i" } },
//         { "onlineCustomer.name": { $regex: search, $options: "i" } },
//       ];
//     }

//     const total = await Order.countDocuments(query);

//     const orders = await Order.find(query)
//       .populate("shopId")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * parseInt(limit))
//       .limit(parseInt(limit));

//     res.status(200).json({
//       total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / limit),
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get Single Order by ID
// const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate("onlineCustomer createdBy assignedDesigner printingUnit");

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Update Order
// const updateOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     res.status(200).json(order);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // ✅ Delete Order
// const deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Order deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export {
//   CreateOrder,
//   getAllOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
// };

import { Order } from "../model/OrderSchema.js";
import User from "../model/userSchema.js";

// ✅ Create a new Order
// const CreateOrder = async (req, res) => {
//   try {
//     const shopId = req.user?.shopId;
//     const onlineCustomerid = req.body.onlineCustomer;

//     if (!shopId) {
//        console.log("❌ No shopId found in token.");
//       return res.status(400).json({ message: "No shopId found in token" });
//     }

//     const order = await Order.create({
//       ...req.body,
//       shopId,
//       onlineCustomer: onlineCustomerid || null,
//     });
//      console.log(`📝 Order created with ID: ${order._id}`);
//     // Step 2: Find all available designers in that shop
//     const designers = await User.find({
//       role: 'designer',
//       isAvailable: true,
//       shopId,
//     });

//     if (designers.length === 0) {
//        console.log("⚠️ No available designers currently.");
//       return res.status(201).json({
//         message: "Order created, but no available designer found",
//         order,
//       });
//     }

//     // Count active design orders per designer
//     const designerLoads = await Promise.all(
//       designers.map(async (designer) => {
//         const count = await Order.countDocuments({
//           assignedDesigner: designer._id,
//           status: { $in: ['pending_design', 'in_design'] },
//         });
//         return { designer, count };
//       })
//     );

//     // Sort designers by current active work count (ascending)
//     designerLoads.sort((a, b) => a.count - b.count);
//     const selectedDesigner = designerLoads[0].designer;

//     // Step 4: Assign designer and set status
//     order.assignedDesigner = selectedDesigner._id;
//     order.status = 'pending_design';
//     await order.save();
//     console.log(`✅ Designer "${selectedDesigner.name}" (ID: ${selectedDesigner._id}) assigned to order ${order._id}`);

//     res.status(201).json({
//       message: "Order created and assigned to designer",
//       order,
//     });

//     // res.status(201).json(order);
//   } catch (error) {
//      console.error("Error in CreateOrder:", error);
//     res.status(400).json({ message: error.message });
//   }
// };
// const CreateOrder = async (req, res) => {
//   try {
//     const shopId = req.user?.shopId;
//     const onlineCustomerid = req.body.onlineCustomer;

//     if (!shopId) {
//       console.log("❌ No shopId found in token.");
//       return res.status(400).json({ message: "No shopId found in token" });
//     }

//     // Extract design file path if uploaded
//     const designFilePath = req.file ? req.file.path : null;

//     // Prepare order data
//     const orderData = {
//       ...req.body,
//       shopId,
//       onlineCustomer: onlineCustomerid || null,
//     };

//     // If design file uploaded, add to designFiles array
//     if (designFilePath) {
//       orderData.designFiles = [designFilePath];
//     }

//     // Create order
//     const order = await Order.create(orderData);

//     console.log(`📝 Order created with ID: ${order._id}`);

//     // Find available designers in the shop
//     const designers = await User.find({
//       role: 'designer',
//       isAvailable: true,
//       shopId,
//     });

//     if (designers.length === 0) {
//       console.log("⚠️ No available designers currently.");
//       return res.status(201).json({
//         message: "Order created, but no available designer found",
//         order,
//       });
//     }

//     // Count active design orders per designer
//     const designerLoads = await Promise.all(
//       designers.map(async (designer) => {
//         const count = await Order.countDocuments({
//           assignedDesigner: designer._id,
//           status: { $in: ['pending_design', 'in_design'] },
//         });
//         return { designer, count };
//       })
//     );

//     // Sort designers by current active work count (ascending)
//     designerLoads.sort((a, b) => a.count - b.count);
//     const selectedDesigner = designerLoads[0].designer;

//     // Assign designer and set status
//     order.assignedDesigner = selectedDesigner._id;
//     order.status = 'pending_design';
//     await order.save();

//     console.log(`✅ Designer "${selectedDesigner.name}" (ID: ${selectedDesigner._id}) assigned to order ${order._id}`);

//     res.status(201).json({
//       message: "Order created and assigned to designer",
//       order,
//     });

//   } catch (error) {
//     console.error("Error in CreateOrder:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

const CreateOrder = async (req, res) => {
  try {
    console.log("reached here");
    const shopId = req.body?.shopId;
    const userId = req.user?._id;
    const userRole = req.user?.role;
    console.log(shopId);

    if (!shopId) {
      console.log("❌ No shopId found in token.");
      return res.status(400).json({ message: "No shopId found in token" });
    }

    // Extract uploaded design file path if present
    const designFilePath = req.file?.path || null;

    // Construct base order data
    const orderData = {
      ...req.body,
      shopId,
      designFiles: designFilePath ? [designFilePath] : [],
    };

    // If online customer, attach their ID
    if (userRole === "online-customer") {
      orderData.onlineCustomer = userId;
    }

    // Create the order
    const order = await Order.create(orderData);
    console.log(`📝 Order created with ID: ${order._id}`);

    // Find available designers in the shop
    const availableDesigners = await User.find({
      role: "designer",
      isAvailable: true,
      shopId,
    });

    if (availableDesigners.length === 0) {
      console.log("⚠️ No available designers currently.");
      return res.status(201).json({
        message: "Order created, but no available designer found",
        order,
      });
    }

    // Calculate workload (active design orders) for each designer
    const designerLoad = await Promise.all(
      availableDesigners.map(async (designer) => {
        const activeOrders = await Order.countDocuments({
          assignedDesigner: designer._id,
          status: { $in: ["pending_design", "in_design"] },
        });
        return { designer, count: activeOrders };
      })
    );

    // Assign designer with least workload
    designerLoad.sort((a, b) => a.count - b.count);
    const selectedDesigner = designerLoad[0].designer;

    order.assignedDesigner = selectedDesigner._id;
    order.status = "pending_design";
    await order.save();

    console.log(
      `✅ Assigned designer "${selectedDesigner.name}" to order ${order._id}`
    );

    return res.status(201).json({
      message: "Order created and assigned to designer",
      order,
    });
  } catch (error) {
    console.error("❌ Error in CreateOrder:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Orders with Pagination, Filter, and Search
const getAllOrders = async (req, res) => {
  try {
    const {
      shopId,
      page = 1,
      limit = 10,
      orderType,
      status,
      search = "",
    } = req.query;

    if (!shopId) {
      return res.status(400).json({ message: "shopId is required" });
    }

    const query = { shopId };

    if (orderType) query.orderType = orderType;
    if (status) query.status = status;

    if (search) {
      query.$or = [
        { "walkInCustomer.name": { $regex: search, $options: "i" } },
        { "onlineCustomer.name": { $regex: search, $options: "i" } },
      ];
    }

    const total = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate("shopId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));

    res.status(200).json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate();

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Billing Details
const updateBillingDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.billingDetails = {
      ...req.body.billingDetails,
      isPaid: order.billingDetails?.isPaid || false,
      paidAt: order.billingDetails?.paidAt || null,
    };
    // ✅ If order was in "pending_design", move it to "design_ready"
    if (order.status === "pending_design") {
      order.status = "design_ready";
    }

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Mark Order as Paid (Admin)
const markAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.billingDetails.isPaid = true;
    order.billingDetails.paidAt = new Date();

    // ✅ Also update global payment status for clarity
    order.paymentStatus = "payment_paid";

    // ✅ If order was in "pending_design", move it to "design_ready"
    if (order.status === "pending_design") {
      order.status = "design_ready";
    }

    await order.save();
    res.status(200).json({
      message: "Order marked as paid successfully",
      order,
    });
  } catch (error) {
    console.error("Error marking as paid:", error);
    res.status(400).json({ message: error.message });
  }
};

// ====================
// Designer Dashboard Related Controllers
// ====================

// ✅ Get Orders assigned to designer with relevant statuses
const getDesignerOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No user found in request" });
    }

    const userId = req.user.userId || req.user.id || req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing in token" });
    }

    const orders = await Order.find({
      assignedDesigner: userId,
      status: { $in: ["pending_design", "in_design", "design_ready"] },
    }).populate("assignedDesigner", "name email");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// ✅ Update design status: 'in_design' or 'design_ready'
const updateDesignStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      String(order.assignedDesigner) !==
      (req.user.userId || req.user.id || req.user._id)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const allowedStatuses = ["pending_design", "in_design", "design_ready"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    order.status = status;
    await order.save();
    if (status === "design_ready") {
      const activeOrders = await Order.countDocuments({
        assignedDesigner: order.assignedDesigner,
        status: { $in: ["pending_design", "in_design"] },
      });

      if (activeOrders === 0) {
        await User.findByIdAndUpdate(order.assignedDesigner, {
          isAvailable: true,
        });
      }
    }

    res
      .status(200)
      .json({ message: "Design status updated", status: order.status, order });
  } catch (error) {
    console.error("Error updating design status:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Upload design file and add to designFiles array
const uploadDesignFile = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      String(order.assignedDesigner) !==
      (req.user.userId || req.user.id || req.user._id)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    order.designFiles.push(filePath);
    await order.save();

    res.status(200).json({
      message: "Design file uploaded",
      designFiles: order.designFiles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployeeStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [daily, monthly, total] = await Promise.all([
      Order.countDocuments({
        assignedDesigner: userId,
        status: "completed",
        updatedAt: { $gte: today },
      }),
      Order.countDocuments({
        assignedDesigner: userId,
        status: "completed",
        updatedAt: { $gte: startOfMonth },
      }),
      Order.countDocuments({
        assignedDesigner: userId,
        status: "completed",
      }),
    ]);

    res.status(200).json({ daily, monthly, total });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

const getDesignCompleteOrders = async (req, res) => {
  try {
    const shopId = req.user?.shopId;
    console.log("Decoded user in printing dashboard API:", req.user);

    if (!shopId) {
      return res.status(400).json({ message: "No shopId found in token" });
    }

    const orders = await Order.find({
      shopId,
      status: "design_ready",
      "billingDetails.isPaid": true, // ensure billing was done
    })
      .populate("assignedDesigner", "name email")
      .sort({ updatedAt: -1 });

    console.log("Orders fetched:", orders.length);
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching completed orders:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all print-ready orders (for Production Dashboard)
const getPrintReadyOrders = async (req, res) => {
  try {
    const shopId = req.user?.shopId;

    if (!shopId) {
      return res.status(400).json({ message: "No shopId found in token" });
    }

    const orders = await Order.find({
      shopId,
      status: "printing_done",
    })
      .populate("assignedDesigner", "name email")
      .populate("onlineCustomer", "name email")
      .populate("walkInCustomer", "name")
      .sort({ updatedAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching printing-done orders:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ Printing → Move from design_ready → in_production
// const markAsPrinted = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     if (order.status !== "design_ready") {
//       return res.status(400).json({ message: "Order not in design_ready state" });
//     }

//     order.status = "in_production"; // ✅ changed from print_ready
//     await order.save();

//     res.status(200).json({ message: "Order moved to production", order });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// Printing → Move from design_ready → in_production
const markAsPrinted = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "design_ready") {
      return res.status(400).json({ message: "Order not in design_ready state" });
    }

    // Update both status and productionStatus so production dashboard can pick it up
    order.status = "in_production";          // status enum already contains in_production
    order.productionStatus = "in_production"; // also flip the productionStatus flag
    await order.save();

    res.status(200).json({ message: "Order moved to production", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductionReadyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ productionStatus: "in_production" })
  .populate("onlineCustomer", "name")
  .populate("walkInCustomer", "name")
  .populate("createdBy", "name");


    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Production → Work Completed → in_production → completed
const markAsCompleted = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "in_production") {
      return res.status(400).json({ message: "Order not in production state" });
    }

    order.status = "completed";
    await order.save();

    res.status(200).json({ message: "Order marked as completed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Production → Delivered → completed → delivered
const markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "completed") {
      return res.status(400).json({ message: "Order not in completed state" });
    }

    order.status = "delivered";
    await order.save();

    res.status(200).json({ message: "Order marked as delivered", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  CreateOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateBillingDetails,
  markAsPaid,
  getDesignerOrders,
  updateDesignStatus,
  uploadDesignFile,
  getEmployeeStats,
  getDesignCompleteOrders, 
  markAsPrinted, 
  getPrintReadyOrders,
   markAsCompleted, 
   markAsDelivered,
};
