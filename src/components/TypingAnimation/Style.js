import React from 'react'
import { Animated } from 'react-native';
import styled from "styled-components";

export const MainView = styled.View`
    flex: 1;
    flex-direction: row;
`

export const DotView = styled(Animated.View)`
    background-color: ${(props) => props.color};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 5px;
`