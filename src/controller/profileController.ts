import type {Request, Response } from "express";
import profileModel from "../model/profileModel.js";


// create user
export const userProfile = async (req: Request, res: Response) => {

    try{

         const userId = (req as any).user?.id;
          console.log("userProfile called, userId =", userId);

        if (!userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const {name, username, email, phoneNumber, nationality, dateOfBirth} = req.body;
        console.log("body =", req.body);

        const user = await profileModel.findOneAndUpdate(
             { user: userId }, {
                user: userId,
            name,
            username,
            email,
            phoneNumber,
            nationality,
            dateOfBirth,
        },
     { new: true, upsert: true,  setDefaultsOnInsert: true } )
     .populate("user", "email isVerified createdAt");

        res.status(201).json({
            message: "User created successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating user ",
            error
        })
    }
}

// get all user

export const getAllUsers = async (req: Request, res: Response) =>{
        try{
            const allUsers = await profileModel.find()
              .populate("user", "email isVerified createdAt"); 

            res.status(200).json({
                message: "All users gotten",
                allUsers
            })
        } catch (error){
            res.status(500).json({
                message:"Error getting users",
                error
            })
        }
}

// getOneUser


export const getUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await profileModel.findById()
      .select("email isVerified createdAt name username phoneNumber nationality dateOfBirth");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile retrieved",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting profile" });
  }
};