import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText, TitleView } from './Style';
import { ActivityIndicator } from 'react-native';
import { axiosConfig } from '../config/axiosConfig';

export default function LoginPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitLogin = () => {
        const req = {
            email: route.params.email,
            password: password
        }

        axiosConfig.post('/auth/login', req)
            .then(() => {
                setLoading(true);
                navigation.popToTop();
                navigation.navigate("InsideHome");
            })
            .catch((error) => {
                console.error(error);
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
                <EnterButton
                    disabled={password === ''}
                    onPress={submitLogin}
                >
                    <ButtonText>Entrar</ButtonText>
                </EnterButton>
            </ContentView>
        </MainView>
    );
}