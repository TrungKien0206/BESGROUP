// database/mongodb.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  throw new Error("MongoDB URI hoặc DB name chưa được khai báo trong .env");
}

const client = new MongoClient(uri);
let db = null;

const connectDB = async () => {
  if (db) return db;
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Kết nối MongoDB thành công");
    return db;
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
    throw error;
  }
};

const getDB = async () => {
  if (!db) {
    await connectDB();
  }
  return db;
};

export default {
  connectDB,
  getDB,
};
