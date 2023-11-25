import React from 'react';
import styled from 'styled-components';

export const MainView = styled.SafeAreaView`
    flex: 1;
    background-color: 'purple';
`

export const Cell = styled.View`
    padding: 10px 15px;
    margin: 5px;
    border-radius: 8px;
    max-width: 80%;
`

export const ChatView = styled.ScrollView`
    height: 89.1%;
    padding: 5px 0;
    background-color: white;
`

export const ReceiverCell = styled(Cell)`
    align-self: flex-start;
    background-color: lightgray;
    align-items: flex-start;
`

export const SenderCell = styled(Cell)`
    align-self: flex-end;
    background-color: purple;
    align-items: flex-end;
`

export const CellTextSender = styled.Text`
    color: white;
    font-size: 16px;
`

export const TimeSextSender = styled.Text`
    color: white;
    font-size: 10px;
`

export const CellTextReceiver = styled.Text`
    color: black;
    font-size: 16px;
`

export const TimeSextReceiver = styled.Text`
    color: black;
    font-size: 10px;
`

export const BottomView = styled.View`
    flex-direction: row;
    background-color: purple;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    height: 60px;
`

export const ChatInput = styled.TextInput`
    background-color: white;
    flex: 1;
    height: 38px;
    border: 1px solid white;
    color: black;
    padding: 8px 15px;
    border-radius: 8px;
    font-size: 16px;
    margin: 12px 10px 12px 0;
`

export const AirPlaneButton = styled.Image`
    height: 40px;
    width: 40px;
    transform: rotate(45deg);
`