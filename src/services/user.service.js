import DbHelper from "../helpers/DbHelper.js";

const GetAll = async () => {
  try {
    const db = await DbHelper.readDb();
    return db.User;
  } catch (error) {
    throw new Error("Lỗi khi đọc database");
  }
};

const GetById = async (id) => {
  if (isNaN(id)) {
    throw new Error("ID không hợp lệ");
  }
  try {
    const db = await DbHelper.readDb();
    const user = db.User.find((user) => user.id === id);
    if (!user) {
      throw new Error("User không tồn tại");
    }
    return user;
  } catch (error) {
    throw new Error("Lỗi khi truy xuất user: " + error.message);
  }
};

// THÊM USER
const CreateUser = async (userData) => {
  try {
    const db = await DbHelper.readDb();
    const newUser = { id: db.User.length + 1, ...userData };
    db.User.push(newUser);
    await DbHelper.writeDb(db);
    return newUser;
  } catch (error) {
    throw new Error("Lỗi khi tạo user: " + error.message);
  }
};

//  CẬP NHẬT USER
const UpdateUser = async (id, userData) => {
  try {
    const db = await DbHelper.readDb();
    const index = db.User.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User không tồn tại");
    }
    db.User[index] = { ...db.User[index], ...userData };
    await DbHelper.writeDb(db);
    return db.User[index];
  } catch (error) {
    throw new Error("Lỗi khi cập nhật user: " + error.message);
  }
};

// XÓA USER
const DeleteUser = async (id) => {
  try {
    const db = await DbHelper.readDb();
    const index = db.User.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("User không tồn tại");
    }
    const deletedUser = db.User.splice(index, 1);
    await DbHelper.writeDb(db);
    return deletedUser[0];
  } catch (error) {
    throw new Error("Lỗi khi xóa user: " + error.message);
  }
};

export default {
  GetAll,
  GetById,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
