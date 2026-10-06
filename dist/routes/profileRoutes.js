import { Router } from "express";
import { getUsers, userProfile } from "../controller/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
const profileRouter = Router();
profileRouter.post("/create", protect, userProfile);
profileRouter.get("/getall", protect, getUsers);
export default profileRouter;
//# sourceMappingURL=profileRoutes.js.map