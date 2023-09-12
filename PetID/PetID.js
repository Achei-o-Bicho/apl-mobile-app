import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { CameraPreview, MainView, PermissionNotGarantedText, RecentScannedList, SafeArea } from './Style';
import { useIsFocused } from '@react-navigation/native';

export default function App() {
    const isFocused = useIsFocused();
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <MainView>
                <PermissionNotGarantedText>Precisamos da sua permissão para mostrar a câmera</PermissionNotGarantedText>
                <Button onPress={requestPermission} title="Permitir" />
            </MainView>
        );
    }

    useEffect(() => {
        if (cameraRef.current) {
            isFocused ? cameraRef.current.resumePreview() : cameraRef.current.pausePreview();
        }
    }, [isFocused])

    return (
        <MainView>
            <SafeArea>
                <CameraPreview
                    ref={cameraRef}
                    type={CameraType.back}
                >
                    <RecentScannedList
                        
                    />
                </CameraPreview>
            </SafeArea>
        </MainView>
    );
}