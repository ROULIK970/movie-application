
import bcrypt from 'bcryptjs'
import { User } from "../models/user.model.js";
import connectDB from "../db/index.js";

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    connectDB();

    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ email: "binny@mail.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    // Create a new admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = new User({
      username: "binny",
      email: "binny@mail.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    
    const isMatch = await bcrypt.compare(this.password, hashedPassword)
    console.log(isMatch)

    console.log("Admin user seeded successfully!");
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
  } 
};

// Run the seeding function
seedAdmin();
