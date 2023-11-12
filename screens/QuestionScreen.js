import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const QuestionScreen = ({ navigation, route }) => {
    // Example question and answers
    const { question, user } = route.params; // Destructuring to get the topic passed from HomeScreen

    let userPoints = user.totalScore;

    // Example question and answers (modify these based on the passed topic)
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const backgroundColorAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Here you can set questions and answers based on the passed 'topic'
        // For demonstration, I'll just set a generic question
        setQuestion(`Questions related to ${topic}`);
        setOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
        setCorrectAnswer("Option 1"); // Set the correct answer appropriately
    }, [topic]);

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
            userPoints += 1;
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
            <Text style={styles.questionText}>{question}</Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            { backgroundColor: selectedAnswer === option ? '#ddd' : 'white' }
                        ]}
                        onPress={() => onAnswerSelect(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
        fontFamily: '', // Set your custom font here
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
});


export default QuestionScreen;
