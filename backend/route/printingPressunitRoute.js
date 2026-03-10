import { Router } from "express";
import { createPrintingUnit, getAllUnits,getUnitById,deleteUnit,signin, verifyPrintingUnit,adminLogout,adminupdateUnit,rejectPrintingUnit, deleteOwnAccount, uploadProfileImage, getShopProfile,uploadLogo} from "../controller/printingPressunitcontroller.js";
import authorizeRoles from "../middleware/authMiddleware.js";
import authenticateToken from "../middleware/authenticateToken.js";
import upload from "../file-upload/onlineCustomerFileUpload.js";


const printingUnitRouter = Router();
printingUnitRouter.route("/createPrintingUnit").post(createPrintingUnit);
printingUnitRouter.route("/getallunits").get(getAllUnits);
printingUnitRouter.route("/getunitbyid/:id").get(getUnitById);
// printingUnitRouter.route("/updateunit/:id").put(updateUnit);
printingUnitRouter.route("/deleteunit/:id").delete(authenticateToken,authorizeRoles("superadmin"),deleteUnit);
printingUnitRouter.route("/signin").post(signin);
printingUnitRouter.route('/:id/verify').put(authenticateToken, authorizeRoles('superadmin'), verifyPrintingUnit);
printingUnitRouter.route('/adminlogout').post(authenticateToken, authorizeRoles('admin'),adminLogout);
printingUnitRouter.route("/adminupdateunit").put(authenticateToken,adminupdateUnit);
printingUnitRouter.route('/:id/reject').put(authenticateToken, authorizeRoles('superadmin'), rejectPrintingUnit); 
printingUnitRouter.route('/delete-my-account/:id').delete(authenticateToken, authorizeRoles('admin'),deleteOwnAccount);
printingUnitRouter.route("/upload-profilepic/:id").put(authenticateToken,authorizeRoles('admin'), upload.single("profilePic"), uploadProfileImage);
printingUnitRouter.route('/get-shop-profile').get(authenticateToken, authorizeRoles('admin'),getShopProfile);
printingUnitRouter.route('/upload-logo/:id').put(authenticateToken,authorizeRoles('admin'), upload.single('logo'), uploadLogo);





export default printingUnitRouter;
