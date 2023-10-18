import React from 'react';
import styled from 'styled-components';

export const MainView = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
`

export const Button = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
`

export const RecognizerButton = styled(Button)`
    background-color: purple;
    border: 2px solid purple;
`

export const ButtonText = styled.Text`
    text-transform: uppercase;
    color: white;
    font-size: 16px;
    font-weight: 700;
`

export const ActivityIndicatorContainer = styled.View`
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    border-radius: 10px;
    padding: 20px;
    position: relative;
`