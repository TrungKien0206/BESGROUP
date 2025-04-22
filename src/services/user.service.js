import mongodb from "../database/mongodb.js";
import { ObjectId } from "mongodb";

const GetAll = async () => {
  try {
    const db = await mongodb.getDB();
    const users = await db.collection("users").find().toArray();
    return users;
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách user: " + error.message);
  }
};

const GetById = async (id) => {
  try {
    const db = await mongodb.getDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) throw new Error("User không tồn tại");
    return user;
  } catch (error) {
    throw new Error("Lỗi khi lấy user theo ID: " + error.message);
  }
};

const GetByAge = async (age) => {
  try {
    const db = await mongodb.getDB();
    const users = await db
      .collection("users")
      .find({ age: parseInt(age) })
      .toArray();
    if (!users || users.length === 0)
      throw new Error("Không tìm thấy user với tuổi này");
    return users;
  } catch (error) {
    throw new Error("Lỗi khi tìm kiếm user theo tuổi: " + error.message);
  }
};

const GetByYearOfBirth = async (yearOfBirth) => {
  try {
    const db = await mongodb.getDB();
    const users = await db
      .collection("users")
      .find({
        joinedAt: {
          $gte: new Date(`${yearOfBirth}-01-01`),
          $lt: new Date(`${parseInt(yearOfBirth) + 1}-01-01`),
        },
      })
      .toArray();
    if (!users || users.length === 0)
      throw new Error("Không tìm thấy user với năm sinh này");
    return users;
  } catch (error) {
    throw new Error("Lỗi khi tìm kiếm user theo năm sinh: " + error.message);
  }
};

const updateUserByID = async (id, userData) => {
  try {
    const db = await mongodb.getDB();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: userData });
    if (result.matchedCount === 0) throw new Error("User không tồn tại");
    return await GetById(id);
  } catch (error) {
    throw new Error("Lỗi khi cập nhật toàn bộ user: " + error.message);
  }
};

const updateUserByField = async (id, fieldName, fieldValue) => {
  try {
    const db = await mongodb.getDB();
    const result = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { [fieldName]: fieldValue } }
      );
    if (result.matchedCount === 0) throw new Error("User không tồn tại");
    return await GetById(id);
  } catch (error) {
    throw new Error("Lỗi khi cập nhật field user: " + error.message);
  }
};

const deleteUserByID = async (id) => {
  try {
    const db = await mongodb.getDB();
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new Error("User không tồn tại");
    return { _id: id, deleted: true };
  } catch (error) {
    throw new Error("Lỗi khi xóa user: " + error.message);
  }
};

const CreateUser = async (userData) => {
  try {
    const db = await mongodb.getDB();
    const result = await db.collection("users").insertOne(userData);
    return await GetById(result.insertedId);
  } catch (error) {
    throw new Error("Lỗi khi tạo user: " + error.message);
  }
};

export default {
  CreateUser,
  GetAll,
  GetById,
  updateUserByID,
  updateUserByField,
  deleteUserByID,
  GetByAge,
  GetByYearOfBirth, 
};
