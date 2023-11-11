import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView} from 'react-native';

const MenuScreen = ({ navigation, route }) => {
    const { menuList } = route.params;
    const [order, setOrder] = useState({});

    const addToOrder = (item) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [item]: prevOrder[item] ? prevOrder[item] + 1 : 1
        }));
    };

    const adjustQuantity = (item, quantity) => {
        setOrder(prevOrder => ({
            ...prevOrder,
            [item]: quantity
        }));
    };

    return (
        <ScrollView style={styles.container}>
            {menuList.map(item => (
                <View key={item} style={styles.itemBox}>
                    <Text style={styles.itemText}>{item}</Text>
                    {order[item] && (
                        <View style={styles.quantitySelector}>
                            <TouchableOpacity onPress={() => adjustQuantity(item, Math.max(order[item] - 1, 0))}>
                                <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{order[item]}</Text>
                            <TouchableOpacity onPress={() => adjustQuantity(item, order[item] + 1)}>
                                <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {!order[item] && (
                        <TouchableOpacity onPress={() => addToOrder(item)} style={styles.addButton}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            <Button
                title="Confirm Order"
                onPress={() => navigation.navigate('ConfirmOrderScreen', { order })}
                color="#800000" // Maroon color for the button
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    itemBox: {
        backgroundColor: '#F5F5F5', // Light gray background for the box
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 18,
        color: '#800000', // Maroon color for the text
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        color: '#800000', // Maroon color for buttons
        marginHorizontal: 10,
    },
    quantityText: {
        fontSize: 18,
    },
    addButton: {
        backgroundColor: '#800000', // Maroon background for the add button
        padding: 5,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#FFFFFF', // White text for the add button
        fontSize: 16,
    },
});

export default MenuScreen;