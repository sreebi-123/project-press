import dotenv from "dotenv";
import User from "./model/userSchema.js";
import connectDB from "./config/database.js";

dotenv.config();
connectDB();

const seedSuperadmin = async () => {
  try {
    const existing = await User.findOne({ role: "superadmin" });
    if (existing) {
      console.log("Superadmin already exists");
      process.exit();
    }

    await User.create({
      name: process.env.SUPERADMIN_NAME,
      email: process.env.SUPERADMIN_EMAIL,
      password: process.env.SUPERADMIN_PASSWORD,
      role: "superadmin",
    });

    console.log("Superadmin created successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding superadmin:", error);
    process.exit(1);
  }
};

seedSuperadmin();

// npm run seed:superadmin
