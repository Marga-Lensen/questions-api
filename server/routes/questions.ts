// server/routes/questions.ts
import * as express from "express";  // Corrected import
import { Response} from "express";
import { Question } from "../models/Question.ts";

const router = express.Router();

// router.get("/", async (req:Request, res:Response) => {
router.get("/", async (_, res: Response) => {  // '_' is a common convention for unused parameters
  const questions = await Question.find();
  res.json(questions);
});

export default router;
