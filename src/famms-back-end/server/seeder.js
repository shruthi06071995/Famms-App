import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import productsData from "../data/productsData.js";

dotenv.config();

connectDB();

const importData = async () => {

    try {

        await Product.deleteMany();

        await Product.insertMany(productsData);

        console.log("Product Imported Successfully");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit(1);

    }

};

importData();