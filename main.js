import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import routes from "./src/routes/index.js"; // Đảm bảo rằng đường dẫn này chính xác

const app = express();
dotenv.config();

// Lấy đường dẫn thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Cấu hình static serving
app.use("/public", express.static(path.join(__dirname, "src", "public"))); // Dòng này phục vụ file tĩnh từ thư mục src/public

// Middleware để xử lý JSON
app.use(express.json());

// Route API
app.use("/api", routes);

// Route hiển thị view
app.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "db.json"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading database.");
    }

    // Lấy dữ liệu từ db.json, chú ý đến tên 'User' trong file JSON
    const users = JSON.parse(data).User || [];

    // Đảm bảo mỗi user có đầy đủ trường để hiển thị
    const formattedUsers = users.map((user) => ({
      id: user.id || "",
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user", // Mặc định là 'user' nếu không có role
    }));

    // Render dữ liệu ra view home.ejs
    res.render("home", { users: formattedUsers });
  });
});

// Khởi chạy server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
