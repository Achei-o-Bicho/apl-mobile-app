import React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, View, Text } from 'react-native';
import { MainView } from './Style';

export default function PetID() {
    const [permission, requestPermission] = Camera.useCameraPermissions();

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

    return (
        <MainView>
            <Camera
                style={{ flex: 1 }}
                type={CameraType.back}
            />
        </MainView>
    );
}