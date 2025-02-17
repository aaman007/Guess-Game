import React from 'react';

import { View, Text, StyleSheet } from "react-native";

import colors from "../constants/colors";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 36,
        width: '100%',
        height: 90,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Header;
