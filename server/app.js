const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("Conected to MongoDB...");
    app.listen(port, console.log(`Server running on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
