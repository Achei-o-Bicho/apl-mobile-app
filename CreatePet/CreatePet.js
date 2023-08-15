import React from 'react';
import { AddNewPet, MainView, NewPetView, SubtitleNewPet, TitleNewPet, ContinueButton, TextContinue, GenderPet } from './Style';
import { TextInput, RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CreatePet() {
    const [step, setStep] = React.useState(0);
    const [name, setName] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState('male');
    const [description, setDescription] = React.useState('');
    const [imageUri, setImageUri] = React.useState(null);

    const handleStep = (step) => {
        setStep(step);
    };

    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!imageResult.canceled) {
            const formData = new FormData();
            formData.append('image', {
                uri: imageResult.assets[0].uri,
                type: 'image/jpeg',
                name: 'upload.jpg',
            });

            console.log(formData);

        }
    };

    return (
        <MainView>
            <AddNewPet>
                {step === 0 && (
                    <NewPetView>
                        <TitleNewPet>
                            Vamos começar com seu novo pet!
                        </TitleNewPet>
                        <SubtitleNewPet>
                            Informe o nome e data de nascimento do seu pet
                        </SubtitleNewPet>

                        <TextInput
                            label="Nome"
                            value={name}
                            onChangeText={text => setName(text)}
                            mode='outlined'
                            style={{ marginTop: 30 }}
                        />

                        <TextInput
                            label="Data de Nascimento"
                            mode='outlined'
                            style={{ marginTop: 20 }}
                            value={birthday}
                            render={props => (
                                <TextInputMask
                                    {...props}
                                    type="datetime"
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    onChangeText={text => setBirthday(text)}
                                    maxLength={10}
                                />
                            )}
                        />

                        <ContinueButton onPress={() => handleStep(1)}>
                            <TextContinue>
                                Continuar
                            </TextContinue>
                        </ContinueButton>
                    </NewPetView>
                )}

                {step === 1 && (
                    <NewPetView>
                        <TitleNewPet>
                            Informe o gênero do seu pet
                        </TitleNewPet>

                        <RadioButton.Group
                            onValueChange={value => setSelectedOption(value)}
                            value={selectedOption}
                        >

                            <GenderPet>
                                <RadioButton.Item label="Masculino" value="male" />
                            </GenderPet>

                            <GenderPet>
                                <RadioButton.Item label="Feminino" value="female" />
                            </GenderPet>
                        </RadioButton.Group>

                        <ContinueButton onPress={() => handleStep(2)}>
                            <TextContinue>
                                Continuar
                            </TextContinue>
                        </ContinueButton>
                    </NewPetView>
                )}

                {step === 2 && (
                    <NewPetView>
                        <TitleNewPet>
                            Dê uma descrição do seu pet
                        </TitleNewPet>

                        <TextInput
                            label="Descrição"
                            value={description}
                            onChangeText={text => setDescription(text)}
                            mode='outlined'
                            style={{ marginTop: 30, height: 120 }}
                        />

                        <ContinueButton onPress={() => handleStep(3)}>
                            <TextContinue>
                                Continuar
                            </TextContinue>
                        </ContinueButton>
                    </NewPetView>
                )}

                {step === 3 && (
                    <NewPetView>
                        <TitleNewPet>
                            Escolha até 4 fotos do seu pet
                        </TitleNewPet>

                        <Button title="Selecionar Imagem" onPress={handleImageUpload} />
                        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 500, height: 500 }} resizeMode="cover" />}

                        <ContinueButton onPress={() => handleStep(4)}>
                            <TextContinue>
                                Continuar
                            </TextContinue>
                        </ContinueButton>
                    </NewPetView>
                )}

            </AddNewPet>
        </MainView>
    );
}