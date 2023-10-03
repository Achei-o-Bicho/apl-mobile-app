import React from 'react';
import styled from 'styled-components';

export const MainView = styled.TouchableOpacity`
    margin-left: 25px;
    margin-right: 25px;
    margin-bottom: 25px;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
    align-items: center;
`

export const LeftView = styled.View`
    flex-direction: row;
    align-items: center;
    width: 75%;
`

export const TitleText = styled.Text`
    color: purple;
    font-size: 18px;
`

export const ImagePreview = styled.Image`
    background-color: lightgray;
    height: 50px;
    width: 50px;
    margin-right: 10px;
    border-radius: 5px;
`

export const ContentView = styled.View`
    justify-content: space-between;
`