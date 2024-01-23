import { connect } from "mongoose";
// import mongoose from 'mongoose';
import initData from "./data.js";
import Listing from "../models/listing.js";
// const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(() =>{
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=> ({ ...obj, 
        owner:"659d1f8b34260b3942b573f5"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
