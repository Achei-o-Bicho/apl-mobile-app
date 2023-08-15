import React from 'react';
import { ExitButton, ExitText, MainView } from './Style';

export default function Profile({ navigation }) {
    return (
        <MainView>
            <ExitButton
                onPress={() => {
                    navigation.popToTop();
                }}
            >
                <ExitText>Sair</ExitText>
            </ExitButton>
        </MainView>
    );
}