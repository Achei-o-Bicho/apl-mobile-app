import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState, useRef } from 'react/cjs/react.development';
import TypingAnimation from '../components/TypingAnimation/TypingAnimation';
import { MainView, BottomView, ChatView, BotCell, UserCell, CellText, ChatInput, AirPlaneButton, ViewGIF, FinishButton, ButtonText } from './Style';
import { SafeAreaView, TouchableOpacity } from 'react-native';

export default function CreateAccount({ navigation }) {
    const [chat, setChat] = useState({
        steps: [{
            bot: [
                'Olá 😃!',
                'É um prazer ter você apoiando nossa idéia',
                'Para começar, precisamos te identificar',
                'Qual é o seu CPF?'
            ],
            userResponse: '',
            keyboardType: 'number-pad'
        }, {
            bot: [
                'Agora precisamos do seu primeiro nome'
            ],
            userResponse: '',
            keyboardType: 'default'
        }, {
            bot: [
                'E seu sobrenome'
            ],
            userResponse: '',
            keyboardType: 'default'
        }, {
            bot: [
                'Para finalizar',
                'Pedimos o seu número de telefone para contato, caso necessário'
            ],
            userResponse: '',
            keyboardType: 'number-pad'
        }, {
            bot: [
                'Muito obrigado!',
                'Recebemos as suas informações e estamos processando',
                'Pode ser que demore um pouco, te avisaremos via WhatsApp'
            ],
            userResponse: '',
            keyboardType: 'default'
        }]
    })
    const [list, setList] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [isBotTyping, setBotTyping] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [bottomViewHeight, setBottomViewHeight] = useState(0);
    const [isFinished, setFinished] = useState(false);
    const refChatInput = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        if (currentItemIndex < chat.steps[currentStep].bot.length) {
            const timeout = setTimeout(() => {
                setList((prevList) => [...prevList, { text: chat.steps[currentStep].bot[currentItemIndex], origin: 'bot' }]);
                setCurrentItemIndex((prevIndex) => prevIndex + 1);
            }, 1500);

            return () => clearTimeout(timeout);
        } else {
            setBotTyping(false);
        }
    }, [currentItemIndex]);

    useEffect(() => {
        setCurrentItemIndex(0);
        setFinished(currentStep >= (chat.steps.length - 1));
    }, [currentStep])

    useEffect(() => {
        if (!isBotTyping && !isFinished) refChatInput.current.focus();
    }, [isBotTyping])

    const chatConversation = list.map((item, index) => {
        if (item.origin === 'bot') {
            return (
                <BotCell key={index}>
                    <CellText>{item.text}</CellText>
                </BotCell>
            )
        } else {
            return (
                <UserCell key={index}>
                    <CellText>{item.text}</CellText >
                </UserCell >
            )
        }
    })

    const showTypingGIF = isBotTyping && (
        <ViewGIF>
            <TypingAnimation color="pink" time={1000} count={3} />
        </ViewGIF>
    )

    const clearTextInput = () => {
        if (refChatInput.current) {
            refChatInput.current.clear();
        }
    }

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    return (
        <MainView
            behavior="position"
            enabled
            keyboardVerticalOffset={Platform.OS === 'ios' ? bottomViewHeight : 0}
        >
            <SafeAreaView>
                <ChatView
                    ref={scrollViewRef}
                    onContentSizeChange={scrollToBottom}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                        paddingBottom: isBotTyping ? 20 : 10
                    }}
                >
                    {chatConversation}
                    {showTypingGIF}
                </ChatView>
                <BottomView
                    onLayout={(event) => {
                        setBottomViewHeight(event.nativeEvent.layout.height)
                    }}
                >
                    {!isFinished ? (
                        <>
                            <ChatInput
                                ref={refChatInput}
                                placeholder={isBotTyping ? "Aguarde..." : "Digite aqui"}
                                placeholderTextColor="lightgray"
                                editable={!isBotTyping}
                                keyboardType={chat.steps[currentStep].keyboardType}
                                onChangeText={(text) => {
                                    setChat({
                                        ...chat, steps: chat.steps.map((step, index) => {
                                            if (index === currentStep) {
                                                return { ...step, userResponse: text };
                                            }
                                            return step;
                                        })
                                    });
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    clearTextInput();
                                    setList([...list, {
                                        origin: 'user',
                                        text: chat.steps[currentStep].userResponse
                                    }]);
                                    setBotTyping(true);
                                    setCurrentStep((prevStep) => prevStep + 1);
                                }}
                            >
                                <AirPlaneButton source={require('../assets/paperplane.circle.fill.png')} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <FinishButton
                            onPress={() => navigation.goBack('Home')}
                        >
                            <ButtonText>Concluir</ButtonText>
                        </FinishButton>
                    )}
                </BottomView>
            </SafeAreaView>
            <StatusBar style="light" />
        </MainView>
    )
}