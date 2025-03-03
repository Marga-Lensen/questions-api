import { Schema, model } from "mongoose";

const questionSchema = new Schema(
  {
    question: String,
    answer: String,
    difficulty: Number,
    categories: [String],
    toBeDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const Question = model("question", questionSchema);
