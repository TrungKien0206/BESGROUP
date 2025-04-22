import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/index.js";
import connectDB from "./src/config/db.js"; 
import User from "./src/models/user.model.js"; 

const app = express();
dotenv.config();
connectDB(); 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use("/public", express.static(path.join(__dirname, "src", "public")));
app.use(express.json());

app.use("/api", routes);

app.get("/", async (req, res) => {
  try {
    const users = await User.find();

    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
    }));

    res.render("home", { users: formattedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error reading database.");
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
