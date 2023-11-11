// Backend Logic 

import express from "express";
import cors from "cors";
import { authenticateUser } from "./auth.js";
import { client } from "./db.js";
import { fetchQuestion } from "./openapi.js";

const app = express();

app.use(cors());
const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.get("/login", (req, res) => {
    try {
        const username = req.query.username;
        const password = req.query.password;
        authenticateUser(username, password).then((user) => {
            res.status(200).json(user);
        });
    }
    catch (e) {
        console.error(e);
    }
});

app.get("/questions", (req, res) => {
    try {
        const topic = req.query.topic;
        const question = fetchQuestion(topic);
        question.then((question) => {
            res.status(200).json(question);
        });
    }
    catch (e) {
        console.error(e);
    }
});

// Define a port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



