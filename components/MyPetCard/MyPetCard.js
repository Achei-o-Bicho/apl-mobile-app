import React from 'react';
import { MainView, SubtitleText, TitleText } from './Style';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function MyPetCard({ name, breed }) {
    return (
        <MainView>
            <View>
                <TitleText>{name}</TitleText>
                <Text>{breed}</Text>
            </View>
            <Ionicons name="chevron-forward" size={25} color="purple" />
        </MainView>
    );
}