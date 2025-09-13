import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config(); // .env file ke variables ko process.env me load karega
const url = process.env.DBURL;
mongoose.connect(url)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ Error:", err));