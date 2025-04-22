import express from "express";
import userController from "../../controllers/user.controller.js";
import { ValidateUserId } from "../../middlewares/user.validate.js";

const router = express.Router();

// 🟢 Ưu tiên các route cụ thể
router.get("/search/age/:age", userController.GetByAge);
router.get("/search/yearOfBirth/:year", userController.GetByYearOfBirth);

// ✅ Các route còn lại
router.route("/").get(userController.GetAll).post(userController.CreateUser);

router
  .route("/:id")
  .get(ValidateUserId, userController.GetById)
  .put(ValidateUserId, userController.UpdateUser)
  .delete(ValidateUserId, userController.DeleteUser);

export default router;
