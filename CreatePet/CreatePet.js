import React from 'react';
import { AddNewPet, MainView, NewPetView, SubtitleNewPet, TitleNewPet, ContinueButton, TextContinue, GenderPet } from './Style';
import { TextInput, RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

export default function CreatePet() {
    const [step, setStep] = React.useState(0);
    const [name, setName] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState('male');
    const [description, setDescription] = React.useState('');

    const handleStep = (step) => {
        setStep(step);
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