import { Camera, CameraType } from 'expo-camera';
import { Button, View } from 'react-native';
import { CameraPreview, MainView, PermissionNotGarantedText } from './Style';

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
                <PermissionNotGarantedText>Precisamos da sua permissão para mostrar a câmera</PermissionNotGarantedText>
                <Button onPress={requestPermission} title="Permitir" />
            </MainView>
        );
    }

    return (
        <MainView>
            <CameraPreview
                type={CameraType.back}
            />
        </MainView>
    );
}