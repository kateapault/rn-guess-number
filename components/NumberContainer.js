import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const NumberContainer = props => {
    return(
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'pink',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontSize: 14,
        color: 'pink',
    },
});

export default NumberContainer;