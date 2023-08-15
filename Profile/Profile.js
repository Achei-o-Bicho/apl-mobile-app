import React from 'react';
import { ExitButton, ExitText, MainView } from './Style';

export default function Profile() {
    return (
        <MainView>
            <ExitButton>
                <ExitText>Sair</ExitText>
            </ExitButton>
        </MainView>
    );
}