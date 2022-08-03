const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./router/route");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());

mongoose
   .connect(process.env.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then((res) => {
      console.log("connected to database");
      app.listen(4000);
   })
   .catch((err) => {
      console.log(err);
   });

app.use(express.json());
app.use("/post", postRouter);
