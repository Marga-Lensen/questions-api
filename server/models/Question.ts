import { Schema, model, Document } from "mongoose";

// Define an interface for TypeScript type safety
export interface IQuestion extends Document {
  question: string;
  answer: string;
  difficulty: number;
  categories: string[];
  toBeDeleted?: boolean; // Optional because it has a default value
}

// Create the Mongoose Schema
const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    difficulty: { type: Number, required: true },
    categories: { type: [String], required: true },
    toBeDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: false, // No automatic createdAt/updatedAt fields
    versionKey: false, // No __v field
  }
);

// Export the model
export const Question = model<IQuestion>("question", questionSchema);
