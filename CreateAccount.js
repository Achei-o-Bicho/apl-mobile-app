import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import styled from 'styled-components';

const chatBot = {
    steps: [{
        text: 'Olá 😃!'
    }, {
        text: 'É um prazer ter você apoiando nossa idéia'
    }, {
        text: 'Para começar, precisamos te identificar'
    }, {
        text: 'Qual é o seu CPF?'
    }]
}

export default function CreateAccount() {
    const [list, setList] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [isBotTyping, setBotTyping] = useState(true);

    useEffect(() => {
        if (currentItemIndex < chatBot.steps.length) {
            const timeout = setTimeout(() => {
                setList((prevList) => [...prevList, chatBot.steps[currentItemIndex]]);
                setCurrentItemIndex((prevIndex) => prevIndex + 1);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [currentItemIndex]);

    const chatConversation = list.map((step, index) => {
        return (
            <BotCell key={index}>
                <CellText>{step.text}</CellText>
            </BotCell>
        );
    })

    return (
        <MainView>
            <SafeArea>
                <ChatView>{chatConversation}</ChatView>
                <BottomView>
                    <ChatInput
                        placeholder="Aguarde..."
                        placeholderTextColor="lightgray"
                        editable={true}
                    />
                    <TouchableOpacity>
                        <AirPlaneButton source={require('./assets/paperplane.circle.fill.png')} />
                    </TouchableOpacity>
                </BottomView>
                <StatusBar style="light" />
            </SafeArea>
        </MainView>
    )
}

const MainView = styled.View`
    background-color: purple;
`

const SafeArea = styled.SafeAreaView`
    display: flex;
    justify-content: space-between;
    height: 100%;
`

const BottomView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: purple;
    width: 100%;
`

const ChatView = styled.ScrollView`
    display: flex;
    flex-direction: column-reverse;
    padding: 20px 0;
    background-color: white;
`

const Cell = styled.View`
    padding: 10px 15px;
    margin: 5px;
    border-radius: 15px;
    align-self: flex-start;
    max-width: 80%;
`

const BotCell = styled(Cell)`
    background-color: pink;
`

const CellText = styled.Text`
    font-size: 16px;
`

const ChatInput = styled.TextInput`
    width: 80%;
    border: 1px solid white;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 16px;
    margin: 12px 10px 12px 0;
`

const AirPlaneButton = styled.Image`
    height: 40px;
    width: 40px;
    transform: rotate(45deg);
`