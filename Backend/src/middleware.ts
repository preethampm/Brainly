import { NextFunction, Request, Response } from "express";
import { supabase } from "./supabase";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const token = authHeader.replace("Bearer ", "");
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }

    req.userId = user.id;
    next();
}