import React, { useState } from 'react';
import { ContentView, MainView, TransparentView, Title, Input, EnterButton, ButtonText, TitleView, FeedbackText, KeyboardView } from './Style';
import { ActivityIndicator } from 'react-native';
import { apiGet, apiPost } from '../config/api';
import BackButton from '../components/BackButton/BackButton';
import { View } from 'react-native';
import { useUserContext } from '../contexts/UserContext';

export default function LoginPassword({ navigation, route }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({});
    const { setUserId, setUserName, setUserPets } = useUserContext();

    const submitLogin = async () => {
        setLoading(true);
        try {
            const { data } = await apiPost('/auth/login', {
                email: route.params.email,
                password: password
            });
            await fetchUserData(data.userId);
            navigation.popToTop();
            navigation.navigate("InsideHome");
        } catch (error) {
            console.log(error);
            setFeedbackMessage({
                show: true,
                text: "Senha ou email inválido, verifique e tente novamente"
            })
        }
        setLoading(false);
    }

    const fetchUserData = async (id) => {
        try {
            const { name, pets } = await apiGet(`/users/pets/${id}`);
            setUserId(id);
            setUserName(name);
            setUserPets(pets);
        } catch (error) {
            console.log(error);
            setFeedbackMessage({
                show: true,
                text: "Estamos passando por manutenção, tente novamente mais tarde"
            })
        }
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
