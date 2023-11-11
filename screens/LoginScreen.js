import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    // Replace with your login handling logic
    const handleLogin = () => {
        // Navigate to the 'Home' screen
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#FFFFFF90" // White with opacity
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#FFFFFF90" // White with opacity
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#800000', // Maroon background
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: '#FFFFFF', // White color
    },
    input: {
        width: '80%',
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF', // White border
        color: '#FFFFFF', // White text
        backgroundColor: '#80000050', // Maroon with some opacity
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: '#FFFFFF', // White button
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#800000', // Maroon text
        fontSize: 18,
    },
});

export default LoginScreen;
