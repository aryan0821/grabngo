import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const ConfirmOrderScreen = ({ navigation, route }) => {
    const { order } = route.params;

    const placeOrder = () => {
        // Logic to handle the order placement
    };

    return (
        <View style={styles.container}>
            {Object.entries(order).map(([item, quantity]) => (
                <Text key={item} style={styles.orderItem}>{item}: {quantity}</Text>
            ))}
            <Button title="Place Order" onPress={placeOrder} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    orderItem: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default ConfirmOrderScreen;