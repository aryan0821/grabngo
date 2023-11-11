// components/DiningHall.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DiningHall = ({ name, image, navigation, menuList }) => {
    const handlePress = () => {
        // Navigate to the MenuScreen with parameters
        navigation.navigate('Menu', {
            diningHallName: name,
            menuList: menuList, // This should be the actual menu list for the dining hall
        });
    };
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <View style={styles.textOverlay}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        position: 'relative',
    },
    image: {
        width: '100%', // Take the full width of the container
        height: 200, // Adjust the height as necessary
        borderRadius: 10, // Optional for rounded corners
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0, // Positioned at the bottom of the image
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
        padding: 10,
        alignItems: 'center', // Center the text horizontally
        justifyContent: 'center', // Center the text vertically
    },
    text: {
        color: '#FFFFFF', // White text
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DiningHall;
