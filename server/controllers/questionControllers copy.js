import { Question } from "../models/questionModel.js";
import { generateManyQuestions } from "../utils/generateData.js";
import { aiQuestions } from "../data/data.js";
// import questionsData from './data/questions_json.json'

/* 
question => question.difficulty < 2
*/

// get single
const getSingleQuestion = async (req, res, next) => {
  try {
    const singleQuestion = await Question.findById(req.params.id);
    /* const singleQuestion = await Question.findOne({firstName : req.params.firstname}); */
    /* if (singleQuestion) {
      return res.status(200).json(singleQuestion);
    } else {
    
      res.status(404).json(alternativeQuestions);
    } */

    singleQuestion ? res.status(200).json(singleQuestion) : res.sendStatus(404);
  } catch (e) {
    next(e);
  }
};

// get many
const getManyQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    /* if(questions.length < 1){
            return res.sendStatus(404)
        } */
    res.status(200).json(questions);
  } catch (e) {
    next(e);
  }
};

// post
const postQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (e) {
    next(e);
  }
};

// post many
const postManyQuestions = async (req, res, next) => {
  try {
    // const questions = await Question.insertMany(generateManyQuestions());
    const questions = await Question.insertMany(aiQuestions);
    res.status(201).json(questions.slice(0, 3));
  } catch (e) {
    next(e);
  }
};

// update
const updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    } else {
      res.status(201).json(question);
    }
  } catch (e) {
    next(e);
  }
};

// delete
const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    } else {
      res.status(200).json({ message: "Question deleted" });
    }
  } catch (e) {
    next(e);
  }
};

// delete slice
const deleteFirstSeven = async (req, res) => {
  try {
    console.log("🟢 Request received to delete first seven questions...");

    const documents = await Question.find().sort({ _id: 1 }).limit(7);
    console.log("📋 Documents found:", documents.length, documents);

    const idsToDelete = documents.map(doc => doc._id);
    console.log("🆔 IDs to delete:", idsToDelete);

    const result = await Question.deleteMany({ _id: { $in: idsToDelete } });
    console.log("🗑️ Deletion result:", result);

    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error("❌ Error in deleteFirstSeven:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};






const deleteMany = async (req, res, next) => {
  try {
    await Question.deleteMany();
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

export const send = {
  _getSingle: getSingleQuestion,
  _get: getManyQuestions,
  _post: postQuestion,
  _postMany: postManyQuestions,
  _update: updateQuestion,
  _delete: deleteQuestion,
  _deleteSlice: deleteFirstSeven,
  _deleteMany: deleteMany
};
