import React from 'react';
import styled from 'styled-components';

export const MainView = styled.KeyboardAvoidingView`
    background-color: purple;
    flex: 1;
`

export const BottomView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: purple;
    width: 100%;
`

export const ChatView = styled.ScrollView`
    height: 90%;
    padding: 5px 0;
    background-color: white;
`

export const Cell = styled.View`
    padding: 10px 15px;
    margin: 5px;
    border-radius: 15px;
    max-width: 80%;
`

export const BotCell = styled(Cell)`
    align-self: flex-start;
    background-color: pink;
`

export const UserCell = styled(Cell)`
    align-self: flex-end;
    background-color: aliceblue;
`

export const CellText = styled.Text`
    font-size: 16px;
`

export const ChatInput = styled.TextInput`
    width: 80%;
    border: 1px solid white;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 16px;
    margin: 12px 10px 12px 0;
`

export const AirPlaneButton = styled.Image`
    height: 40px;
    width: 40px;
    transform: rotate(45deg);
`

export const ViewGIF = styled.View`
    margin: 0 0 0 10px;
`

export const FinishButton = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
`

export const ButtonText = styled.Text`
    text-transform: uppercase;
    color: white;
    font-size: 16px;
    font-weight: 700;
`