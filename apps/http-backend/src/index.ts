import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { createUserSchema, signInSchema, createRoomSchema } from "@repo/common/types";
import { middleware } from "./middleware";

const app = express();

app.post('/signup', (req, res) => {

    const data = createUserSchema.safeParse(req.body);
    if(!data.success) {
        res.json({ message: "Incorrect Inputs" });
        return;
    }

    res.json({
        userId: 123
    })
})

app.post('/signin', (req, res) => {
    const userId = 1;
    
    const data = signInSchema.safeParse(req.body);
    if(!data.success) {
        res.json({ message: "Incorrect Inputs" });
        return;
    }

    const token = jwt.sign({ userId }, JWT_SECRET)
    res.json({ token })
})

app.post('/room', middleware, (req, res) => {

    const data = createRoomSchema.safeParse(req.body);
    if(!data.success) {
        res.json({ message: "Incorrect Inputs" });
        return;
    }

    res.json({
        roomId: 123
    })
})

app.listen(3000)