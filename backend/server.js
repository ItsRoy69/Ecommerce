import express from "express";
import dotenv from "dotenv";
import products from "./data/Products.js";

const app = express();

// load products from data folder
app.get("/api/products", (req, res) => {
  res.json(products);
});

// load single product from data folder
app.get("/api/products/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
     res.json(product);
});

app.get("/", (req, res) => {
  res.send("Api is running.... ");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
