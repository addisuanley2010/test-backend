const express = require("express");
const app = express();
const musicRoute = require("./routes/musicRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv=require('dotenv')
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.use("/", musicRoute);

try {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      app.listen(port, () =>
        console.log('pplication running on port 3001')
      );
    });
} catch (err) {
  console.log(err);
}
