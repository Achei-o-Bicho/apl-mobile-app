import React, { useEffect, useState } from 'react';
import { MainView, Separator } from './Style';
import { io } from 'socket.io-client';
import { useUserContext } from '../../contexts/UserContext';
import { FlatList } from 'react-native';
import ChatSelection from '../ChatSelection/ChatSelection';

export default function ChatList({ navigation }) {
    const [rooms, setRooms] = useState([]);
    const { accessToken } = useUserContext();
    const socket = io("http://3.229.11.208:8080/", {
        extraHeaders: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('get_all_rooms', (rooms) => setRooms(rooms));
        });

        return () => {
            socket.on('disconnect');
        };
    }, [socket])

    return <MainView>
        <FlatList
            data={rooms}
            renderItem={({ item }) => {
                if (item && item.sender && item.sender.name && item.messages && item.messages[item.messages.length - 1].message && item.messages[item.messages.length - 1].createdAt) {
                    return <>
                        <ChatSelection
                            name={item.sender.name}
                            lastMessage={item.messages[item.messages.length - 1].message}
                            date={item.messages[item.messages.length - 1].createdAt}
                            onPress={() => {
                                navigation.navigate("ChatConversation", { chat: item, name: item.sender.name, socket })
                            }}
                        />
                        <Separator />
                    </>
                }
            }}
        />
    </MainView>
}