// Backend Logic 

import express from "express";
import cors from "cors";
import { authenticateUser } from "./auth.js";
import { client, getUserScore, updateScore, insertQuestion } from "./db.js";
// import { fetchQuestion } from "./openapi.js";
import { fetchQuestion } from "./openapi.js";

const app = express();

app.use(cors());
const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// UserAuth takes in a username and password and returns the user object
app.get("/login", (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;
        authenticateUser(username, password).then((user) => {
            res.status(200).json(user);
        });
    }
    catch (e) {
        res.status(500).json({ error: e });
        console.error(e);
    }
});


// takes in a topic and pings the function in openapi.js to return a question
// Should return a question JSON object
app.get("/questions", (req, res) => {
    try {
        const topic = req.query.topic;
        const question = fetchQuestion(topic);
        question.then((question) => {
            res.status(200).json(question);
            insertQuestion(question)
        });
    }
    catch (e) {
        console.error(e);
    }
});


app.get("/getscore", async (req, res) => {
    try {
      const username = req.query.username;
  
      // Assuming getUserScore is an async function
      const userScore = await getUserScore(username);
  
      // Check if a score was returned
      if (userScore !== undefined) {
        res.json({ username: username, score: userScore });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/updatescore", async (req, res) => {
    try {
      const username = req.query.username;
      const new_score = req.query.newTotalScore;

      updateScore(username, new_score).then(() => res.status(200).send("YES!"))
        .catch(e => console.log(e));
    } catch (e){
        console.log(e);
    }
  });
  


// Define a port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



/////////////////////////// Question ///////////////////////////

// Takes in updated user profile from frontend and updates the user profile in the database


