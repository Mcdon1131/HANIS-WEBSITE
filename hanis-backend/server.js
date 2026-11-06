import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDb(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.json({
    message: "API is running successfully",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
