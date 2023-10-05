import React, { useState } from 'react';
import { ButtonText, ContentView, EnterButton, FeedbackText, Input, KeyboardView, MainView, Title, TransparentView } from './Style';
import validator from 'validator';
import { Platform, View } from 'react-native';
import BackButton from '../components/BackButton/BackButton';

export default function HaveAccount({ navigation }) {
    const [email, setEmail] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState({});

    return (
        <MainView>
            {Platform.OS === 'ios' && (
                <TransparentView
                    onPress={() => navigation.goBack()}
                />
            )}
            <KeyboardView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled
            >
                <ContentView>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <BackButton navigation={navigation} color="white" />
                        <Title>
                            Digite seu Email
                        </Title>
                    </View>
                    <Input
                        autoFocus
                        clearButtonMode='while-editing'
                        enterKeyHint='next'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={(text) => {
                            setFeedbackMessage({ show: false })
                            setEmail(text)
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
            </KeyboardView>
        </MainView>
    );
}