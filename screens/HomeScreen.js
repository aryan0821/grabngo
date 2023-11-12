// screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import techs from '../data/Tech.json';


const imageMap = {
    '../assets/tech-1.png': require('../assets/tech-1.png'),
    '../assets/tech-2.png': require('../assets/tech-2.png'),
    '../assets/tech-3.png': require('../assets/tech-3.png'),
    '../assets/tech-4.png': require('../assets/tech-4.png'),
    '../assets/tech-5.png': require('../assets/tech-5.png'),
    '../assets/tech-6.png': require('../assets/tech-6.png'),
};

const getImage = (imageName) => {
    return imageMap[imageName]; // default image if not found
};

const createQuestion = async ({ navigation, topic }) => {
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
        const question = await response.json();

        // Navigate with the fetched question
        navigation.navigate('Question', question , 0);
    } catch (error) {
        console.error('Error fetching question:', error);
    }
};

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Pick Your Tech</Text>
            {techs.map((tech) => (
                <TouchableOpacity key={tech.id} style={styles.diningHallContainer} onPress={() => createQuestion({ navigation, topic: tech.name })}>
                    <Image source={getImage(tech.image)} style={styles.diningHallImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.diningHallName}>{tech.name}</Text>
                        <Text style={styles.description}>{tech.description}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: 'white',
    },
    diningHallContainer: {
        flexDirection: 'row', // Arrange children in a row
        alignItems: 'center', // Align items vertically
        backgroundColor: 'black',
        padding: 10, // Add some padding around each item
        marginBottom: 20,
    },
    diningHallImage: {
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1, // Take up remaining space
        marginLeft: 10, // Space between image and text
    },
    diningHallName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        fontSize: 14,
    },
});

export default HomeScreen;