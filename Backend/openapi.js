// const { OpenAI } = require("openai");

// import OpenAI from 'openai-api';
import OpenAI from 'openai';

import dotenv from 'dotenv';
dotenv.config();

// const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function fetchQuestion(topic) {
    const completion = await openai.chat.completions.create({
        messages: [{
            role: "system", content: `give me a ${topic} problem. Create 4 multiple choice questions about the leetcode question. Each multiple choice question must have 4 options (correct, B, C, D). Next line after each title, after explanation, multiple choice questions and each option. format it as a JSON String for example
        '{
        "topic": "topic1",
        "scenario": "scenario1",
        "questions": {
            "Question1": {
                "question": "question1",
                "CorrectAnswer": "CorrecrAnswer",
                "answer2": "answer2",
                "Answer3": "answer3",
                "answer4": "answer4",
            },
            "Question2": {
                "question": "question2",
                "CorrectAnswer": "CorrecrAnswer",
                "answer2": "answer2",
                "Answer3": "answer3",
                "answer4": "answer4",
            },
            "Question3": {
                "question": "question3",
                "CorrectAnswer": "CorrecrAnswer",
                "answer2": "answer2",
                "Answer3": "answer3",
                "answer4": "answer4",
            },
            }
    }'` }],
        model: "gpt-3.5-turbo",
    });

    let question = completion.choices[0].message.content;
    question = JSON.parse(question);
    console.log(question);
    return question;

}

fetchQuestion("react");

// fetchQuestion();

export { fetchQuestion };

//   returns 
    //   'Title: Two Sum\n' +
    //   '\n' +
    //   'Explanation: Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.\n' +
    //   '\n' +
    //   'Example:\n' +
    //   '```\n' +
    //   'Input: nums = [2, 7, 11, 15], target = 9\n' +
    //   'Output: [0, 1]\n' +
    //   'Explanation: The sum of 2 and 7 equals 9. Therefore, the indices of these two numbers are 0 and 1.\n' +
    //   '```\n' +
    //   '\n' +
    //   'Multiple Choice Questions:\n' +
    //   '\n' +
    //   '1. What is the time complexity of the brute-force solution for Two Sum?\n' +
    //   '   A. O(n^2)\n' +
    //   '   B. O(n)\n' +
    //   '   C. O(log n)\n' +
    //   '   D. O(1)\n' +
    //   '\n' +
    //   '2. Which data structure can be used to optimize the solution for Two Sum?\n' +
    //   '   A. Set\n' +
    //   '   B. Array\n' +
    //   '   C. Stack\n' +
    //   '   D. Queue\n' +
    //   '\n' +
    //   '3. How can we improve the space complexity of the solution for Two Sum?\n' +
    //   '   A. By using a Hash Table\n' +
    //   '   B. By using a Linked List\n' +
    //   '   C. By using a Binary Tree\n' +
    //   '   D. By using a Dynamic Array\n' +
    //   '\n' +
    //   '4. What is the key idea behind the optimized solution for Two Sum?\n' +
    //   '   A. Utilizing nested loops\n' +
    //   '   B. Sorting the array first\n' +
    //   '   C. Using two pointers\n' +
    //   '   D. Performing binary search on the array'
//   },
//   finish_reason: 'stop'
// }
