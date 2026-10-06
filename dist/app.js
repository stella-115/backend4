import express from "express";
import newUserRouter from "./routes/newUserRoutes.js";
import cors from "cors";
import profileRouter from "./routes/profileRoutes.js";
const app = express();
app.use(express.json()).use(cors());
app.use("/new-user", newUserRouter);
app.use("/profile", profileRouter);
export default app;
//# sourceMappingURL=app.js.map