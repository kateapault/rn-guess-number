import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert 
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 
            'Number must be a number between 1 and 99 inclusive.',
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            )
            return
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title="START GAME" onPress={()=> props.onStartGame(selectedNumber)} />
        </Card>
    }

    return(
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start A New Game</Text>
            <Card style={styles.inputContainer}>
                <Text>Select A Number</Text>
                <Input 
                    style={styles.input} 
                    blurOnSubmit
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" 
                            onPress={resetInputHandler} 
                            color={Colors.accent} 
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" 
                            onPress={confirmInputHandler} 
                            color={Colors.primary} 
                        />
                    </View>
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    button: {
        width: '40%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'pink',
    },
    input: {
        width: 60,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },  
});

export default StartGameScreen;