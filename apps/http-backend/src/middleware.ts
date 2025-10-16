import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import {JWT_SECRET} from "@repo/backend-common/config";

interface myJwtPayload extends JwtPayload {
    userId: string
}

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] ?? ""
    const decoded = jwt.verify(token, JWT_SECRET) as myJwtPayload

    if(decoded.userId) {
        req.userId = decoded.userId
        next()
    } else {
        res.status(403).json({
            message: 'Unauthorized'
        })
    }
}