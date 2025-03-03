import { Question } from "../models/questionModel.js";
import { generateManyQuestions } from "../utils/generateData.js";
import { aiQuestions } from "../data/data.js";

// get single
const getSingleQuestion = async (req, res, next) => {
  try {
    const singleQuestion = await Question.findById(req.params.id);
    singleQuestion ? res.status(200).json(singleQuestion) : res.sendStatus(404);
  } catch (e) {
    next(e);
  }
};

// get many
const getManyQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    console.log("📋 Documents found:", questions.length, questions); // Log the found documents
    if (questions.length < 1) {
      return res.sendStatus(404);
    }
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
    const questions = await Question.insertMany(aiQuestions);
    res.status(201).json(questions.slice(0, 3));
  } catch (e) {
    next(e);
  }
};

// update (mark for deletion)
const updateQuestion = async (req, res, next) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } },  // Mark the question for deletion
      { runValidators: true, new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ msg: "Question not found" });
    } else {
      console.log("✅ Question marked for deletion:", updatedQuestion);  // Log the updated question
      res.status(200).json(updatedQuestion);  // Send the updated question
    }
  } catch (e) {
    next(e);
  }
};

// delete (mark for deletion)
const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: { isDeleted: true } },  // Mark the question for deletion
      { new: true }  // Return the updated question
    );
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    } else {
      console.log("✅ Question marked for deletion:", question);  // Log the marked question
      res.status(200).json({ message: "Question marked for deletion" });
    }
  } catch (e) {
    next(e);
  }
};

// soft deletion in short:
/* const deleteQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findByIdAndUpdate(questionId, { toBeDeleted: true }, { new: true });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question marked for deletion" });
  } catch (e) {
    next(e);
  }
}; */


// delete slice (delete first 7 questions)
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

// delete slice via const slice = questions.slice()
const deleteSlice = async (req, res, next) => {
  try {
    const questions = await Question.find();
    console.log("📋 Documents found:", questions.length, questions); // Log the found documents
    if (questions.length < 1) {
      return res.sendStatus(404);
    }

    // Slice the first 7 documents
    const slice = questions.slice(0, 7);

    // Log the slice for verification
    console.log("📋 Slice to delete:", slice);

    // Extract the _id values for the delete operation
    const idsToDelete = slice.map(question => question._id);

    // Perform the deletion
    const deleteResult = await Question.deleteMany({ _id: { $in: idsToDelete } });
    console.log(`✅ Deleted ${deleteResult.deletedCount} question(s)`);

    res.status(200).json(slice); // Optionally send the deleted questions as a response
  } catch (e) {
    next(e);
  }
};


// delete many (flagged questions)
const deleteMany = async (req, res, next) => {
  try {
    const result = await Question.deleteMany({ isDeleted: true });  // Delete all flagged questions
    console.log(`✅ ${result.deletedCount} questions deleted`);
    res.status(200).json({ message: `${result.deletedCount} questions deleted` });
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
  // _deleteSlice: deleteFirstSeven,
  _slice: deleteSlice,
  _deleteMany: deleteMany
};
