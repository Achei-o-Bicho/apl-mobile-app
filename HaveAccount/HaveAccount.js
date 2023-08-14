import React, { useState } from 'react';
import { ButtonText, ContentView, EnterButton, FeedbackText, Input, MainView, Title, TransparentView } from './Style';
import validator from 'validator';

export default function HaveAccount({ navigation }) {
    const [email, setEmail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState({});

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
                    onChangeText={(text) => {
                        setFeedbackMessage({ show: false })
                        setEmail(text.toLowerCase())
                    }}
                />
                {feedbackMessage.show && (
                    <FeedbackText>{feedbackMessage.text}</FeedbackText>
                )}
                <EnterButton
                    onPress={() => {
                        if (!validator.isEmail(email)) return setFeedbackMessage({
                            show: true,
                            text: "Insira um email válido"
                        });
                        navigation.navigate('LoginPassword', { email: email })
                    }}
                >
                    <ButtonText>Entrar</ButtonText>
                </EnterButton>
            </ContentView>
        </MainView>
    );
}