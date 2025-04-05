import express from "express";
import userController from "../../controllers/user.controller.js";
import { ValidateUserId } from "../../middlewares/user.validate.js";

const router = express.Router();

router.route("/").get(userController.GetAll).post(userController.CreateUser);

router
  .route("/:id")
  .get(ValidateUserId, userController.GetById)
  .put(userController.UpdateUser)
  .delete(userController.DeleteUser);

export default router;
