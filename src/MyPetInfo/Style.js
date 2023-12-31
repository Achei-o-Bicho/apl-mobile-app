import React from 'react';
import styled from 'styled-components';

export const MainView = styled.ScrollView`
    flex: 1;
`

export const ImagesView = styled.View`
    justify-content: center;
    background-color: lightgray;
    ${({ width }) => `
    width: ${width}px;
    height: ${width * 0.8}px;
    `}
`

export const ImagePet = styled.Image`
    background-color: lightgray;
    ${({ width }) => `
    width: ${width}px;
    height: ${width * 0.8}px;
    `}
`

export const ValuesView = styled.View`
    padding: 25px;
`

export const ValuePet = styled.Text`
    margin-bottom: 20px;
    font-size: 20px;
    color: purple;
`

export const Button = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
`

export const ChatButton = styled(Button)`
    background-color: purple;
    border: 2px solid purple;
`

export const ButtonText = styled.Text`
    text-transform: uppercase;
    color: white;
    font-size: 16px;
    font-weight: 700;
`