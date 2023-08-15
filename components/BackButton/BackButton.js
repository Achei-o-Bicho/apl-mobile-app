import React from 'react';
import { Ionicons } from '@expo/vector-icons'; 

export default function BackButton({ navigation }) {

    function handleBackNavigation() {
        navigation.goBack()
    }

    return (
        <Ionicons.Button
            name="chevron-back"
            size={30}
            color="purple"
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.2}
            onPress={handleBackNavigation}
            style={{ marginLeft: 5, marginTop: 10 }}
        />
    );
}