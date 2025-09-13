import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017/weddingmanagment';
mongoose.connect(url);
console.log("Successfully connected to mongod database");