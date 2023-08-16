import React, { useState } from 'react';
import { MainView, TransparentView, ContentView, TitleView, Title, Input, EnterButton, ButtonText } from './Style';
import { ActivityIndicator } from 'react-native';
import { useInputContext } from '../../CreatePet/CreatePet';

export default function ModalInput({ navigation, route }) {
    const { name, setName } = useInputContext();

    return (
        <MainView>
            <TransparentView
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <ContentView
                behavior="padding"
                enabled
            >
                <TitleView>
                    <Title>{route.params.title}</Title>
                    {/* <ActivityIndicator
                        animating={loading}
                        hidesWhenStopped
                        size='small'
                        color='white'
                    /> */}
                </TitleView>
                <Input
                    secureTextEntry
                    autoFocus
                    clearButtonMode='while-editing'
                    enterKeyHint='enter'
                    value={name}
                    onChangeText={setName}
                />
                <EnterButton
                    disabled={name === ''}
                    onPress={() => {
                    }}
                >
                    <ButtonText>Entrar</ButtonText>
                </EnterButton>
            </ContentView>
        </MainView>
    );
}