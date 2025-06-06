import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import seedUsers from "../seedings/seed.js";
configDotenv();
const dbUser = process.env.db_user;
const dbPass = process.env.db_pass;

const connDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.tf9ad6l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("connected successfully.");
    // seedUsers();
  } catch (err) {
    console.log("Error! Connection failed", err);
  }
};

export default connDB;
