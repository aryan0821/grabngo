import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const QuestionScreen = ({ navigation, route }) => {
    // Example question and answers
    const { question, user, count } = route.params; // Destructuring to get the topic passed from HomeScreen

    // let userPoints = user.totalScore;

    // Example question and answers (modify these based on the passed topic)
    // Extracting the question object
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(user.totalScore);
    const backgroundColorAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Assuming the question object has a 'questions' property with multiple questions
        // Here you pick the first question to start with. You can later iterate through them.
        const Question = question[0].questions[`Question${count}`];
        // const Question = question[0].questions[QuestionKey];

        setCurrentQuestion(Question.question);
        setOptions([
            Question.CorrectAnswer,
            Question.answer2,
            Question.Answer3,
            Question.answer4
        ]);
        setCorrectAnswer(Question.CorrectAnswer);
    }, [question[0].questions[`Question${count}`]]);

    const animateBackgroundColor = (toValue, finalColor) => {
        // Reset to initial value
        backgroundColorAnim.setValue(0);

        // Start the animation
        Animated.sequence([
            // First, slowly change to a mild tone
            Animated.timing(backgroundColorAnim, {
                toValue: 0.25,
                duration: 1000,
                useNativeDriver: false
            }),
            // Then, flash intensely
            Animated.timing(backgroundColorAnim, {
                toValue: 0.5,
                duration: 500,
                useNativeDriver: false
            }),
            // Reset to mild tone
            Animated.timing(backgroundColorAnim, {
                toValue: 0.25,
                duration: 500,
                useNativeDriver: false
            })
        ]).start();
    };

    const onAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        if (answer === correctAnswer) {
            // userPoints += 1;
            setScore(score + 1)
            console.log("Correct Answer");
            animateBackgroundColor(1, 'green');
        } else {
            console.log("Incorrect Answer");
            animateBackgroundColor(1, 'red');
        }
    };

    // Interpolating the animated value to colors
    const backgroundColor = backgroundColorAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['white', selectedAnswer === correctAnswer ? '#90ee90' : '#ffcccb', selectedAnswer === correctAnswer ? 'green' : 'red'] // Mild green and red
    });


    // Rendering the question and options
    return (
        <Animated.View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.questionText}>{question[0].questions[`Question${count}`].question}</Text>
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
                            count += 1; 
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
                    if (count < 5) {
                        // Navigate to the same screen with updated questionIndex
                        navigation.push('Question', { question: question, user: user, count: count + 1 });
                        let add_score = await fetch(`http://localhost:3000/updatescore?username=${user.username}&newTotalScore=${score}`)
                        if (add_score.ok) {
                            console.log("Score Updated");
                        } else {   
                            console.log("Score not updated");
                        }
                    } else {
                        // Handle the scenario when all questions are answered
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
