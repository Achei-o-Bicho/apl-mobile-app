import React from 'react';
import styled from 'styled-components';

export const MainView = styled.View`
    flex: 1;
`

export const TransparentView = styled.TouchableOpacity`
    flex: 1;
`

export const KeyboardView = styled.KeyboardAvoidingView`
    flex: 1.2;
    background-color: purple;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    overflow: hidden;
`

export const ContentView = styled.View`
    background-color: purple;
    padding: 20px;
`

export const Title = styled.Text`
    color: white;
    font-weight: 500;
    font-size: 20px;
`

export const Input = styled.TextInput`
    margin-top: 25px;
    color: white;
    font-weight: 600;
    font-size: 25px;
`

export const FeedbackText = styled.Text`
    margin-top: 10px;
    color: yellow;
`

export const EnterButton = styled.TouchableOpacity`
    margin-top: 25px;
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px; 
    background-color: white;
`

export const ButtonText = styled.Text`
    text-transform: uppercase;
    color: purple;
    font-size: 16px;
    font-weight: 700;
`