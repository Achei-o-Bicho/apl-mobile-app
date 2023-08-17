import React from 'react';
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

export const MainView = styled.KeyboardAvoidingView`
    flex: 1;
`

export const AddNewPet = styled.ScrollView`
    flex: 1;
    padding: 30px;
`

export const TitleNewPet = styled.Text`
    color: purple;
    font-size: 20px;
    margin-bottom: 40px;
    text-align: center;
`

export const ContinueButton = styled.TouchableOpacity`
    background-color: purple;
    height: 55px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    position: relative;
`

export const TextContinue = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
`

export const GenderView = styled.View`
    flex-direction: row;
`

export const GenderPet = styled.View`
    border: 1px solid black;
    flex: 1;
`

export const InputsView = styled.View`
    margin-bottom: 50px;
`

export const StepView = styled.View`
    margin-top: 20px;
`

export const ImagesView = styled.View`
    flex-direction: row;
    justify-content: center;
`

export const ImagePet = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 5px;
`

export const ImagePetButton = styled.TouchableOpacity`
    position: relative;
    border-radius: 5px;
    border: 1px solid purple;
`

export const PlusIcon = styled(AntDesign)`
    position: absolute;
    z-index: 5;
    right: -10px;
    top: -10px;
    ${({ hasImage }) => hasImage && ('transform: rotate(45deg);')}
`