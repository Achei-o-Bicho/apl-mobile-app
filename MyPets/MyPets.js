import React, { useState, useLayoutEffect } from 'react';
import { MainView, AddNewPetButton, TitleNewPet } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import MyPetCard from '../components/MyPetCard/MyPetCard';

export default function MyPets({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [showAddHeaderIcon, setShowAddHeaderIcon] = useState(false);
    const [addPetButtonHeight, setAddPetButtonHeight] = useState(0);
    const [data, setData] = useState([
        { key: 0 },
        { key: 1, name: "Teste", breed: "Labrador", imagePreview: 'a' },
        { key: 2, name: "Teste", breed: "Labrador", imagePreview: 'a' }
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: showAddHeaderIcon && (() => (
                <TouchableOpacity onPress={handleNavigationCreatePet}>
                    <AntDesign.Button name="plus" color="purple" size={25} backgroundColor="transparent" />
                </TouchableOpacity>
            ))
        });
    }, [showAddHeaderIcon]);

    function handleNavigationCreatePet() {
        navigation.navigate("CreatePet");
    }

    function handleFetchData() {
        setRefreshing(true);
        setTimeout(() => {
            setData((prevList) => [...prevList, { key: prevList.length + 1, name: "Teste", breed: "Labrador", imagePreview: 'a' }])
            setRefreshing(false);
        }, 1500)
    }

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
                            <MyPetCard name={item.name} breed={item.breed} imagePreview={item.imagePreview} />
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