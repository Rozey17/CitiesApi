const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const City = require("./cityModel.js");
const fs = require("fs");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to database..."))
  .catch(err => {
    console.log(Error, err.message);
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
