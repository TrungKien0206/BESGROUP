import userService from "../services/user.service.js";

// Lấy tất cả người dùng
const GetAll = async (req, res) => {
  try {
    const users = await userService.GetAll();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Lấy người dùng theo ID
const GetById = async (req, res) => {
  try {
    const user = await userService.GetById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Tạo người dùng mới
const CreateUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.name || !userData.age || !userData.yearOfBirth) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin người dùng" });
    }

    const newUser = await userService.CreateUser(userData);
    return res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Cập nhật người dùng
const UpdateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserByID(
      req.params.id,
      req.body
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng để cập nhật",
      });
    }
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Xóa người dùng
const DeleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUserByID(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng để xóa" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Tìm kiếm người dùng theo tuổi
const GetByAge = async (req, res) => {
  try {
    const age = parseInt(req.params.age);
    if (isNaN(age)) {
      return res
        .status(400)
        .json({ success: false, message: "Tuổi không hợp lệ" });
    }

    const users = await userService.GetByAge(age);
    if (users.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Không tìm thấy người dùng với tuổi này",
        });
    }

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users by age:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Tìm kiếm người dùng theo năm sinh
const GetByYearOfBirth = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    if (isNaN(year)) {
      return res
        .status(400)
        .json({ success: false, message: "Năm sinh không hợp lệ" });
    }

    const users = await userService.GetByYearOfBirth(year);
    if (users.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Không tìm thấy người dùng với năm sinh này",
        });
    }

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users by year of birth:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  GetAll,
  GetById,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetByAge,
  GetByYearOfBirth,
};
