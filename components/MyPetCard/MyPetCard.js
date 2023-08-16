import React from 'react';
import { ImagePreview, MainView, TitleText, LeftView } from './Style';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyPetCard({ name, breed, imagePreview, onPress }) {
    return (
        <MainView onPress={onPress}>
            <LeftView>
                <ImagePreview source={{ uri: imagePreview }} />
                <View>
                    <TitleText>{name}</TitleText>
                    <Text>{breed}</Text>
                </View>
            </LeftView>
            <Ionicons name="chevron-forward" size={25} color="purple" />
        </MainView>
    );
}