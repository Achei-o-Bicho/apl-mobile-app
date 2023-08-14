import React, { useState } from 'react';
import { ContentView, Input, MainView, Title, TransparentView } from './Style';

export default function HaveAccount() {
    return (
        <MainView>
            <TransparentView />
            <ContentView
                behavior="padding"
                enabled
            >
                <Title>
                    Digite seu CPF
                </Title>
                <Input
                    autoFocus
                />
            </ContentView>
        </MainView>
    );
}