// require('dotenv').config(); // Load environment variables from .env file

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const app = express();
// const port = process.env.PORT || 3000; // Change the port to 3000 if desired

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Check if the API key is set and log it (Remove or comment this in production)
// if (process.env.GEMINI_API_KEY) {
//   console.log("API Key is set: ", process.env.GEMINI_API_KEY); // Caution: Don't log sensitive keys in production
// } else {
//   console.warn("API Key is not set.");
// }

// // Initialize Google Generative AI with your API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Initialize the generative model
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Define the /generate POST route
// app.post("/generate", async (req, res) => {
//   const { input } = req.body;

//   try {
//     const result = await model.generateContent(input);
//     res.json({ response: result.response.text() });
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).json({ error: "An error occurred while generating content." });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Check if the API key is set and log it (Remove or comment this in production)
if (process.env.GEMINI_API_KEY) {
  console.log("API Key is set: ", process.env.GEMINI_API_KEY); // Caution: Don't log sensitive keys in production
} else {
  console.warn("API Key is not set.");
}

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
