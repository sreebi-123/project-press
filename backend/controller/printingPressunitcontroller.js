import bcrypt from 'bcryptjs';
import { printingPressunit } from "../model/printingPressunit.js";
import generateToken from '../utils/generateToken.js';
import signinValidation from '../validation/signinValidation.js';
import Payment from "../model/paymentSchema.js";

// Create a new printing unit 
// const createPrintingUnit = async (req, res) => {
//     try {
//         const { name, email, password, phone, whatsapp, address, role } = req.body;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the unit with the hashed password
//         const unit = await printingPressunit.create({
//             name, email, phone, whatsapp, address, role,
//             password: hashedPassword
//         });

//         // Convert Mongoose doc to plain object to delete password
//         const unitObject = unit.toObject();
//         delete unitObject.password;
//         const payload = {
//             shopId: unit._id,
//             role: unit.role
//         }
//         generateToken(res, payload)

//         res.status(201).json({ data: unitObject, message: 'Printing unit created successfully' });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };


const createPrintingUnit = async (req, res) => {
  try {
    const { name, email, password, phone, whatsapp, address, role } = req.body;

    // Check if email already exists (optional but recommended)
    const existing = await printingPressunit.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const unit = await printingPressunit.create({
      name,
      email,
      phone,
      whatsapp,
      address,
      role,
      password,
      approval: false, // Must be approved before login
    });

    const unitObject = unit.toObject();
    delete unitObject.password;

    res.status(201).json({
      data: unitObject,
      message: "Registration successful! Await admin approval.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get all printing units 

const getAllUnits = async (req, res) => {
  try {
    // if (!req.user) {
    //     return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
    // }

    const units = await printingPressunit.find();
    // Get all pending payments
    const pendingPayments = await Payment.find({ status: "pending" });

    // Create a Set of userIds with pending payments
    const pendingUserIds = new Set(pendingPayments.map(p => p.userId.toString()));

    // Attach pending payment flag to each unit
    const unitsWithFlags = units.map(unit => {
      return {
        ...unit.toObject(),
        hasPendingPayment: pendingUserIds.has(unit._id.toString())
      };
    });
    res.status(200).json({ data: unitsWithFlags });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//  Get a Single Printing Unit by ID

const getUnitById = async (req, res) => {
  try {
    // if (!req.user) {
    //     return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
    // }

    const unit = await printingPressunit.findById(req.params.id);
    if (!unit) return res.status(404).json({ message: 'Printing unit not found' });
    res.status(200).json({ data: unit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a Printing Unit
// const updateUnit = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
//         }
//         const updated = await printingPressunit.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) return res.status(404).json({ message: 'Printing unit not found' });
//         res.status(200).json({ data: updated, message: 'Unit updated successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
// Delete a Printing Unit
const deleteUnit = async (req, res) => {
  try {
    // if (!req.user) {
    //     return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
    // }
    const deleted = await printingPressunit.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Printing unit not found' });
    res.status(200).json({ message: 'Unit deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//sign in
// const signin = async (req, res) => {
//     const { email, password } = req.body
//     const { errors, isValid } = signinValidation(req.body)
//     try {
//         if (!isValid) {
//             return res.status(400).json(
//                 errors
//             )
//         }
//         const customer = await printingPressunit.findOne({ email })
//         if (!customer) {
//             errors.email = "email doesnt exist"
//             return res.status(400).json(errors)


//         }
//         const passwordmatch = bcrypt.compareSync(password, customer.password)
//         if (!passwordmatch) {
//             errors.password = "wrong password"
//             return res.status(400).json(errors)
//         }
//         const payload = {
//             shopId: customer._id,
//             role: customer.role
//         }
//         generateToken(res, payload)
//         // const token = jwt.sign(
//         //     { _id: student._id },
//         //     "MEGHA_M",
//         //    { expiresIn: "8h" }
//         // )
//         // const userId= student._id
//         res.status(200).json({ message: "login succesfully", data: customer })

//     }

//     catch (error) {
//         res.status(400).json({
//             message: "error", data: error.message
//         })
//     }
// }

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const { errors, isValid } = signinValidation(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // Find user by email
    const user = await printingPressunit.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: { email: "Email does not exist" } });
    }

    // Check approval
    if (!user.approval) {
      return res.status(403).json({
        errors: { approval: "Account not approved yet." },
        message: "Account not approved yet."
      });
    }


    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: { password: "Incorrect password" } });
    }

    // Generate token
    const payload = {
      shopId: user._id,
      role: user.role,
    };
    generateToken(res, payload);

    // Exclude password from response
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify (approve) printing unit (superadmin only)
const verifyPrintingUnit = async (req, res) => {
  try {
    const unit = await printingPressunit.findById(req.params.id);
    if (!unit) {
      return res.status(404).json({ message: 'Printing unit not found' });
    }

    unit.approval = true;      // Mark as approved
    unit.verified = true;      // Optional flag
    unit.rejected = false;     // Reset rejection if previously rejected

    await unit.save();

    res.status(200).json({
      message: 'Printing unit verified successfully',
      data: unit,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Logout
const adminLogout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.status(200).json({ message: "Logout successful" });
};

// Update a Printing Unit
// const adminupdateUnit = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
//         }

//         const unit = await printingPressunit.findById(req.params.id);

//         if (!unit) {
//             return res.status(404).json({ message: 'Printing unit not found' });
//         }

//         // Only allow update if the logged-in user is the creator
//         if (unit.createdBy.toString() !== req.user.id) {
//             return res.status(403).json({ message: 'Access denied. You can only update units you created.' });
//         }

//         const updated = await printingPressunit.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );

//         res.status(200).json({ data: updated, message: 'Unit updated successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
const adminupdateUnit = async (req, res) => {
  try {
    const updated = await printingPressunit.findByIdAndUpdate(
      req.user.shopId,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};



// Reject (or deactivate) a printing unit (superadmin only)
const rejectPrintingUnit = async (req, res) => {
  try {
    const unit = await printingPressunit.findById(req.params.id);
    if (!unit) {
      return res.status(404).json({ message: 'Printing unit not found' });
    }

    unit.approval = false;     // Ensure not approved
    unit.rejected = true;      // Mark as rejected
    unit.verified = false;     // Optional: reset verification

    await unit.save();

    res.status(200).json({
      message: 'Printing unit rejected successfully',
      data: unit,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete own shop account (admin only)
// const deleteOwnAccount = async (req, res) => {
//   try {
//     const shopId = req.user.shopId; // From token payload

//     const unit = await printingPressunit.findById(shopId);
//     if (!unit) {
//       return res.status(404).json({ message: 'Shop account not found' });
//     }

//     // Optional: prevent superadmin accounts from using this endpoint
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Only shop admins can delete their own accounts.' });
//     }

//     await printingPressunit.findByIdAndDelete(shopId);

//     res.clearCookie('jwt', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//     });

//     res.status(200).json({ message: 'Your shop account has been deleted successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
const deleteOwnAccount = async (req, res) => {
  try {
    // console.log(req.user.userId,"req")
    await printingPressunit.findByIdAndDelete(req.user.shopId, { isDeleted: true, isActive: false });
    res.status(200).json({ message: "Shop deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};


//for uploading prof pic
const uploadProfileImage = async (req, res) => {
  try {
    const user = await printingPressunit.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      user.profilePic = req.file.filename;
      // await user.save();
      await user.save();
      const updatedUser = user.toObject();
      delete updatedUser.password;

      return res.status(200).json({ message: "Profile picture updated", data: updatedUser });

      // return res.status(200).json({ message: "Profile picture updated", profilePic: req.file.filename });
    } else {
      return res.status(400).json({ message: "No file uploaded" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error uploading profile picture", error: err.message });
  }
};

const getShopProfile = async (req, res) => {
  try {
    const user = await printingPressunit.findById(req.user.shopId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadLogo = async (req, res) => {
  const shop = await printingPressunit.findById(req.params.id);
  if (!shop) {
    res.status(404);
    throw new Error('Shop not found');
  }

  shop.logo = req.file.filename;
  // await shop.save();
  await shop.save();
  const updatedShop = shop.toObject();
  delete updatedShop.password;

  res.status(200).json({ message: 'Logo uploaded successfully', data: updatedShop });


  // res.status(200).json({ message: 'Logo uploaded successfully', logo: shop.logo });
};






export { createPrintingUnit, getAllUnits, getUnitById, deleteUnit, signin, verifyPrintingUnit, adminLogout, adminupdateUnit, rejectPrintingUnit, deleteOwnAccount, uploadProfileImage, getShopProfile };