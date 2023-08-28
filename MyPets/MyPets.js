import React, { useState, useLayoutEffect, useEffect } from 'react';
import { MainView, AddNewPetButton, TitleNewPet } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import MyPetCard from '../components/MyPetCard/MyPetCard';
import { apiGet } from '../config/api';
import { useIsFocused } from '@react-navigation/native';

export default function MyPets({ navigation }) {
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(true);
    const [showAddHeaderIcon, setShowAddHeaderIcon] = useState(false);
    const [addPetButtonHeight, setAddPetButtonHeight] = useState(0);
    const { userId, userPets, setUserPets } = useUserContext();
    const [data, setData] = useState([userPets]);

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
            setData(pets);
        } catch (error) {
            console.log(error)
        }
        setRefreshing(false);
    }

    useEffect(() => {
        async function fetchData() {
            await handleFetchData();
        }
        if (isFocused) {
            fetchData()
        }
    }, [isFocused])

    return (
        <MainView>
            <FlatList
                refreshing={refreshing}
                data={data}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleFetchData} />
                }
                ListHeaderComponent={(
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
                )}
                renderItem={({ item }) => {
                    if (item && item.images && item.images[0] && item.images[0].base64) {
                        return (
                            <MyPetCard
                                name={item.name}
                                breed={item.breed}
                                imagePreview={item.images[0].base64}
                                description={item.description}
                                onPress={() => {
                                    navigation.navigate("MyPetInfo", { pet: item });
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