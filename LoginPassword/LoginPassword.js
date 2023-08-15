import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText, TitleView } from './Style';
import { ActivityIndicator } from 'react-native';

export default function LoginPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
                    onPress={() => {
                        console.log(route.params.email);
                        console.log(password);
                        setLoading(true);
                        setTimeout(() => {
                            navigation.popToTop();
                            navigation.navigate("InsideHome");
                        }, 1500)
                    }}
                >
                    <ButtonText>Entrar</ButtonText>
                </EnterButton>
            </ContentView>
        </MainView>
    );
}