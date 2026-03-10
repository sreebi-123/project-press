// middleware/validateObjectId.js
import mongoose from "mongoose";
const validateObjectId = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid customer ID" });
    }

    next(); // ID is valid, continue to next middleware/controller
};

export default validateObjectId;
