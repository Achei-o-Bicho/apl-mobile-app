import React from 'react';
import styled from 'styled-components';

export const MainView = styled.ScrollView`
    flex: 1;
`

export const ImagesView = styled.View`
    justify-content: center;
    background-color: purple;
`

export const ImagePet = styled.Image`
    background-color: lightgray;
    ${({ width }) => `
    width: ${width}px;
    height: ${width * 0.8}px;
    `}
`

export const ValuesView = styled.View`
    padding: 25px;
`

export const ValuePet = styled.Text`
    margin-bottom: 20px;
    font-size: 20px;
    color: purple;
`