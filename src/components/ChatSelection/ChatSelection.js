import React from 'react'
import { Date, LastMessage, MainView, Name, TopView } from './Style'

export default function ChatSelection({ name, date, lastMessage, onPress }) {

    function handleDateFormat(dataString) {
        const data = new Date(dataString);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembre-se que os meses começam do zero
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    return <MainView onPress={onPress}>
        <TopView>
            <Name>{name}</Name>
            <Date>{date}</Date>
        </TopView>
        <LastMessage>{lastMessage}</LastMessage>
    </MainView>
}