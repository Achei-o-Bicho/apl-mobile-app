import React from 'react';
import { AddNewPet, MainView, NewPetView, SubtitleNewPet, TitleNewPet } from './Style';
import { AntDesign } from '@expo/vector-icons';

export default function MyPets() {
    return (
        <MainView>
            <AddNewPet>
                <NewPetView>
                    <TitleNewPet>Novo pet</TitleNewPet>
                    <SubtitleNewPet>Adicione seu novo pet aqui</SubtitleNewPet>
                </NewPetView>
                <AntDesign.Button name="plus" color="purple" backgroundColor="transparent" />
            </AddNewPet>
        </MainView>
    );
}