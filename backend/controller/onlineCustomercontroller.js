import { OnlineCustomer } from "../model/onlineCustomer.js";
import signinValidation from "../validation/signinValidation.js";
import signupValidation from "../validation/signupValidation.js";
// import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import { Order } from "../model/OrderSchema.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Review } from "../model/reviewSchema.js";
// import generateResetToken from "../utils/generateResetToken.js";

// Sign up
const onlineSignup = async (req, res) => {
    const { name, email, password, phone, whatsapp, address } = req.body;
    const { errors, isValid } = signupValidation(req.body);

    try {
        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }
        if (!isValid) {
            const firstError = Object.values(errors)[0];
            return res.status(400).json({ message: firstError || "Invalid input" });
        }


        const exist = await OnlineCustomer.findOne({ email });
        // if (exist) {
        //     errors.email = "Email already registered";
        //     return res.status(400).json(errors);
        // }
        if (exist) {
            return res.status(400).json({ message: "Email is already registered" });
        }


        const result = await OnlineCustomer.create({
            name,
            email,
            password, // model handles hashing
            phone,
            whatsapp,
            address
        });
        // Remove password from result
        const customerData = result.toObject();
        delete customerData.password;

        const payload = {
            userId: result._id,
            // role: result.role,
        };
        generateToken(res, payload);
        res.status(200).json({ message: "Signup successful", data: customerData });
    } catch (error) {
        res.status(500).json({ message: "Error occurred during sign up", data: error.message });
    }
};

// Sign in (sets JWT in cookie)
const onlineSignin = async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = signinValidation(req.body);

    try {
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const customer = await OnlineCustomer.findOne({ email });
        if (!customer) {
            errors.email = "Email doesn't exist";
            return res.status(400).json(errors);
        }

        const passwordMatch = await customer.comparePassword(password);
        if (!passwordMatch) {
            errors.password = "Wrong password";
            return res.status(400).json(errors);
        }
        const payload = {
            userId: customer._id,
            // role: result.role,
        };
        generateToken(res, payload)
        res.status(200).json({ message: "Login successful", data: customer });
    } catch (error) {
        res.status(500).json({ message: "Error occurred during login", data: error.message });
    }
};

// Get  customer profile
const onlineCustomerProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await OnlineCustomer.findById(id).select("-password");
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json({ data: customer });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while fetching profile", data: error.message });
    }
};


//for viewing profile by customer itself
// const getOnlineCustomerProfile = async (req, res) => {
//     try {
//         const customer = await OnlineCustomer.findById(req.user.userId).select("-password");

//         if (!customer) {
//             return res.status(404).json({ message: "Customer not found" });
//         }

//         res.status(200).json({ data: customer });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching profile", error: error.message });
//     }
// };
const getOnlineCustomerProfile = async (req, res) => {
  try {
    const customer = await OnlineCustomer.findById(req.user.userId).select("-password");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



//for file uploading
const uploadFile = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user.userId !== id) {
            return res.status(403).json({ message: "You can post only on your profile" });
        }
        const customer = await OnlineCustomer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        if (req.files && req.files.length > 0) {
            // Save file paths to the customer
            customer.uploads = req.files.map(file => file.path);
            await customer.save();
        }

        return res.status(200).json({
            message: "Files uploaded successfully",
            files: customer.uploads
        });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
};


// Logout
const onlineLogout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
    res.status(200).json({ message: "Logout successful" });
};

//for getting customer details for each shop
const getCustomersByShop = async (req, res) => {
    const { shopId } = req.params;

    try {
        const customers = await OnlineCustomer.find({ shop: shopId }).select("-password");

        if (!customers.length) {
            return res.status(404).json({ message: "No customers found for this shop" });
        }

        res.status(200).json({ data: customers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
};

//for updating online customer
const updateOnlineCustomer = async (req, res) => {
    try {
        const updated = await OnlineCustomer.findByIdAndUpdate(
            req.user.userId,
            req.body,
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({ message: "Profile updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

//for  getting all customer details
// const getAllOnlineCustomers = async (req, res) => {
//     try {
//         const customers = await OnlineCustomer.find({ isDeleted: false }).select("-password");
//         res.status(200).json({ data: customers });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch customers", error: error.message });
//     }
// };
const getAllOnlineCustomers = async (req, res) => {
  try {
    const customers = await OnlineCustomer.find({
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }]
    }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customers", error: error.message });
  }
};




//for deleting customer
const deleteCustomer = async (req, res) => {
    try {
        // console.log(req.user.userId,"req")
        await OnlineCustomer.findByIdAndDelete(req.user.userId, { isDeleted: true, isActive: false });
        res.status(200).json({ message: "Customer deleted" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};

//delete customer by admin
const deleteCustomerById = async (req, res) => {
  try {
    const customer = await OnlineCustomer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.deleteOne();
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error: error.message });
  }
};

//for changing password
const changeOnlineCustomerPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old and new passwords are required" });
    }
    try {
        const customer = await OnlineCustomer.findById(req.user.userId);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const isMatch = await customer.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        customer.password = newPassword; // model will hash it
        await customer.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Password update failed", error: error.message });
    }
};

//for getting online customers order
const getOnlineCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ onlineCustomer: req.user.userId })
            .sort({ createdAt: -1 }); // newest first

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this customer" });
        }

        res.status(200).json({ data: orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders", error: error.message });
    }
};

//for req pass reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await OnlineCustomer.findOne({ email });
        if (!user) return res.status(404).json({ message: "No user with this email" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`; // frontend link

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset</p><p><a href="${resetUrl}">Click here</a> to reset your password</p>`
        });

        res.status(200).json({ message: "Reset link sent to email" });
    } catch (err) {
        res.status(500).json({ message: "Error sending reset email", error: err.message });
    }
};

//for reset password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    try {
        const user = await OnlineCustomer.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ message: "Password reset failed", error: err.message });
    }
};

//for uploading prof pic
// const uploadProfileImage = async (req, res) => {
//   try {
//     const customer = await OnlineCustomer.findById(req.params.id);
//     if (!customer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     if (req.file) {
//       customer.profilePic = req.file.filename;
//       await customer.save();
//       return res.status(200).json({ message: "Profile picture updated", profilePic: req.file.filename });
//     } else {
//       return res.status(400).json({ message: "No file uploaded" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Error uploading profile picture", error: err.message });
//   }
// };
const uploadProfileImage = async (req, res) => {
  try {
    const customer = await OnlineCustomer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (req.file) {
      customer.profilePic = req.file.filename;
      const updatedCustomer = await customer.save();

      // Remove sensitive fields before sending
      const customerObj = updatedCustomer.toObject();
      delete customerObj.password;

      return res.status(200).json(customerObj); // ✅ full updated customer for Redux
    } else {
      return res.status(400).json({ message: "No file uploaded" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error uploading profile picture", error: err.message });
  }
};


//get order datails by customers
const getOrdersByCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const orders = await Order.find({ onlineCustomer: customerId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
}

//get reviews of customer
const getReviewsByCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const reviews = await Review.find({ customer: customerId })
      .populate("printingUnit", "name") 
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};





export { onlineSignup, onlineSignin, onlineCustomerProfile, uploadFile, onlineLogout, getCustomersByShop, updateOnlineCustomer, getAllOnlineCustomers, deleteCustomer, changeOnlineCustomerPassword, getOnlineCustomerOrders, getOnlineCustomerProfile, requestPasswordReset, resetPassword ,uploadProfileImage, getOrdersByCustomer,getReviewsByCustomer,deleteCustomerById};
