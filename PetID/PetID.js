import { Camera, CameraPermissionStatus, useCameraDevice } from 'react-native-vision-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { CameraPreview, MainView, PermissionNotGarantedText, RecentScannedList, SafeArea } from './Style';
import { useIsFocused } from '@react-navigation/native';

export default function PetID() {
    const isFocused = useIsFocused();
    const [permission, setPermission] = useState();
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

    async function requestPermission() {
        const newCameraPermission = await Camera.requestCameraPermission();
        setPermission(newCameraPermission);
    }

    useEffect(() => {
        requestPermission();
        if (cameraRef.current) {
            isFocused ? cameraRef.current.resumePreview() : cameraRef.current.pausePreview();
        }
    }, [isFocused])

    return (
        <MainView>
            <SafeArea>
                <CameraPreview
                    ref={cameraRef}
                    device={useCameraDevice()} 
                >
                    <RecentScannedList
                        
                    />
                </CameraPreview>
            </SafeArea>
        </MainView>
    );
}