const express = require("express");
const app = express();
const musicRoute = require("./routes/musicRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv=require('dotenv')
dotenv.config();
app.use(express.json());
app.use(cors());


app.use("/", musicRoute);

try {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      app.listen(process.env.PORT||3001, () =>
        console.log('pplication running on port 3001')
      );
    });
} catch (err) {
  console.log(err);
}
