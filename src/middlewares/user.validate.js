export const ValidateUserId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ success: false, message: "ID không hợp lệ" });
  }
  next();
};

//  (POST)
export const ValidateUserBody = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu name hoặc email" });
  }
  next();
};

//  (PUT)
export const ValidateUserUpdateBody = (req, res, next) => {
  const { name, email } = req.body;
  if (!name && !email) {
    return res.status(400).json({
      success: false,
      message: "Cần ít nhất 1 trong name hoặc email để cập nhật",
    });
  }
  next();
};
