import React, { useEffect } from 'react';
import { ImagePreview, MainView, TitleText, LeftView, ContentView } from './Style';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyPetCard({ name, description, imagePreview, onPress }) {
    useEffect(() => {
        console.log(imagePreview)
    }, [])
    return (
        <MainView onPress={onPress}>
            <LeftView>
                <ImagePreview source={{ uri: imagePreview }} />
                <ContentView>
                    <TitleText>{name}</TitleText>
                    <Text
                        numberOfLines={2}
                    >
                        {description}
                    </Text>
                </ContentView>
            </LeftView>
            <Ionicons name="chevron-forward" size={25} color="purple" />
        </MainView>
    );
}