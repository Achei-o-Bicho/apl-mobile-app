import React from 'react'
import { Date, LastMessage, MainView, Name, TopView } from './Style'

export default function ChatSelection({ name, date, lastMessage, onPress }) {

    return <MainView onPress={onPress}>
        <TopView>
            <Name>{name}</Name>
            <Date>{date}</Date>
        </TopView>
        <LastMessage>{lastMessage}</LastMessage>
    </MainView>
}