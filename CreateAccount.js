import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useEffect, useState, useRef } from 'react/cjs/react.development';
import styled from 'styled-components';
import TypingAnimation from './components/TypingAnimation/TypingAnimation';

const chatBot = {
    steps: [{
        texts: [
            'Olá 😃!',
            'É um prazer ter você apoiando nossa idéia',
            'Para começar, precisamos te identificar',
            'Qual é o seu CPF?'
        ],
        userResponse: '',
        keyboardType: 'number-pad'
    }, {
        texts: [
            'Agora precisamos do seu primeiro nome'
        ],
        userResponse: '',
        keyboardType: 'default'
    }, {
        texts: [
            'E seu sobrenome'
        ],
        userResponse: '',
        keyboardType: 'default'
    }, {
        texts: [
            'Para finalizar',
            'Pedimos o seu número de telefone para contato, caso necessário'
        ],
        userResponse: '',
        keyboardType: 'number-pad'
    }]
}

export default function CreateAccount() {
    const [list, setList] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [isBotTyping, setBotTyping] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [bottomViewHeight, setBottomViewHeight] = useState(0);
    const refChatInput = useRef(null);

    useEffect(() => {
        if (currentItemIndex < chatBot.steps[currentStep].texts.length) {
            const timeout = setTimeout(() => {
                setList((prevList) => [...prevList, chatBot.steps[currentStep].texts[currentItemIndex]]);
                setCurrentItemIndex((prevIndex) => prevIndex + 1);
            }, 1500);

            return () => clearTimeout(timeout);
        } else {
            setBotTyping(false);
            refChatInput.current.focus();
        }
    }, [currentItemIndex]);

    const chatConversation = list.map((item, index) => {
        return (
            <BotCell key={index}>
                <CellText>{item}</CellText>
            </BotCell>
        );
    })

    const showTypingGIF = isBotTyping && (
        <ViewGIF>
            <TypingAnimation color="pink" time={1000} count={3} />
        </ViewGIF>
    )

    return (
        <MainView
            behavior="position"
            enabled
            keyboardVerticalOffset={Platform.OS === 'ios' ? bottomViewHeight : 0}
        >
            <SafeAreaView>
                <ChatView>
                    {chatConversation}
                    {showTypingGIF}
                </ChatView>
                <BottomView
                    onLayout={(event) => {
                        setBottomViewHeight(event.nativeEvent.layout.height)
                    }}
                >
                    <ChatInput
                        ref={refChatInput}
                        placeholder={isBotTyping ? "Aguarde..." : "Digite aqui"}
                        placeholderTextColor="lightgray"
                        editable={!isBotTyping}
                        keyboardType={chatBot.steps[currentStep].keyboardType}
                    />
                    <TouchableOpacity>
                        <AirPlaneButton source={require('./assets/paperplane.circle.fill.png')} />
                    </TouchableOpacity>
                </BottomView>
            </SafeAreaView>
            <StatusBar style="light" />
        </MainView>
    )
}

const MainView = styled.KeyboardAvoidingView`
    background-color: purple;
    flex: 1;
`

const BottomView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: purple;
    width: 100%;
`

const ChatView = styled.ScrollView`
    height: 90%;
    flex-direction: column-reverse;
    padding: 5px 0;
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

const FootprintGIF = styled.Image`
    width: 50px;
    height: 21.3px;
`

const ViewGIF = styled.View`
    margin: 0 0 0 10px;
`