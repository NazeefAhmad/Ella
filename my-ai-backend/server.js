// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

// Print the API key
console.log("AI API key is " + process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Connect to MongoDB using environment variable
const mongoURI = process.env.MONGODB_URI; // Make sure to set this in your .env file
console.log("MongoDB URI: ", mongoURI);
// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Handle specific connection errors
    if (error.name === 'MongoParseError') {
      console.error('There may be an issue with your connection string format.');
    } else if (error.name === 'MongoNetworkError') {
      console.error('There was a network error, please check your connection.');
    } else if (error.name === 'MongooseError') {
      console.error('There was an issue with Mongoose: ', error.message);
    }
    // Exit process if connection fails
    process.exit(1);
  }
}

// Call the database connection function
connectToDatabase();

// Define the /generate POST route
app.post("/generate", async (req, res) => {
  const { input } = req.body;

  try {
    const result = await model.generateContent(input);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "An error occurred while generating content." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
