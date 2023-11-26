import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText, TitleView, FeedbackText, KeyboardView } from './Style';
import { ActivityIndicator } from 'react-native';
import { apiGet, apiPost } from '../config/api';
import BackButton from '../components/BackButton/BackButton';
import { View } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import { io } from 'socket.io-client';

export default function LoginPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const { setUserId, setUserName, setUserPets, setAccessToken, setSocket } = useUserContext();

    const submitLogin = async () => {
        setLoading(true);
        try {
            const { data } = await apiPost('/auth/login', {
                email: (route.params.email).toLowerCase(),
                password: password
            });
            const { userId, accessToken } = data;
            const socket = io("http://3.229.11.208:8080/", {
                autoConnect: false,
                extraHeaders: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            setSocket(socket);
            await fetchUserData(userId, accessToken);
            navigation.popToTop();
            navigation.navigate("InsideHome");
        } catch (error) {
            console.log(error);
            setFeedbackMessage("Senha ou email inválido, verifique e tente novamente");
        }
        setLoading(false);
    }

    const fetchUserData = async (id, accessToken) => {
        const { name, pets } = await apiGet(`/users/pets/${id}`, {
            "Authorization": `Bearer ${accessToken}`
        });
        setUserId(id);
        setUserName(name);
        setUserPets(pets);
        setAccessToken(accessToken);
    }

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
                        onKeyPress={() => setFeedbackMessage(null)}
                    />
                    {feedbackMessage && <FeedbackText>{feedbackMessage}</FeedbackText>}
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
