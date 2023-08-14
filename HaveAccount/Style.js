import React from 'react';
import styled from 'styled-components';

export const MainView = styled.View`
    flex: 1;
    justify-content: flex-end;
`

export const TransparentView = styled.View`
    flex: 2;
`

export const ContentView = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: purple;
    padding: 20px;
`

export const Title = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 20px;
`

export const Input = styled.TextInput`
    margin-top: 20px;
`