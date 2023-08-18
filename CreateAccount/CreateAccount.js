import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState, useRef } from 'react/cjs/react.development';
import TypingAnimation from '../components/TypingAnimation/TypingAnimation';
import { MainView, BottomView, ChatView, BotCell, UserCell, CellText, ChatInput, AirPlaneButton, ViewGIF, FinishButton, ButtonText } from './Style';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { cpf } from 'cpf-cnpj-validator';
const passwordValidator = require('password-validator');
import validator from 'validator';
import { apiPost } from '../config/api';

var codeNumber = null;

export default function CreateAccount({ navigation }) {
    const [list, setList] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [isBotTyping, setBotTyping] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [bottomViewHeight, setBottomViewHeight] = useState(0);
    const [isFinished, setFinished] = useState(false);
    const refChatInput = useRef(null);
    const scrollViewRef = useRef(null);

    const [chat, setChat] = useState({
        steps: [{
            bot: [
                'Olá 😃!',
                'É um prazer ter você apoiando nossa idéia',
                'Para começar, precisamos te identificar',
                'Qual é o seu CPF?'
            ],
            userResponse: '',
            keyboardType: 'number-pad',
            validate: async function (response) {
                return cpf.isValid(response);
            },
            feedback: {
                text: 'Verifiquei aqui mas parece que o seu CPF não é válido, tente novamente'
            }
        }, {
            bot: [
                'Agora precisamos do seu email'
            ],
            userResponse: '',
            keyboardType: 'email-address',
            validate: async function (response) {
                return validator.isEmail(response);
            },
            feedback: {
                text: 'O seu email não parece válido, verifique e tente novamente'
            }
        }, {
            bot: [
                'Qual é seu primeiro nome?'
            ],
            userResponse: '',
            keyboardType: 'default',
            validate: async function (response) {
                return response !== ' ';
            },
            feedback: {
                text: 'O seu primeiro nome não pode ser um espaço em branco, tente novamente'
            }
        }, {
            bot: [
                'E seu sobrenome?'
            ],
            userResponse: '',
            keyboardType: 'default',
            validate: async function (response) {
                return response !== ' ';
            },
            feedback: {
                text: 'O seu sobrenome não pode ser um espaço em branco, tente novamente'
            }
        }, {
            bot: [
                'Para finalizar',
                'Precisamos do seu número de telefone (WhatsApp) para contato, caso necessário'
            ],
            userResponse: '',
            keyboardType: 'phone-pad',
            validate: async function (response) {
                const internationalPattern = /^\+\d{1,3}\s?\d{1,14}$/
                const phoneNumberPattern = /^\d{7,15}$/
                if (phoneNumberPattern.test(response) || internationalPattern.test(response)) {
                    return await handleValidatePhoneNumber(response);
                } else {
                    return false;
                }
            },
            feedback: {
                text: 'O seu número de telefone não parecer ser válido, tente novamente seguindo este padrão: +551234567890'
            }
        }, {
            bot: [
                'Nos informe o código de 6 dígitos que te enviamos no WhatsApp',
            ],
            userResponse: '',
            keyboardType: 'phone-pad',
            validate: async function (response) {
                return response === codeNumber;
            },
            feedback: {
                text: 'O código está incorreto, verifique e tente novamente'
            }
        }, {
            bot: [
                'Escolha uma senha para utilizar toda vez que entrar no nosso aplicativo',
            ],
            userResponse: '',
            keyboardType: 'default',
            validate: async function (response) {
                var schema = new passwordValidator();
                schema
                    .is()
                    .min(6)
                    .has().not().spaces()
                return schema.validate(response);
            },
            feedback: {
                text: 'Ops, sua senha pode ser mais forte! Por favor, selecione uma senha com pelo menos 6 caracteres e sem espaços em branco'
            },
            secureTextEntry: true
        }, {
            bot: [
                'Só um momento enquanto processamos suas informações...',
            ],
            userResponse: '',
            keyboardType: 'default',
            autoValidate: true,
            feedback: {
                text: 'Parece que algo não deu certo, tente novamente mais tarde'
            }
        }, {
            bot: [
                'Muito obrigado!',
                'Agora é só concluir e entrar com a sua nova conta'
            ],
            userResponse: '',
            keyboardType: 'default',
            validate: async function (_) {
                return true;
            },
            feedback: {
                text: ''
            }
        }]
    })

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

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
        setCurrentItemIndex(0);
    }

    const handleValidateStep = async (chatStep) => {
        if (chatStep.validate || !chatStep.autoValidate) {
            if (await chatStep.validate(chatStep.userResponse)) {
                return handleNextStep();
            } else {
                return handleBotFeedback(chatStep);
            }
        }
    }

    async function handleValidatePhoneNumber(number) {
        try {
            const { tokenOtp } = await apiPost('/users/validate-number', { number });
            codeNumber = tokenOtp;
            return codeNumber !== null;
        } catch (error) {
            setChat({
                ...chat.steps[4].feedback,
                text: "Parece que estamos enfrentando um problema com o nosso sistema, tente novamente mais tarde"
            });
        }
    }

    async function handleSendNewUser() {
        try {
            const data = {
                document: await chat.steps[0].userResponse,
                name: `${await chat.steps[2].userResponse} ${await chat.steps[3].userResponse}`,
                contact: {
                    emailAddress: (await chat.steps[1].userResponse).toLowerCase(),
                    phone: await chat.steps[4].userResponse
                },
                password: await chat.steps[6].userResponse
            }
            const { newUser } = await apiPost('/users', data);
            return newUser !== null;
        } catch (error) {
            return false;
        }
    }

    function handleBotFeedback(chatStep) {
        return setTimeout(() => {
            setList((prevList) => [
                ...prevList,
                {
                    origin: 'bot',
                    text: chatStep.feedback.text,
                },
            ]);
            setBotTyping(false);
        }, 1500);
    }

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
        setFinished(currentStep >= (chat.steps.length - 1));
        const chatStep = chat.steps[currentStep];
        if (currentStep === 7) {
            async function validateStep() {
                setBotTyping(true);
                if (await handleSendNewUser()) {
                    return handleNextStep();
                } else {
                    return handleBotFeedback(chatStep);
                }
            }
            if (chatStep.autoValidate) validateStep();
        }
    }, [currentStep])

    useEffect(() => {
        if (!isBotTyping && !isFinished) refChatInput.current.focus();
    }, [isBotTyping])

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
                    {list.map((item, index) => item.origin === 'bot' ? (
                        <BotCell key={index}>
                            <CellText>{item.text}</CellText>
                        </BotCell>
                    ) : (
                        <UserCell key={index}>
                            <CellText>{
                                item.isSecureText ?
                                    item.text
                                        .split('')
                                        .map(_ => '*')
                                        .join('')
                                    :
                                    item.text
                            }</CellText >
                        </UserCell >
                    ))}
                    {isBotTyping && (
                        <ViewGIF>
                            <TypingAnimation color="pink" time={1000} count={3} />
                        </ViewGIF>
                    )}
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
                                secureTextEntry={chat.steps[currentStep].secureTextEntry}
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
                                disabled={chat.steps[currentStep].userResponse == ''}
                                onPress={async () => {
                                    const chatStep = chat.steps[currentStep];
                                    clearTextInput();

                                    setList((prevList) => [
                                        ...prevList,
                                        {
                                            origin: 'user',
                                            text: chatStep.userResponse.trim(),
                                            isSecureText: chatStep.secureTextEntry
                                        },
                                    ]);
                                    setBotTyping(true);
                                    await handleValidateStep(chatStep);
                                }}

                            >
                                <AirPlaneButton source={require('../assets/paperplane.circle.fill.png')} />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <FinishButton
                            onPress={() => navigation.goBack()}
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