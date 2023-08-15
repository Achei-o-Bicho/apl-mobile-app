import React from 'react';
import { AddNewPet, MainView, NewPetView, SubtitleNewPet, TitleNewPet, ContinueButton, TextContinue } from './Style';
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

export default function CreatePet() {
    const [name, setName] = React.useState("");
    const [birthday, setBirthday] = React.useState("");

    return (
        <MainView>
            <AddNewPet>
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

                    <ContinueButton>
                        <TextContinue>
                            Continuar
                        </TextContinue>
                    </ContinueButton>

                </NewPetView>
            </AddNewPet>
        </MainView>
    );
}