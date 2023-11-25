import React, { useEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView, TouchableOpacity, Keyboard, KeyboardEvent, Platform } from 'react-native';
import { AirPlaneButton, BottomView, CellText, ChatInput, MainView, ReceiverCell, SenderCell, TimeText } from './Style';
import { useUserContext } from '../../contexts/UserContext';

export default function ChatConversation({ navigation, route }) {
    const { chat, name, socket } = route.params;
    const [messages, setMessages] = useState(chat.messages);
    const [messageText, setMessageText] = useState();
    const { userId } = useUserContext();
    const scrollViewRef = useRef(null);

    // setMessages(rooms.filter((room) => room._id === chat._id)[0].messages)
    useEffect(() => {
        navigation.setOptions({ title: name });
        socket.connect();
        socket.on('get_all_messages', (rooms) => {
            if (rooms === typeof(Array)) {
                console.log(rooms.filter((room) => room._id === chat._id)[0].messages)
            }
        });
        scrollToBottom();

        return () => {
            socket.disconnect();
        };
    }, [])
    
    function handleSendSocketMessage(message) {
        socket.emit("send_message", {
            message: message,
            userIdReceiver: chat.idUserConversationPartner,
            room: {
                id: chat._id
            }
        }, (response) => setMessages(response.messages))
        setMessageText();
        scrollToBottom();
    }

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    return <MainView>
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            enabled
            keyboardVerticalOffset={Platform.OS == "ios" ? 92 : 90}
        >
            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-end'
                }}
                ref={scrollViewRef}
                data={messages}
                renderItem={({ item }) => {
                    if (item) {
                        if (item.user === userId) {
                            return <ReceiverCell>
                                <CellText>{item.message}</CellText>
                                <TimeText>{item.createdAt}</TimeText>
                            </ReceiverCell>
                        } else {
                            return <SenderCell>
                                <CellText>{item.message}</CellText>
                                <TimeText>{item.createdAt}</TimeText>
                            </SenderCell>
                        }
                    }
                }}
            />
            <BottomView>
                <ChatInput
                    value={messageText}
                    onChangeText={setMessageText}
                    placeholder="Digite aqui..."
                    placeholderTextColor="lightgray"
                />
                <TouchableOpacity
                    onPress={() => handleSendSocketMessage(messageText)}
                >
                    <AirPlaneButton source={require('../../assets/paperplane.circle.fill.png')} />
                </TouchableOpacity>
            </BottomView>
        </KeyboardAvoidingView>
    </MainView>
}