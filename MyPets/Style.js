import React from 'react';
import styled from 'styled-components';

export const MainView = styled.SafeAreaView`
    flex: 1;
`

export const AddNewPet = styled.View`
    flex: 1;
`

export const TitleNewPet = styled.Text`
    color: purple;
    font-size: 20px;
    margin-bottom: 10px;
`

export const SubtitleNewPet = styled.Text`
    font-size: 15px;
`

export const AddNewPetButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    margin: 25px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    align-items: center;
`

export const PetList = styled.FlatList`

`