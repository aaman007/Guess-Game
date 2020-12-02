import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
    const [userNumber, setUserNumber] = useState(null);
    const [guessRounds, setGuessRound] = useState(0);

    const handleStartGame = selectedNumber => {
        setUserNumber(selectedNumber);
    };

    const handleGameOver = numOfRounds => {
        setGuessRound(numOfRounds);
    }

    const handlePlayAgain = () => {
        setUserNumber(null);
    }

    return (
        <View style={styles.screen}>
            <Header title={"Guess Game"}/>
            {
                userNumber ? <GameScreen userChoice={userNumber} handleGameOver={handleGameOver} />
                : <StartGameScreen onGameStart={handleStartGame} />
            }
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
