import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText, TitleView, FeedbackText, KeyboardView } from './Style';
import { ActivityIndicator } from 'react-native';
import { apiPost } from '../config/api';
import BackButton from '../components/BackButton/BackButton';
import { View } from 'react-native';

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

        apiPost('/auth/login', req)
            .then(() => {
                navigation.popToTop();
                navigation.navigate("InsideHome");
            })
            .catch(() => {
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
            <KeyboardView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled
            >
                <ContentView>
                    <TitleView>
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <BackButton navigation={navigation} color="white" />
                            <Title>
                                Senha de acesso
                            </Title>
                        </View>
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
            </KeyboardView>
        </MainView>
    );
}
