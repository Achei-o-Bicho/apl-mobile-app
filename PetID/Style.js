import React from 'react';
import styled from 'styled-components';
import { Camera } from 'expo-camera';

export const MainView = styled.View`
    flex: 1;
    justify-content: center;
`

export const SafeArea = styled.SafeAreaView`
    flex: 1;
`

export const CameraPreview = styled(Camera)`
    flex: 1;
`

export const PermissionNotGarantedText = styled.Text`
`

export const RecentScannedList = styled.FlatList`

`