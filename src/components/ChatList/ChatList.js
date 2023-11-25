import React, { useEffect, useState } from 'react';
import { MainView, Separator } from './Style';
import { io } from 'socket.io-client';
import { useUserContext } from '../../contexts/UserContext';
import { FlatList } from 'react-native';
import ChatSelection from '../ChatSelection/ChatSelection';

export default function ChatList({ navigation }) {
    const [rooms, setRooms] = useState([]);
    const { accessToken, userId } = useUserContext();
    const socket = io("http://3.229.11.208:8080/", {
        autoConnect: false,
        extraHeaders: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    useEffect(() => {
        socket.connect();
        socket.on('get_all_messages', (rooms) => setRooms(rooms));

        return () => {
            socket.disconnect();
        };
    }, [])

    return <MainView>
        <FlatList
            data={rooms}
            renderItem={({ item }) => {
                const nameUserConversationPartner = item.receiver._id === userId ? item.sender.name : item.receiver.name
                if (item && item.sender && item.sender.name && item.messages && item.messages[item.messages.length - 1].message && item.messages[item.messages.length - 1].createdAt) {
                    return <>
                        <ChatSelection
                            name={nameUserConversationPartner}
                            lastMessage={item.messages[item.messages.length - 1].message}
                            date={item.messages[item.messages.length - 1].createdAt}
                            onPress={() => {
                                navigation.navigate("ChatConversation", { chat: item, name: nameUserConversationPartner, socket })
                            }}
                        />
                        <Separator />
                    </>
                }
            }}
        />
    </MainView>
}