import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton/BackButton';
import { ButtonText, ChatButton, ImagePet, ImagesView, MainView, ValuePet, ValuesView } from './Style';
import { View, Text, Dimensions } from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { apiPost } from '../config/api';
import { useUserContext } from '../contexts/UserContext';


export default function MyPetInfo({ navigation, route }) {
    const { width } = Dimensions.get('window');
    const { pet, showChatButton, owner } = route.params;
    const [petImages, setPetImages] = useState([{ image: '' }]);
    const { accessToken, socket } = useUserContext();

    async function fetchAllImages(petId) {
        try {
            const { images } = await apiPost('/pets/images', {
                idPet: petId
            }, {
                "Authorization": `Bearer ${accessToken}`
            });
            if (images && images[0] && images[0].image) {
                setPetImages(images);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleSendSocketMessage() {
        socket.emit("send_message", {
            message: `Olá, encontrei o seu pet ${pet.name}. Retorne o contato o mais breve possível.`,
            userIdReceiver: owner.id,
        })
        navigation.navigate("ChatConversation", { chat: item, name: owner.name })
    }

    useEffect(() => {
        navigation.setOptions({
            title: pet.name,
            headerLeft: (() => (
                <BackButton navigation={navigation} />
            ))
        });
        fetchAllImages(pet._id);
    }, [])

    return (
        <MainView>
            <ImagesView>
                <Carousel
                    pagination={PaginationLight}
                    data={petImages}
                    renderItem={(item, index) => (
                        <ImagePet
                            key={index}
                            width={width}
                            source={{ uri: `data:image/jpeg;base64,${item.image}` }}
                        />
                    )}
                />
            </ImagesView>
            <ValuesView>
                <View
                    style={{ flexDirection: 'row', flex: 1 }}
                >
                    <View
                        style={{ flex: 1 }}
                    >
                        <Text>Nome:</Text>
                        <ValuePet>{pet.name}</ValuePet>
                    </View>
                    <View
                        style={{ flex: 1 }}
                    >
                        <Text>Gênero:</Text>
                        <ValuePet>{pet.gender === "Male" ? "Macho" : "Fêmea"}</ValuePet>
                    </View>
                </View>
                {pet.breed && (
                    <>
                        <Text>Raça:</Text>
                        <ValuePet>{pet.breed}</ValuePet>
                    </>
                )}
                {pet.description && (
                    <View>
                        <Text>Descrição:</Text>
                        <ValuePet>{pet.description}</ValuePet>
                    </View>
                )}
                {!showChatButton && (
                    <ChatButton onPress={handleSendSocketMessage}>
                        <ButtonText>Conversar com o dono</ButtonText>
                    </ChatButton>
                )}
            </ValuesView>
        </MainView>
    );
}