import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import fileRoutes from "./routes/fileRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", fileRoutes);

export default app;
