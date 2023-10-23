import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Button, View, Text, Image } from 'react-native';
import { ActivityIndicatorContainer, ButtonText, MainView, RecognizerButton } from './Style';
import { apiGet, apiPost } from '../config/api';
import { useUserContext } from '../contexts/UserContext';
import { ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

const verifyTimeout = 5000;

export default function PetID() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraIsReady, setCameraIsReady] = useState(false);
    const cameraRef = useRef(null);
    const { accessToken, recognizing, setRecognizing, endToEnd, setEndToEnd } = useUserContext();
    const [errorMessage, setErrorMessage] = useState(null);
    const [flashlightIsOn, setFlashlight] = useState(false);

    useEffect(() => {
        async function fetchVerifyRecognize() {
            await verifyRecognize(verifyTimeout);
        }
        if (recognizing) {
            if (endToEnd) {
                fetchVerifyRecognize();
            }
        } else {
            if (cameraRef.current) {
                cameraRef.current.resumePreview();
            }
        }
    }, [recognizing, endToEnd])

    useEffect(() => {
        setRecognizing(false);
        if (errorMessage) {
            Toast.show(errorMessage, {
                duration: 5000,
                position: Toast.positions.CENTER,
                backgroundColor: 'red',
                animation: true,
                hideOnPress: false,
                delay: 0,
                onHidden: () => {
                    setErrorMessage(null);
                }
            });
        }
    }, [errorMessage])

    const startRecognize = async (imagePath) => {
        const formData = new FormData();
        formData.append('image', {
            uri: imagePath,
            type: 'image/jpeg',
            name: `${Date.now().toString(36)}.jpg`
        });
        try {
            const { endToEnd } = await apiPost(`/recognize`, formData, {
                "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
                "Authorization": `Bearer ${accessToken}`
            });
            setEndToEnd(endToEnd);
        } catch (error) {
            console.log(error);
            setErrorMessage('Houve um problema e já estamos trabalhando nisso, tente novamente mais tarde.');
        }
    }

    const verifyRecognize = async (timeout) => {
        try {
            const { resultRecognator } = await apiGet(`/recognize/${endToEnd}`, {
                "Authorization": `Bearer ${accessToken}`
            });
            if (!resultRecognator) {
                setTimeout(async () => {
                    await verifyRecognize(timeout);
                }, timeout);
            } else {
                await finallyRecognize(resultRecognator);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const finallyRecognize = async (pet) => {
        Toast.show(pet, {
            duration: 5000,
            position: Toast.positions.CENTER,
            animation: true,
            hideOnPress: false,
            delay: 0
        });
        setRecognizing(false);
        setEndToEnd(null);
    }

    async function handleSendPicture() {
        setFlashlight(false);
        setRecognizing(true);
        if (cameraRef.current && cameraIsReady) {
            cameraRef.current.pausePreview();
            const { uri } = await cameraRef.current.takePictureAsync();
            await startRecognize(uri);
        }
    }

    if (permission === null || !permission.granted) {
        return (
            <MainView
                style={{ alignItems: 'center' }}
            >
                <Text>Precisamos da sua permissão para mostrar a câmera</Text>
                <Button onPress={requestPermission} title="Permitir" />
            </MainView>
        );
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
                flashMode={flashlightIsOn ? FlashMode.torch : FlashMode.off}
            >
                <MaterialCommunityIcons
                    name={flashlightIsOn ? 'flashlight-off' : 'flashlight'}
                    size={40}
                    color="white"
                    onPress={() => {
                        setFlashlight(!flashlightIsOn);
                    }}
                />
                {recognizing && (
                    <ActivityIndicatorContainer>
                        <ActivityIndicator
                            size='large'
                        />
                        <Text style={{ color: 'white' }}>Procurando PET</Text>
                    </ActivityIndicatorContainer>
                )}
                <RecognizerButton
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