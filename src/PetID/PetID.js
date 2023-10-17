import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, View, Text, Image } from 'react-native';
import { ActivityIndicatorContainer, ButtonText, MainView, RecognizerButton } from './Style';
import { apiGet, apiPost } from '../config/api';
import { useUserContext } from '../contexts/UserContext';
import { ActivityIndicator } from 'react-native';

export default function PetID() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraIsReady, setCameraIsReady] = useState(false);
    const [takePictureLoading, setTakePictureLoading] = useState(false);
    const cameraRef = useRef(null);
    const { accessToken, recognizing, setRecognizing, endToEnd, setEndToEnd } = useUserContext();

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <MainView
                style={{ alignItems: 'center' }}
            >
                <Text>Precisamos da sua permissão para mostrar a câmera</Text>
                <Button onPress={requestPermission} title="Permitir" />
            </MainView>
        );
    }

    const startRecognize = async (imagePath) => {
        const formData = new FormData();
        formData.append('image', {
            uri: imagePath,
            type: 'image/jpeg',
            name: `${Date.now().toString(36)}.jpg`
        });
        console.log(imagePath)
        try {
            const { endToEnd } = await apiPost(`/recognize`, formData, {
                "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
                "Authorization": `Bearer ${accessToken}`
            });
            setEndToEnd(endToEnd);
        } catch (error) {
            console.log(error);
        }
    }

    const verifyRecognize = async () => {
        const timeout = 180000;
        try {
            const response = await apiGet(`/recognize/${endToEnd}`);
            console.log(response);
            setEndToEnd(null);
        } catch {
            setTimeout(() => {
                verifyRecognize();
            }, timeout);
        }
    }

    async function handleSendPicture() {
        setRecognizing(true);
        setTakePictureLoading(true);
        if (cameraRef.current && cameraIsReady) {
            cameraRef.current.pausePreview();
            const { uri } = await cameraRef.current.takePictureAsync();
            setTakePictureLoading(false);
            await startRecognize(uri);
        }
    }

    return (
        <MainView>
            <Camera
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    padding: 20
                }}
                type={CameraType.back}
                ref={cameraRef}
                onCameraReady={() => setCameraIsReady(true)}
            >
                <View />
                {recognizing && (
                    <ActivityIndicatorContainer>
                        <ActivityIndicator
                            size='large'
                        />
                        <Image />
                        <Text style={{ color: 'white' }}>Procurando PET</Text>
                    </ActivityIndicatorContainer>
                )}
                <RecognizerButton
                    disabled={takePictureLoading}
                    onPress={() => recognizing ? setRecognizing(false) : handleSendPicture()}
                >
                    <ButtonText>
                        {recognizing ? 'Cancelar' : 'Procurar'}
                    </ButtonText>
                </RecognizerButton>
            </Camera>
        </MainView>
    );
}