import { Router } from "express";
import { onlineSignup, onlineSignin, onlineCustomerProfile, uploadFile, onlineLogout,getCustomersByShop, updateOnlineCustomer, getAllOnlineCustomers, deleteCustomer, changeOnlineCustomerPassword,getOnlineCustomerOrders, getOnlineCustomerProfile, requestPasswordReset, resetPassword,uploadProfileImage, getOrdersByCustomer, getReviewsByCustomer,deleteCustomerById } from "../controller/onlineCustomercontroller.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { CreateOrder } from "../controller/orderController.js";
// import mongoose from "mongoose";
import upload from "../file-upload/onlineCustomerFileUpload.js";
import validateObjectId from "../middleware/validateObjectId.js";
import authorizeRoles from "../middleware/authMiddleware.js";

const onlineCustomerRouter = Router();
onlineCustomerRouter.route("/signup").post(onlineSignup);
onlineCustomerRouter.route("/signin").post(onlineSignin);
// Route to get the customer profile (with token authentication)
onlineCustomerRouter.route('/profile/:id').get( authenticateToken, validateObjectId, onlineCustomerProfile);
onlineCustomerRouter.route("/upload/:id").post(authenticateToken,upload.array("upload",5),uploadFile);
onlineCustomerRouter.route("/logout").post(onlineLogout);
onlineCustomerRouter.route("/shop/:shopId/customers").get(authenticateToken, validateObjectId, getCustomersByShop);
onlineCustomerRouter.route("/updateOnlineCustomer").put(authenticateToken,updateOnlineCustomer);
onlineCustomerRouter.route("/getAllOnlineCustomers").get(authenticateToken,getAllOnlineCustomers);
onlineCustomerRouter.route("/deleteCustomer/:id").delete(authenticateToken,validateObjectId,deleteCustomer);// For customer to delete their own profile
// onlineCustomerRouter.route("/changeOnlineCustomerPassword/:id").put(authenticateToken,validateObjectId,changeOnlineCustomerPassword);
onlineCustomerRouter.route("/change-password").put(authenticateToken, changeOnlineCustomerPassword);
onlineCustomerRouter.route("/getOnlineCustomerOrders").get(authenticateToken,validateObjectId,getOnlineCustomerOrders);
onlineCustomerRouter.route("/getOnlineCustomerProfile").get(authenticateToken,getOnlineCustomerProfile);
onlineCustomerRouter.route("/forgot-password").post(requestPasswordReset);
onlineCustomerRouter.route("/reset-password/:token").post(resetPassword);
onlineCustomerRouter.route("/upload-profilepic/:id").put(authenticateToken,validateObjectId, upload.single("profilePic"), uploadProfileImage);
onlineCustomerRouter.route("/orders/:id").get(authenticateToken,getOrdersByCustomer);
onlineCustomerRouter.route("/reviews/:id").get(authenticateToken,getReviewsByCustomer);
onlineCustomerRouter.route("/:id").delete(authenticateToken, validateObjectId, deleteCustomerById);// For admin to delete any customer by ID
onlineCustomerRouter.route("/create-order")
  .post(
    authenticateToken,authorizeRoles,         
    upload.array("designFiles", 5),
    CreateOrder
  );











export default onlineCustomerRouter;