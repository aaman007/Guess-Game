import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomInRange = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max);

    const randomNumber = Math.floor(Math.random() * (max-min)) + min;

    if (randomNumber === exclude) {
        return generateRandomInRange(min, max, exclude);
    }
    return randomNumber;
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomInRange(1, 100, props.userChoice));
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === props.userChoice) {

        }
    }, [currentGuess]);

    const handleNextGuess = direction => {
        const dir = currentGuess > props.userChoice ? 'lower' : 'greater';
        if (dir !== direction) {
            Alert.alert('Cheating Detected', 'Cheating is not allowed in this game', [
                {
                    text: 'Sorry!',
                    style: 'cancel'
                }
            ]);
            return;
        }
        if (direction === 'greater') {
            currentLow.current = currentGuess;
        }
        else {
            currentHigh.current = currentGuess;
        }
        const nextNumber = generateRandomInRange(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
    }

    return (
        <View style={styles.screen}>
            <Text> Opponent's Guess </Text>
            <NumberContainer> {currentGuess} </NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title={"LOWER"} onPress={handleNextGuess.bind(this, 'lower')}/>
                <Button title={"GREATER"} onPress={handleNextGuess.bind(this, 'greater')}/>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
