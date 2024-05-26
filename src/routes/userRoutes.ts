import { Router } from "express";
import { uploadUser, getUser } from "../controllers/userController";
import { uploadExtractor } from "../middlewares/multerConfig";

const router = Router();

router.post("/upload", uploadExtractor.single("file"), uploadUser);
router.get("/user", getUser);

export default router;
