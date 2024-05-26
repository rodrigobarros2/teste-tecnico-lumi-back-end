import multer from "multer";

export const uploadExtractor = multer({ storage: multer.memoryStorage() });

export const upload = multer({ dest: "uploads/" });
