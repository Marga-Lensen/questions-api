import { send } from "../controllers/questionControllers.js";
// import {getSingleQuestion, getManyQuestions} from "../controllers/questionControllers.js"
import { Router } from "express";

/* copy paste the exports from questionControllers.js
export const send = {
  _getSingle: getSingleQuestion,
  _get: getManyQuestions,
  _post: postQuestion,
  _update: updateQuestion,
  _delete: deleteQuestion,
  _deleteMany: deleteMany
};
*/

const { _getSingle, _get, _post, _postMany, _update, _delete, _slice, _deleteMany } = send;

export const questionRouter = Router();

questionRouter.route("/").get(_get).post(_post)
questionRouter.route("/:id").get(_getSingle).patch(_update).delete(_delete)
questionRouter.route("/many").post(_postMany);

questionRouter.route("/").delete(_deleteMany);

questionRouter.route("/slice").delete(_slice);  // New route for first 7