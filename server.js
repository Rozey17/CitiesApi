const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const DB_LOCAL = process.env.DATABASE_LOCAL;

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

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
