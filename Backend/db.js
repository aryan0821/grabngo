// import mongodb module
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://RishikJanaswamy:Hackumass2023@hackumass2023.flynsqu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
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


createQuestion().catch(console.dir);

// createQuestionsCollection().catch(console.dir);
// run().catch(console.dir);
// createQuestionsCollection().catch(console.dir);
