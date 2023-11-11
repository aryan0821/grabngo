// screens/OrderOptionsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderOptionsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PickOrder')} // Add the correct navigation function
            >
                <Text style={styles.buttonText}>Pick Up an Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')} // Add the correct navigation function
            >
                <Text style={styles.buttonText}>Place an Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // Assuming a white background
    },
    button: {
        backgroundColor: '#800000', // Maroon color
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: '80%', // Set width to 80% of screen width
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', // White color for the text
        fontSize: 18,
    },
});

export default OrderOptionsScreen;
