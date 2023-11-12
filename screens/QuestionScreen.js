import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';


const QuestionScreen = ({ navigation, route }) => {
    // Example question and answers
    const { question, user, count } = route.params; // Destructuring to get the topic passed from HomeScreen

    // let userPoints = user.totalScore;

    // Example question and answers (modify these based on the passed topic)
    // Extracting the question object
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(user.totalScore);
    const [currCount, setCount] = useState(1);

    useEffect(() => {
        // Assuming the question object has a 'questions' property with multiple questions
        // Here you pick the first question to start with. You can later iterate through them.
        const Question = question[0].questions[`Question${currCount}`];
        // const Question = question[0].questions[QuestionKey];

        setCurrentQuestion(Question.question);
        setOptions([
            Question.CorrectAnswer,
            Question.answer2,
            Question.answer3,
            Question.answer4
        ]);
        setCorrectAnswer(Question.CorrectAnswer);
    }, [question[0].questions[`Question${currCount}`]]);

    const onAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        if (answer === correctAnswer) {
            // userPoints += 1;
            setScore(score + 1)
            console.log("Correct Answer");
            setBackgroundColor('green');
        } else {
            console.log("Incorrect Answer");
            setBackgroundColor('red');
        }
    };

    const createQuestion = async (user, topic) => {
    try {
        // Construct the URL with the topic query parameter
        const url = `http://localhost:3000/questions?topic=${encodeURIComponent(topic)}`;

        // Make a GET request to the server
        const response = await fetch(url);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        let question = []
        question.push(await response.json());

        let count = 1;
        console.log(question, " from home page!"); 
        console.log(typeof question, " from home page!");

        // Navigate with the fetched question
        navigation.navigate('Question', { question, user, count });
    } catch (error) {
        console.error('Error fetching question:', error);
    }
};


    // Rendering the question and options
    return (
        <Animated.View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.questionText}>{question[0].questions[`Question${currCount}`].question}</Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            { backgroundColor: selectedAnswer === option ? '#ddd' : 'white' }
                        ]}
                        onPress={() => {
                            onAnswerSelect(option);
                            }
                        }
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={async () => {
                    if (currCount < 5) {
                        // Navigate to the same screen with updated questionIndex
                        setCount(currCount + 1);
                        setBackgroundColor('white');
                        // navigation.push('Question', { question: question, user: user, count: currCount });
                        let add_score = await fetch('http://localhost:3000/updatescore', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            username: user.username,
                                            newTotalScore: score,
                                        }),
                                        });
                        if (add_score.ok) {
                            console.log("Score Updated");
                        } else {   
                            console.log("Score not updated");
                        }
                    } else {
                        // Handle the scenario when all questions are answered
                        createQuestion(user, question[0].topic);
                        // For example, navigate to a result screen or reset the quiz
                    }
                }}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
    },
    optionsContainer: {
        marginTop: 10,
    },
    optionButton: {
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    optionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    nextButton: {
        padding: 10,
        backgroundColor: '#007bff',
        alignSelf: 'flex-start',
        margin: 10,
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
    },
});


export default QuestionScreen;
