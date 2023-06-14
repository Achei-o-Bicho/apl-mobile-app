import React from 'react';
import styled from 'styled-components';
import { Animated } from 'react-native';

export const BackgroundImage = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
`

export const SafeArea = styled.SafeAreaView`
    flex: 1;
    justify-content: space-between;
    align-items: center;
`

export const TopView = styled.View`
    margin-top: 15%;
`

export const LogoText = styled.Text`
    font-size: 30px;
    font-weight: 700;
`

export const BottomView = styled.View`
    width: 90%;
    justify-content: space-between;
    align-items: center;
`

export const Button = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 10px;
`

export const ButtonCreateAccount = styled(Button)`
    background-color: purple;
    border: 2px solid purple;
`

export const ButtonHaveAccount = styled(Button)`
    border: 2px solid white;
`

export const ButtonText = styled.Text`
    text-transform: uppercase;
    color: white;
    font-size: 16px;
    font-weight: 700;
`

export const HaveAccountButtonText = styled(ButtonText)`
    color: white;
`

export const AboutText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 16px;
    margin-top: 3px;
`

export const ChevronUp = styled(Animated.Image)`
    width: 20px;
    height: 12.4px;
`