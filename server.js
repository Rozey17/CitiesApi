const mongoose = require("mongoose");
const app = require('./app')
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log("Connected to database...");
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
