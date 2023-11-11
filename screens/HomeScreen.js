// screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import diningHalls from '../data/DiningHalls.json';

const imageMap = {
    '../assets/dining-hall-1.jpg': require('../assets/dining-hall-1.jpg'),
    '../assets/dining-hall-2.jpg': require('../assets/dining-hall-2.jpg'),
    '../assets/dining-hall-3.jpg': require('../assets/dining-hall-3.jpg'),
};

const getImage = (imageName) => {
    return imageMap[imageName]; // default image if not found
};

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dining Halls</Text>
            {diningHalls.map((hall) => (
                <TouchableOpacity
                    key={hall.id}
                    onPress={() => navigation.navigate('MenuScreen', {
                        diningHallName: hall.name,
                        menuList: hall.menuList,
                    })}
                    style={styles.diningHallContainer}
                >
                    <Image source={getImage(hall.image)} style={styles.diningHallImage} />
                    <Text style={styles.diningHallName}>{hall.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: 'maroon', // Title in maroon color as per your theme
    },
    diningHallContainer: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    diningHallImage: {
        width: '100%', // Full width of the container
        height: 200, // Fixed height for the images
        resizeMode: 'cover', // Cover the entire area of the image component
    },
    diningHallName: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white', // Text color white to stand out on top of the image
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(128, 0, 0, 0.7)', // Maroon background with opacity
        padding: 5,
    },
});

export default HomeScreen;