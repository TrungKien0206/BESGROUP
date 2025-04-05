import userService from "../services/user.service.js";

const GetAll = async (req, res) => {
  try {
    const users = await userService.GetAll();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const GetById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID không hợp lệ" });
    }
    const user = await userService.GetById(id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

// ➕ API THÊM USER
const CreateUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.name || !userData.email) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin user" });
    }
    const newUser = await userService.CreateUser(userData);
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ API CẬP NHẬT USER
const UpdateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID không hợp lệ" });
    }
    const updatedUser = await userService.UpdateUser(id, req.body);
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

// 🗑️ API XÓA USER
const DeleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID không hợp lệ" });
    }
    const deletedUser = await userService.DeleteUser(id);
    return res
      .status(200)
      .json({ success: true, message: "User đã bị xóa", data: deletedUser });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export default {
  GetAll,
  GetById,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
