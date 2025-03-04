import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./server/utils/connectToDb.js";
import { errorMiddleware } from "./server/utils/errorMiddleware.js";
import { appRouter } from "./server/routers/appRouter.js";

dotenv.config();   // Loads the .env file
const port = process.env.PORT || 7000;
const app = express();
console.clear();

// Middleware setup
app.use(express.json());

// app.use(cors());  // Ensure CORS is used for all routes

/* app.use(cors({
  origin: "*",  // Allow all origins (for testing)
  methods: "GET, POST, PUT, UPDATE, DELETE",
  allowedHeaders: "Content-Type, Authorization",
})); */
app.use(cors({ origin: 'http://localhost:5173' }));

// Welcome route at localhost:5000
app.get("/", (req, res) => {
  res.send("Welcome to the Questions API! The server is up and running.");
});

// Other routes
app.use("/", appRouter);

// connectToDb();

// Error handling middleware
app.use(errorMiddleware);

// Connect to database and start server
connectToDb().then(() =>
  app.listen(port, () => console.log(`Server running on port ${port}`))
);
/* app.listen(port, () => console.log(`Server running on port ${port}`)); */
