import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText, TitleView, FeedbackText } from './Style';
import { ActivityIndicator } from 'react-native';
import { apiPost } from '../config/api';

export default function LoginPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({});

    const submitLogin = () => {
        setLoading(true);

        const req = {
            email: route.params.email,
            password: password
        }

        apiPost('apl-back-front/auth/login', req)
            .then(() => {
                navigation.popToTop();
                navigation.navigate("InsideHome");

            })
            .catch(() => {
                setFeedbackMessage({ show: true, text: "Senha ou email inválido, verifique e tente novamente" })
            })
    }

    return (
        <MainView>
            <TransparentView
                onPress={() => navigation.goBack()}
            />
            <ContentView
                behavior="padding"
                enabled
            >
                <TitleView>
                    <Title>
                        Senha de acesso
                    </Title>
                    <ActivityIndicator
                        animating={loading}
                        hidesWhenStopped
                        size='small'
                        color='white'
                    />
                </TitleView>
                <Input
                    secureTextEntry
                    autoFocus
                    clearButtonMode='while-editing'
                    enterKeyHint='enter'
                    value={password}
                    onChangeText={(text) => setPassword(text.toLowerCase())}
                />
                {feedbackMessage.show && (
                    <FeedbackText>{feedbackMessage.text}</FeedbackText>
                )}
                <EnterButton
                    disabled={password === '' || loading}
                    onPress={submitLogin}
                >
                    <ButtonText>Entrar</ButtonText>
                </EnterButton>
            </ContentView>
        </MainView>
    );
}
