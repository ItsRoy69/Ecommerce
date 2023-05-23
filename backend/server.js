import express from "express";
import dotenv from "dotenv";

const app = express();

app.get("/", (req, res) => {
    res.send("Api is running.... ");
  });

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));