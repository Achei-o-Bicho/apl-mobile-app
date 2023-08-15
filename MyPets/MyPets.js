import React, { useState, useLayoutEffect } from 'react';
import { AddNewPet, MainView, AddNewPetButton, NewPetView, TitleNewPet, SubtitleNewPet, PetList } from './Style';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';

export default function MyPets({ navigation }) {
    const [showAddHeaderIcon, setShowAddHeaderIcon] = useState(false);
    const [addPetButtonHeight, setAddPetButtonHeight] = useState(0);
    const [data, setData] = useState([
        { key: "AddNewPet" }
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
            <PetList
                data={data}
                renderItem={({ item }) => {
                    if (item.key === "AddNewPet") {
                        return (
                            <AddNewPet
                                onLayout={({ nativeEvent }) => setAddPetButtonHeight(nativeEvent.layout.height)}
                            >
                                <AddNewPetButton onPress={handleNavigationCreatePet}>
                                    <View>
                                        <TitleNewPet>Novo pet</TitleNewPet>
                                        <SubtitleNewPet>Adicione seu novo pet aqui</SubtitleNewPet>
                                    </View>
                                    <AntDesign.Button name="plus" color="purple" size={25} backgroundColor="transparent" />
                                </AddNewPetButton>
                            </AddNewPet>
                        );
                    } else {
                        return <></>
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