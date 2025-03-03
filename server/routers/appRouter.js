import { questionRouter } from "./questionRouter.js";
import { Router } from "express";

export const appRouter = Router();

appRouter.use("/questions", questionRouter);
