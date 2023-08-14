import React, { useState } from 'react';
import { ButtonText, ContentView, EnterButton, Input, MainView, Title, TransparentView } from './Style';

export default function HaveAccount({ navigation }) {
    const [email, setEmail] = useState('');

    return (
        <MainView>
            <TransparentView
                onPress={() => navigation.goBack()}
            />
            <ContentView
                behavior="padding"
                enabled
            >
                <Title>
                    Digite seu Email
                </Title>
                <Input
                    autoFocus
                    clearButtonMode='while-editing'
                    enterKeyHint='next'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <EnterButton
                    disabled={email === ''}
                    onPress={() => {
                        navigation.navigate('LoginPassword', { email: email })
                    }}
                >
                    <ButtonText>Entrar</ButtonText>
                </EnterButton>
            </ContentView>
        </MainView>
    );
}