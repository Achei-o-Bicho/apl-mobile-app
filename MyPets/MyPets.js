import React, { useState, useLayoutEffect, useEffect } from 'react';
import { MainView, AddNewPetButton, TitleNewPet } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import MyPetCard from '../components/MyPetCard/MyPetCard';
import { apiGet } from '../config/api';

export default function MyPets({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [showAddHeaderIcon, setShowAddHeaderIcon] = useState(false);
    const [addPetButtonHeight, setAddPetButtonHeight] = useState(0);
    const { userId, userPets, setUserPets } = useUserContext();
    const [data, setData] = useState([{ key: 0 }, userPets]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: showAddHeaderIcon && (() => (
                <AntDesign.Button
                    name="plus"
                    color="purple"
                    size={25}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    activeOpacity={0.2}
                    onPress={handleNavigationCreatePet}
                />
            ))
        });
    }, [showAddHeaderIcon]);

    function handleNavigationCreatePet() {
        navigation.navigate("CreatePet");
    }

    async function handleFetchData() {
        setRefreshing(true);
        try {
            const { pets } = await apiGet(`/users/pets/${userId}`);
            setUserPets(pets);
            const [addElement, _] = data;
            setData([addElement, ...pets])
        } catch (error) {
            console.log(error)
        }
        setRefreshing(false);
    }

    useEffect(() => {
        async function fetchData() {
            await handleFetchData();
        }
        fetchData();
        console.log(data);
    }, [])

    return (
        <MainView>
            <FlatList
                refreshing={refreshing}
                data={data}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleFetchData} />
                }
                renderItem={({ item }) => {
                    if (item.key === 0) {
                        return (
                            <View
                                onLayout={({ nativeEvent }) => setAddPetButtonHeight(nativeEvent.layout.height)}
                            >
                                <AddNewPetButton onPress={handleNavigationCreatePet}>
                                    <View>
                                        <TitleNewPet>Novo pet</TitleNewPet>
                                        <Text>Adicione seu novo pet aqui</Text>
                                    </View>
                                    <AntDesign name="plus" color="purple" size={25} backgroundColor="transparent" />
                                </AddNewPetButton>
                            </View>
                        );
                    } else {
                        return (
                            <MyPetCard
                                name={item.name}
                                breed={item.breed}
                                imagePreview={item.imagePreview}
                                description={item.description}
                                onPress={() => {
                                    navigation.navigate("MyPetInfo", {
                                        imagePreview: item.image,
                                        name: item.name,
                                        breed: item.breed,
                                        gender: item.gender,
                                        description: item.description
                                    });
                                }}
                            />
                        );
                    }
                }}
                onScroll={(event) => {
                    const { contentOffset } = event.nativeEvent;
                    setShowAddHeaderIcon(contentOffset.y > (addPetButtonHeight - (addPetButtonHeight * 0.4)));
                }}
            />
        </MainView>
    );
}