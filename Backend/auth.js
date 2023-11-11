// import mongodb module
import { MongoClient, ServerApiVersion } from 'mongodb';
import { client } from './db.js';

// const uri = "mongodb+srv://RishikJanaswamy:Hackumass2023@hackumass2023.flynsqu.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient("mongodb+srv://RishikJanaswamy:Hackumass2023@hackumass2023.flynsqu.mongodb.net/?retryWrites=true&w=majority", {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// User Authentication with mongoDB alredy set up
async function authenticateUser(username, password) {
    try {
        console.log("authenticating user", username, password);
        // Connect the client to the server
        await client.connect();

        // Specify the database
        const db = client.db("HackUmass2023");

        // Specify the collection
        const collection = db.collection("users");

        // Find the user that matches the username
        const user = await collection.findOne({ username: username });
        console.log("user", user);

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


authenticateUser("user1", "password1").catch(console.dir);
