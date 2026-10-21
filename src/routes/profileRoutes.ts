import { Router } from "express";
import {  getAllUsers, getUser, userProfile } from "../controller/profileController.js";
import { protect } from "../middleware/authMiddleware.js";



const profileRouter = Router();

profileRouter.post("/create", protect, userProfile)
profileRouter.get("/getall", getAllUsers)
profileRouter.get("/get", protect, getUser)

export default profileRouter;