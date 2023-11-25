import React, { useEffect } from 'react'
import { Date, LastMessage, MainView, Name, TopView } from './Style'

export default function ChatSelection({ name, date, lastMessage, onPress }) {

    useEffect(() => {
        console.log(date)
    }, [])

    function formatDate(date) {
        let dateObject = new Date(date);
        var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        var newDate = dateObject.toLocaleDateString('pt-BR', options);
        return newDate;
    }

    return <MainView onPress={onPress}>
        <TopView>
            <Name>{name}</Name>
            <Date>{date}</Date>
        </TopView>
        <LastMessage>{lastMessage}</LastMessage>
    </MainView>
}