import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText } from './Style';

export default function LoginPassword({ navigation, route }) {
    const [password, setPassword] = useState('');

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
                    Senha de acesso
                </Title>
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
                    onPress={() => {
                        console.log(route.params.email);
                        console.log(password);
                        navigation.popToTop();
                        navigation.navigate("InsideHome");
                    }}
                >
                    <ButtonText>Entrar</ButtonText>
                </EnterButton>
            </ContentView>
        </MainView>
    );
}