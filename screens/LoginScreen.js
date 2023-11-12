import React, { createContext, useState }  from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    // Replace with your login handling logic
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Navigate to the 'Home' screen
        const response = await fetch(`http://localhost:3000/login?username=${username}&password=${password}`)
        if (response.ok) {
            const user = await response.json();
            console.log(user);
            if (user.error) {
                alert(user.error);
                // Stay on the login screen
                // // navigation.navigate('Login');
                // navigation.navigate('Login', { user });
            } else {
                navigation.navigate('Home', { user });
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TechWizz.AI</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#FFFFFF90" // White with opacity
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#FFFFFF90" // White with opacity
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
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
