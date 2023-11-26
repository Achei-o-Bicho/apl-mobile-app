import React, { useEffect, useState } from 'react';
import { MainView, Separator } from './Style';
import { useUserContext } from '../../contexts/UserContext';
import { ActivityIndicator, FlatList } from 'react-native';
import ChatSelection from '../ChatSelection/ChatSelection';

export default function ChatList({ navigation }) {
    const [rooms, setRooms] = useState([]);
    const { userId, socket } = useUserContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        socket.connect();
        socket.on('get_all_messages', (rooms) => {
            setIsLoading(false);
            setRooms(rooms);
        });
    }, [])

    function formatDate(date) {
        let dateObject = new Date(date);
        var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        var newDate = dateObject.toLocaleDateString('pt-BR', options);
        return newDate;
    }

    return <MainView>
        {isLoading ? <ActivityIndicator style={{ flex: 1 }} size="large" /> : (
            <FlatList
                data={rooms}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item, index }) => {
                    const nameUserConversationPartner = item.receiver._id === userId ? item.sender.name : item.receiver.name
                    if (item && item.sender && item.sender.name && item.messages && item.messages[item.messages.length - 1].message && item.messages[item.messages.length - 1].createdAt) {
                        return <ChatSelection
                            key={index}
                            name={nameUserConversationPartner}
                            lastMessage={item.messages[item.messages.length - 1].message}
                            date={formatDate(item.messages[item.messages.length - 1].createdAt)}
                            onPress={() => {
                                navigation.navigate("ChatConversation", { chat: item, name: nameUserConversationPartner })
                            }}
                        />
                    }
                }}
            />
        )}
    </MainView>
}