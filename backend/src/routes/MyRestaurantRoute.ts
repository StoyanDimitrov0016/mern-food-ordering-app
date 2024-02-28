import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; //5 mb of memory

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
});

const router = express.Router();

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

export default router;
