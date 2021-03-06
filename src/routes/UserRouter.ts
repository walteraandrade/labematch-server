import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signUp);

userRouter.post("/login", userController.login);

userRouter.get("/fetchProfile", userController.fetchProfile);

userRouter.get("/fetchMatches", userController.fetchMatches);

userRouter.get("/fetchPageNumbers", userController.fetchPageNumbers);
