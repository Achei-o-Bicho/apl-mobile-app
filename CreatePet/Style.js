import React from 'react';
import styled from 'styled-components';

export const MainView = styled.SafeAreaView`
    flex: 1;
`

export const AddNewPet = styled.View`
`

export const TitleNewPet = styled.Text`
    color: purple;
    font-size: 26px;
    margin-bottom: 10px;
    text-align: center;
`

export const SubtitleNewPet = styled.Text`
    font-size: 20px;
    text-align: center;
    margin-top: 25px;
`

export const NewPetView = styled.View`
    margin: 50px;
    padding: 10px;    
`

export const ContinueButton = styled.TouchableOpacity`
    background-color: purple;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    border-radius: 10px;
`

export const TextContinue = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 18px;
`