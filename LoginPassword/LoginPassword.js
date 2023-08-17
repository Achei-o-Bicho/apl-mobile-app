import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText, TitleView, FeedbackText } from './Style';
import { ActivityIndicator } from 'react-native';
import { axiosConfig } from '../config/axiosConfig';

export default function LoginPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({});

    const submitLogin = async () => {
        setLoading(true);

        const headers = {
            'Bypass-Tunnel-Reminder': 'Bypass-Tunnel-Reminder',
            'Content-Type': 'application/json'
        }

        const req = {
            email: route.params.email,
            password: password
        }

        fetch('https://witty-cycles-tie.loca.lt/apl-back-front/auth/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(req)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro de requisição: ' + response.status);
                }
                return response.json();
            })
            .then(() => {
                navigation.popToTop();
                navigation.navigate("InsideHome");
            })
            .catch((error) => {
                console.log(error)
                setFeedbackMessage({
                    show: true,
                    text: "Senha ou email inválido, verifique e tente novamente"
                })
            })
            .finally(() => {
                setLoading(false);
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