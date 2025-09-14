import mongoose from "mongoose";
import serviceSchemaModel from "../model/services.js";
import data from './data.js';

const mongodb_url = "mongodb+srv://govindrajputb17_db_user:TeWUmX8h2AXZUXam@cluster0.bv2rni9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    await mongoose.connect(mongodb_url);
};

main().then(() => {
    console.log("dB is connected");
})
.catch((err) => {
    console.log("Error to connect DB");
});

const initDB = async() => {
    await serviceSchemaModel.deleteMany({});
    await serviceSchemaModel.insertMany(data);
    console.log("DB is initialized");
}

initDB();