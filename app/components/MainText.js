import React from 'react';
import { Text, StyleSheet } from 'react-native';

function MainText({children}) {
    return (
        <Text style={styles.text}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Montserrat",
        fontSize: 15,
    }
})

export default MainText;