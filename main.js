import express from "express";
import dotenv from "dotenv";
import path from "path";
import router from "./src/routes/index.js";
import db from "./src/database/mongodb.js";

const app = express();
dotenv.config();

const __dirname = path.resolve();
// console.log("dirname__:", __dirname);

// middleware
app.use(express.json());

// view engine
app.set("view engine", "ejs");

// router
app.use("/api/users", router);

// optional error handler
// app.use((err, req, res, next) => {
//     console.error("Error", err)
//     return res.status(500).json({
//         error: err.message
//     })
// })

const startServer = async () => {
  try {
    await db.connectDB();
    console.log("MongoDB server started");
  } catch (error) {
    console.error("Error starting server:", error);
    throw error;
  }
};
startServer();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server run at http://localhost:${PORT}`);
});
