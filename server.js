require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const upload = require("express-fileupload");
const PORT = process.env.PORT;
var databaseURI;

databaseURI = process.env.MONGO_URI_MYSERVER_PRODUCTION;

if (process.env.NODE_ENV === "development") {
  databaseURI = process.env.MONGO_URI_LOCALHOST;
}

app.use(express.json({ extended: true }));
app.use(upload({}));

// app.use("/", express.static(__dirname + "/client/build"));

// ENDPOINTS FOR CLIENT
app.use("/images", express.static(__dirname + "/images"));
app.use("/api/uploadimage", require("./routes/upload.routes"));
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/static/css", express.static(__dirname + "/admin/build/static/css"));
app.use("/static/js", express.static(__dirname + "/admin/build/static/js"));
app.use("/cart", express.static(__dirname + "/client/build"));

//ENDPOINT FOR ADMIN
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/product", require("./routes/product.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/variant", require("./routes/productVariant.routes"));

async function start() {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (e) {
    console.log("Server error ", e.message);
    process.exit(1);
  }
}

start();
