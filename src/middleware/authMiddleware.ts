import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
// import { decode } from "node:punycode";
import newUser from "../model/newUserModel.js";


export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(" ALL HEADERS:", req.headers);
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: "auth token is required"
            });
            return
        }

        const token = authHeader.startsWith("Bearer") ? authHeader.split(" ")[1] : null;

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Invalid auth format"
            })
            return;
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            res.status(500).json({
                success: false,
                message: "JWT secret is not configured",
            })
            return
        }

        const decoded = jwt.verify(token!, secret) as {
            id: string;
            email: string;
        }

         //  look up the user in DB
        const user = await newUser.findById(decoded.id);

        if (!user) {
            res.status(401).json({ success: false, message: "User no longer exists" });
            return;
        }

        //  block unverified users here
        if (!user.isVerified) {
            res.status(403).json({
                success: false,
                message: "Please verify your email before continuing"
            });
            return;
        }

        (req as any).user = {
            id: decoded.id,
            email: decoded.email
        }

        next()
        
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "invalid or expired token"
        })
    }
}