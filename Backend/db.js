// import mongodb module
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://Limbani:Hackumass2023@hackumass2023.flynsqu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient("mongodb+srv://RishikJanaswamy:Hackumass2023@hackumass2023.flynsqu.mongodb.net/?retryWrites=true&w=majority", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("HackUmass2023").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function createQuestionsCollection() {
  try {
    // Connect the client to the server
    await client.connect();

    // Specify the database
    const db = client.db("HackUmass2023");

    // Specify the collection
    const collection = db.collection("questions");

    // Create an array of question documents
    const questions = [
      { question: "Question 1?", answer: "Answer 1" },
      { question: "Question 2?", answer: "Answer 2" },
      // Add more questions as needed
    ];

    // Insert the array of questions into the collection
    await collection.insertMany(questions);

    console.log("Questions inserted successfully");
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// function to create a question which has a question id, topic, and the scenario itself and a dictionary of multiple questions pertaining to the scenario
async function createQuestion() {
  try {
    // Connect the client to the server
    await client.connect();

    // Specify the database
    const db = client.db("HackUmass2023");

    // Specify the collection
    const collection = db.collection("questions");

    // Create a question document
    const questionDocument = {
        topic: "topic1",
        scenario: "scenario1",
        questions: {
            Question1: {
                question: "question1",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            Question2: {
                question: "question2",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            Question3: {
                question: "question3",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            }
    };
      
    const questionDocument2 = {
        topic: "topic2",
        scenario: "scenario1",
        questions: {
            Question1: {
                question: "question1",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            Question2: {
                question: "question2",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            Question3: {
                question: "question3",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            }
        };
  
      // Create a question document
      const questionDocument3 = {
        topic: "topic1",
        scenario: "scenario2",
        questions: {
            Question1: {
                question: "question1",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            Question2: {
                question: "question2",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            Question3: {
                question: "question3",
                CorrectAnswer: "CorrecrAnswer",
                answer2: "answer2",
                Answer3: "answer3",
                answer4: "answer4",
            },
            }
        };
    


      // Insert all three question documents into the collection
      const result = await collection.insertMany([questionDocument, questionDocument2, questionDocument3]);

      // Print out the result
        console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedIds}`);
      
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// create a table for Users which has a username, password, and a list of questions that the user has completed 
// along with the user's score for each question and the total score for all the questions
async function createUsersCollection() {
  try {
    // Connect the client to the server
    await client.connect();

    // Specify the database
    const db = client.db("HackUmass2023");

    // Specify the collection
    const users = db.collection("users");

    // Create a unique index on username
    await users.createIndex({ username: 1 }, { unique: true });

    // Create an array of user documents
    const userDocs = [
      { username: "user1", password: "password1", totalScore: 0 },
      { username: "user2", password: "password2", totalScore: 0 },
      // Add more users as needed
    ];

    // Insert the array of users into the collection
    await users.insertMany(userDocs);

    console.log("Users collection created successfully");
  } catch (error) {
    console.error("Error creating users collection: ", error);
  }
}

async function removeQuestion(questionToRemove) {
  try {
    // Connect the client to the server
    await client.connect();

    // Specify the database
    const db = client.db("HackUmass2023");

    // Specify the collection
    const collection = db.collection("questions");

    // Remove the question that matches the condition
    const result = await collection.deleteOne({ question: questionToRemove });

    console.log(`${result.deletedCount} document(s) was/were deleted.`);
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// User Authentication with mongoDB alredy set up
async function authenticateUser(username, password) {
    try {
        // Connect the client to the server
        await client.connect();

        // Specify the database
        const db = client.db("HackUmass2023");

        // Specify the collection
        const collection = db.collection("Users");

        // Find the user that matches the username
        const user = await collection.findOne({ username: username });

        // Check if a user was found and if the password matches
        if (user && user.password === password) {
            // Return the user object
            return user;
        } else {
            // Return an error message
            return { error: "Invalid username or password" };
        }
    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function removeUserByUsername(username) {
    // Connect the client to the server
    await client.connect();

    console.log("Connected correctly to server. User will be removed.", username);

    // Specify the database
    const db = client.db("HackUmass2023");
    const users = db.collection('users');

    const result = await users.deleteMany({ username: username });

    console.log(`${result.deletedCount} document(s) were deleted.`);
}

async function getUserScore(username) {
  await client.connect();

  const db = client.db("HackUmass2023");
  const collection = db.collection("users");

  // Find the user document by username
  const userDocument = await collection.findOne({ username: username });

  // Check if the user document exists and has a totalScore field
  if (userDocument && userDocument.hasOwnProperty('totalScore')) {
    console.log(`Score for ${username}: ${userDocument.totalScore}`);
  } else {
    console.log(`User not found or score not available for ${username}`);
  }
}


async function updateScore(username, newScore) {
  try {
    // Connect to the database (if not already connected)
    await client.connect();

    // Get the database and collection
    const db = client.db("HackUmass2023");
    const users = db.collection("users");

    // Find the user by username and update their score
    const updateResult = await users.updateOne(
      { username: username },
      { $set: { totalScore: newScore } }
    );

    // Check if the update was successful
    if (updateResult.matchedCount === 0) {
      console.log(`No user found with username ${username}`);
    } else if (updateResult.modifiedCount === 0) {
      console.log(`Score for ${username} was not updated (it might already be the same).`);
    } else {
      console.log(`Score updated for ${username}`);
    }
  } catch (e) {
    console.error(`Error updating score for ${username}:`, e);
  }
// function that takes in a JSON of a question and adds it to the database to the Questions collection
async function insertQuestion(question) {
  await client.connect();
  
  const db = client.db("HackUmass2023");

  const questionsCollection = db.collection('questions');

  const newQuestion = {
    topic: question.topic,
    scenario: question.scenario,
    questions: question.questions
  };

  const result = await questionsCollection.insertOne(newQuestion);

  console.log(`New question inserted with the following id: ${result.insertedId}`);
}



// createUsersCollection().catch(console.dir);
// run().catch(console.dir);

// removeUserByUsername("user2").catch(console.dir);

// createUsersCollection().catch(console.dir);
// getUserScore("user2").catch(console.dir); 

// updateUserScore("user2",1).catch(console.dir); 


let x = {
  topic: 'ReactJs',
  scenario: "You are building a React application and need to implement a feature that allows users to select their favorite movies. Each movie will have a title, genre, and a button to add it to the user's favorites list. The favorites list should be displayed on the screen after the user selects a movie. You decide to use React's useState hook to manage the state of the favorites list. Write a component that implements this feature using React.",
  questions: {
    Question1: {
      question: 'What is the purpose of useState hook in React?',
      CorrectAnswer: 'To manage state in functional components',
      answer2: 'To create class components',
      Answer3: 'To handle asynchronous requests',
      answer4: 'To handle form submissions'
    },
    Question2: {
      question: 'How do you use useState hook to manage state?',
      CorrectAnswer: 'By calling useState and passing initial state as argument',
      answer2: "By importing useState from 'react' package",
      Answer3: 'By using useState in a class component',
      answer4: 'By subscribing to useState event'
    },
    Question3: {
      question: 'What is the return value of useState hook?',
      CorrectAnswer: 'An array containing the current state value and a function to update the state',
      answer2: 'The current state value',
      Answer3: 'A boolean indicating whether the state has changed or not',
      answer4: 'An object containing the state value and the update function'
    },
    Question4: {
      question: 'How do you update the state using useState hook?',
      CorrectAnswer: 'By calling the update function returned by useState',
      answer2: 'By directly modifying the state value',
      Answer3: 'By calling the setState function',
      answer4: 'By using the useState event'
    }
  }
};

// insertQuestion(x.topic, x.scenario, x.questions).catch(console.dir);

export { client, createQuestion, insertQuestion, removeQuestion, getUserScore, updateScore };

// createQuestionsCollection().catch(console.dir);
// run().catch(console.dir);
// createQuestionsCollection().catch(console.dir);
