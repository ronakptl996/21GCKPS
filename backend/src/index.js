import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import Razorpay from "razorpay";

dotenv.config({
  path: "./.env",
});

export const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
