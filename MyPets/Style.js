import React from 'react';
import styled from 'styled-components';

export const MainView = styled.SafeAreaView`
    flex: 1;
`

export const TitleNewPet = styled.Text`
    color: purple;
    font-size: 20px;
    margin-bottom: 10px;
`

export const AddNewPetButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    margin-right: 25px;
    margin-left: 25px;
    margin-top: 25px;
    margin-bottom: 35px;
    padding-right: 0;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: white;
    border-radius: 10px;
    align-items: center;
`