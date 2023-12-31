import React from 'react';
import { ImagePreview, MainView, TitleText, LeftView, ContentView } from './Style';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyPetCard({ name, description, imagePreview, onPress }) {
    return (
        <MainView onPress={onPress}>
            <LeftView>
                <ImagePreview source={{ uri: `data:image/jpeg;base64,${imagePreview}` }} />
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