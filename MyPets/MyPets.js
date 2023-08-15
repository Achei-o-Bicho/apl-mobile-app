import React, { useState, useLayoutEffect } from 'react';
import { MainView, AddNewPetButton, TitleNewPet } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { View, FlatList, Text } from 'react-native';
import MyPetCard from '../components/MyPetCard/MyPetCard';

export default function MyPets({ navigation }) {
    const [showAddHeaderIcon, setShowAddHeaderIcon] = useState(false);
    const [addPetButtonHeight, setAddPetButtonHeight] = useState(0);
    const [data, setData] = useState([
        { key: "AddNewPet" },
        { key: "0", name: "Teste", breed: "Labrador" },
        { key: "1", name: "Teste", breed: "Labrador" }
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

    return (
        <MainView>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    if (item.key === "AddNewPet") {
                        return (
                            <View
                                onLayout={({ nativeEvent }) => setAddPetButtonHeight(nativeEvent.layout.height)}
                            >
                                <AddNewPetButton onPress={handleNavigationCreatePet}>
                                    <View>
                                        <TitleNewPet>Novo pet</TitleNewPet>
                                        <Text>Adicione seu novo pet aqui</Text>
                                    </View>
                                    <AntDesign.Button name="plus" color="purple" size={25} backgroundColor="transparent" />
                                </AddNewPetButton>
                            </View>
                        );
                    } else {
                        return (
                            <MyPetCard name={item.name} breed={item.breed} />
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