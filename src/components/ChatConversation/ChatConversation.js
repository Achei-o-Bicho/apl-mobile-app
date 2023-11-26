import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, Platform, ScrollView, View } from 'react-native';
import { AirPlaneButton, BottomView, CellTextSender, ChatInput, MainView, ReceiverCell, SenderCell, TimeSextSender, CellTextReceiver, TimeSextReceiver } from './Style';
import { useUserContext } from '../../contexts/UserContext';

export default function ChatConversation({ navigation, route }) {
    const { chat, name } = route.params;
    const [messages, setMessages] = useState(chat.messages);
    const [messageText, setMessageText] = useState();
    const { userId, socket } = useUserContext();
    const scrollViewRef = useRef(null);

    function handleSendSocketMessage(message) {
        socket.emit("send_message", {
            message: message,
            userIdReceiver: userId === chat.sender._id ? chat.receiver._id : chat.sender._id,
            room: {
                id: chat._id
            }
        }, (response) => console.log(response))
        setMessageText();
    }

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    function formatDate(date) {
        let dateObject = new Date(date);
        var options = { hour: '2-digit', minute: '2-digit', hour12: false };
        var newDate = dateObject.toLocaleDateString('pt-BR', options);
        return newDate;
    }

    useEffect(() => {
        navigation.setOptions({ title: name });
        socket.connect();
        socket.on('get_all_messages', (rooms) => setMessages(rooms.filter((room) => room._id === chat._id)[0].messages));

        return () => {
            socket.disconnect();
        };
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return <MainView>
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'purple' }}
            behavior={Platform.OS == "ios" ? "padding" : null}
            enabled
            keyboardVerticalOffset={90}
        >
            <View
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={scrollToBottom}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'white'
                    }}
                >
                    {messages.map((message) => {
                        if (message.user === userId) {
                            return <ReceiverCell>
                                <CellTextReceiver>{message.message}</CellTextReceiver>
                                <TimeSextReceiver>{formatDate(message.createdAt)}</TimeSextReceiver>
                            </ReceiverCell>
                        } else {
                            return <SenderCell>
                                <CellTextSender>{message.message}</CellTextSender>
                                <TimeSextSender>{formatDate(message.createdAt)}</TimeSextSender>
                            </SenderCell>
                        }
                    })}
                </ScrollView>
                <BottomView>
                    <ChatInput
                        value={messageText}
                        onChangeText={setMessageText}
                        placeholder="Digite aqui..."
                        placeholderTextColor="#adadad"
                        onFocus={scrollToBottom}
                    />
                    <TouchableOpacity
                        onPress={() => handleSendSocketMessage(messageText)}
                    >
                        <AirPlaneButton source={require('../../assets/paperplane.circle.fill.png')} />
                    </TouchableOpacity>
                </BottomView>
            </View>
        </KeyboardAvoidingView>
    </MainView>
}