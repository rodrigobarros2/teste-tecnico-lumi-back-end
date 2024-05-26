import { Router } from "express";
import { uploadPdf, downloadFile } from "../controllers/fileController";
import { upload } from "../middlewares/multerConfig";

const router = Router();

router.post("/uploadpdf/:id", upload.single("file"), uploadPdf);
router.get("/download/:id", downloadFile);

export default router;
