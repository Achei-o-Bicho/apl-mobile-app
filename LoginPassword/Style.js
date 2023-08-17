import React from 'react';
import styled from 'styled-components';

export const MainView = styled.View`
    flex: 1;
    justify-content: flex-end;
`

export const TransparentView = styled.TouchableOpacity`
    flex: 1;
`

export const ContentView = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: purple;
    padding: 20px;
    border-radius: 10px;
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

export const TitleView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const FeedbackText = styled.Text`
    margin-top: 10px;
    color: yellow;
`