import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    Alert
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";

import colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
    const [value, setValue] = useState('');
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [confirmed, setConfirmed] = useState(false);

    const handleInputChange = inputText => {
        setValue(inputText.replace(/[^0-9]/g, ''));
        setConfirmed(false);
    };

    const handleResetClick = () => {
        setValue('');
    };

    const handleConfirmClick = () => {
        const chosenNumber = parseInt(value);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99', [
                {
                    text: 'Ok',
                    style: 'destructive',
                    onPress: handleResetClick
                }
            ])
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text> You selected </Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title={"Start Game"} color={colors.resonate} onPress={() => props.onGameStart(selectedNumber)} />
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={ styles.screen}>
                <Text style={styles.title}> Start New Game! </Text>
                <Card style={styles.inputContainer}>
                    <Text> Select a Number </Text>
                    <Input
                        value={value}
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'number-pad'}
                        maxLength={2}
                        onChangeText={handleInputChange}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title={"Reset"} color={colors.secondary} onPress={handleResetClick} />
                        </View>
                        <View style={styles.button}>
                            <Button title={"Confirm"} color={colors.primary} onPress={handleConfirmClick} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',

    },

    title: {
        fontSize: 20,
        marginVertical: 10
    },

    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },

    input: {
        width: 50,
        textAlign: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },

    button: {
        width: 100
    },

    summaryContainer: {

    }
});

export default StartGameScreen;
