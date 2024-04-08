import express from "express";
import morgan from "morgan";
import axios from "axios"

const app = express();

app.use(morgan("dev"));


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
