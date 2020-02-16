const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const City = require("./cityModel.js");
const fs = require("fs");

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log("Connected to database");
  });

const cities = JSON.parse(
  fs.readFileSync(`${__dirname}/countries.json`, "utf-8")
);

const importDev = async () => {
  try {
    await City.collection.insert(cities); // for bulk load
    console.log("Data loaded successfully");
  } catch (err) {
    console.log(err);
  }
};

importDev();
