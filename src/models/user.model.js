import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/index.js";
import connectDB from "./src/config/db.js"; // 👈 thêm dòng này
import User from "./src/models/user.model.js"; // 👈 dùng model để đọc DB

const app = express();
dotenv.config();
connectDB(); // 👈 gọi kết nối MongoDB

// __dirname setup cho ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Static
app.use("/public", express.static(path.join(__dirname, "src", "public")));
app.use(express.json());

// Routes
app.use("/api", routes);

// Trang chủ
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

// Server listen
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
