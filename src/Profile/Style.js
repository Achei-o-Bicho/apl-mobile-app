import React from 'react';
import styled from 'styled-components';

export const MainView = styled.View`
    padding: 25px;
`

export const ExitButton = styled.TouchableOpacity`
    margin-top: 25px;
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px; 
    background-color: red;
`

export const ExitText = styled.Text`
    text-transform: uppercase;
    color: white;
    font-size: 16px;
    font-weight: 700;
`