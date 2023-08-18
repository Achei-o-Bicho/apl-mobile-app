import React, { createContext, useContext, useState, useLayoutEffect, useEffect, useRef } from 'react';
import { AddNewPet, MainView, NewPetView, TitleNewPet, ContinueButton, TextContinue, GenderView, GenderPet, InputsView, StepView, ImagesView, ImagePet, ImagePetButton, PlusIcon } from './Style';
import { TextInput, RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { Text, View, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BackButton from '../components/BackButton/BackButton';
import * as Animatable from 'react-native-animatable';
import { apiPost } from '../config/api';
import { useUserContext } from '../contexts/UserContext';
import fs from 'fs';
AnimatableTitleNewPet = Animatable.createAnimatableComponent(TitleNewPet);
AnimatablePlusIcon = Animatable.createAnimatableComponent(PlusIcon);

const InputContext = createContext();

export const useInputContext = () => {
    return useContext(InputContext);
};

export default function CreatePet({ navigation }) {
    const [startForm, setStartForm] = useState(false);
    const [titlePage, setTitlePage] = useState("");
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [birthday, setBirthday] = useState('');
    const [birthdayError, setBirthdayError] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [frontalImage, setFrontalImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [leftImage, setLeftImage] = useState(null);
    const [rightImage, setRightImage] = useState(null);
    const [titlePageHeight, setTitlePageHeight] = useState(0);
    const [loading, setLoading] = useState(false);
    const refScroll = useRef(null);

    const { userId } = useUserContext();

    const submitCreatePet = () => {
        if (nameError || birthdayError) {
            return refScroll.current.scrollTo({ x: 0, y: 0, animated: true });
        }

        setLoading(true);

        const req = {
            name: name,
            gender: selectedOption,
            birthday: birthday,
            userId: userId
        };

        apiPost('pets', req)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    };  

    const submitSendImage = (imagePath) => {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));

        apiPost(`pets/${userId}/save-image/`, formData)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const inputs = [
        [
            <TextInput
                label="Nome"
                mode='outlined'
                value={name}
                returnKeyType='next'
                autoFocus
                error={nameError}
                onChangeText={(text) => {
                    setNameError(false);
                    setName(text);
                }}
                style={{ marginBottom: 0 }}
                onBlur={() => {
                    setNameError(name === '');
                }}
            />,
            <TextInput
                label="Data de Nascimento"
                mode='outlined'
                value={birthday}
                returnKeyType='next'
                error={birthdayError}
                render={props => (
                    <TextInputMask
                        {...props}
                        type="datetime"
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        onChangeText={text => {
                            setBirthdayError(false);
                            setBirthday(text);
                        }}
                        maxLength={10}
                    />
                )}
                onBlur={(_) => {
                    setBirthdayError(birthday === '');
                    if (!nameError && !birthdayError) {
                        handleStep(1);
                    }
                }}
            />
        ], [
            <RadioButton.Group
                onValueChange={value => {
                    setSelectedOption(value);
                    handleStep(2);
                }}
                value={selectedOption}
            >
                <GenderView>
                    <GenderPet
                        style={{ marginRight: 10 }}
                    >
                        <RadioButton.Item
                            label="Macho"
                            value="male"
                        />
                    </GenderPet>
                    <GenderPet>
                        <RadioButton.Item
                            label="Fêmea"
                            value="female"
                        />
                    </GenderPet>
                </GenderView>
            </RadioButton.Group>
        ], [
            <TextInput
                label="Descrição"
                mode='outlined'
                multiline
                value={description}
                returnKeyType='next'
                onChangeText={text => setDescription(text)}
                onBlur={(_) => handleStep(3)}
                style={{ height: 100 }}
            />
        ], [
            <ImagesView>
                <View
                    style={{ marginBottom: 20 }}
                >
                    <ImagePetButton
                        onPress={() => handleImageUpload("frontal")}
                        style={{ marginBottom: 20 }}
                    >
                        <AnimatablePlusIcon
                            hasImage={frontalImage}
                            name="pluscircle"
                            size={24}
                            color="purple"
                        />
                        <ImagePet
                            source={
                                frontalImage === null ?
                                    require('../assets/CreatePetIndicator/frontal.png')
                                    : { uri: frontalImage }
                            }
                            resizeMode="cover"
                        />
                    </ImagePetButton>
                    <ImagePetButton
                        onPress={() => handleImageUpload("right")}
                    >
                        <AnimatablePlusIcon
                            hasImage={rightImage}
                            name="pluscircle"
                            size={24}
                            color="purple"
                        />
                        <ImagePet
                            source={
                                rightImage === null ?
                                    require('../assets/CreatePetIndicator/right.png')
                                    : { uri: rightImage }
                            }
                            resizeMode="cover"
                        />
                    </ImagePetButton>
                </View>
                <View
                    style={{ marginLeft: 20 }}
                >
                    <ImagePetButton
                        onPress={() => handleImageUpload("profile")}
                        style={{ marginBottom: 20 }}
                    >
                        <AnimatablePlusIcon
                            hasImage={profileImage}
                            name="pluscircle"
                            size={24}
                            color="purple"
                        />
                        <ImagePet
                            source={
                                profileImage === null ?
                                    require('../assets/CreatePetIndicator/profile.png')
                                    : { uri: profileImage }
                            }
                            resizeMode="cover"
                        />
                    </ImagePetButton>
                    <ImagePetButton
                        onPress={() => handleImageUpload("left")}
                    >
                        <AnimatablePlusIcon
                            hasImage={leftImage}
                            name="pluscircle"
                            size={24}
                            color="purple"
                        />
                        <ImagePet
                            source={
                                leftImage === null ?
                                    require('../assets/CreatePetIndicator/left.png')
                                    : { uri: leftImage }
                            }
                            resizeMode="cover"
                        />
                    </ImagePetButton>
                </View>
            </ImagesView>
        ]
    ]

    const handleStep = (step) => {
        setStep(step);
    };

    const handleScrollToEnd = () => {
        if (refScroll.current) {
            refScroll.current.scrollToEnd({ animated: true });
        }
    };

    const handleImageUpload = async (position) => {
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
            const imageURI = imageResult.assets[0].uri
            submitSendImage(imageURI);
            switch (position) {
                case "frontal":
                    return setFrontalImage(imageURI);
                case "left":
                    return setLeftImage(imageURI);
                case "profile":
                    return setProfileImage(imageURI);
                case "right":
                    return setRightImage(imageURI);
                default:
                    return alert("Ocorreu um erro, tente novamente");
            }
        }
    };

    const handleStepInput = (step) => {
        return inputs[step]
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: titlePage,
            headerLeft: (() => (
                <BackButton navigation={navigation} />
            ))
        });
    }, [titlePage]);

    useEffect(() => {
        setTimeout(() => {
            setStartForm(true);
        }, 1500)
    }, [])

    useEffect(() => {
        if (
            frontalImage != null &&
            profileImage != null &&
            leftImage != null &&
            rightImage != null
        ) {
            handleStep(4);
        }
    }, [frontalImage, profileImage, leftImage, rightImage])

    return (
        <MainView
            behavior="height"
            enabled
        >
            <AddNewPet
                automaticallyAdjustKeyboardInsets
                contentContainerStyle={{ paddingBottom: 100 }}
                ref={refScroll}
                scrollEventThrottle={16}
                onContentSizeChange={() => handleScrollToEnd()}
                onScroll={(event) => {
                    const { contentOffset } = event.nativeEvent;
                    const limit = contentOffset.y > (titlePageHeight + (titlePageHeight * 0.8));
                    setTitlePage(limit ? "Vamos começar com o seu novo PET!" : "");
                }}
            >
                <AnimatableTitleNewPet
                    animation="fadeInUpBig"
                    onLayout={({ nativeEvent }) => setTitlePageHeight(nativeEvent.layout.height)}
                >
                    Vamos começar com seu novo PET!
                </AnimatableTitleNewPet>
                {startForm && (
                    <Animatable.View
                        animation="fadeInUpBig"
                    >
                        <Text>
                            Informe o nome e data de nascimento do seu PET
                        </Text>
                        <InputsView>
                            {handleStepInput(0).map((input, index) => {
                                return <StepView key={index}>{input}</StepView>;
                            })}
                        </InputsView>
                    </Animatable.View>
                )}

                {step >= 1 && (
                    <Animatable.View
                        animation="fadeInUpBig"
                    >
                        <Text>
                            Precisamos saber o gênero do seu PET
                        </Text>
                        <InputsView>
                            {handleStepInput(1).map((input, index) => {
                                return <StepView key={index}>{input}</StepView>;
                            })}
                        </InputsView>
                    </Animatable.View>
                )}

                {step >= 2 && (
                    <Animatable.View
                        animation="fadeInUpBig"
                    >
                        <Text>
                            Uma breve descrição sobre seu PET
                        </Text>
                        <InputsView>
                            {handleStepInput(2).map((input, index) => {
                                return <StepView key={index}>{input}</StepView>;
                            })}
                        </InputsView>
                        {step === 2 && (
                            <ContinueButton onPress={() => handleStep(3)}>
                                <TextContinue>Pular</TextContinue>
                            </ContinueButton>
                        )}
                    </Animatable.View>
                )}

                {step >= 3 && (
                    <Animatable.View
                        animation="fadeInUpBig"
                    >
                        <Text>
                            Tire fotos do seu PET seguindo o padrão do desenho
                        </Text>
                        <InputsView>
                            {handleStepInput(3).map((input, index) => {
                                return <StepView key={index}>{input}</StepView>;
                            })}
                        </InputsView>
                    </Animatable.View>
                )}

                {step === 4 && (
                    <ContinueButton
                        disabled={loading}
                        onPress={submitCreatePet}>
                        {loading && (
                            <ActivityIndicator
                                animating={loading}
                                hidesWhenStopped
                                size='small'
                                color='white'
                                style={{ position: 'absolute', right: 20 }}
                            />
                        )}
                        <TextContinue>Cadastrar</TextContinue>
                    </ContinueButton>
                )}

            </AddNewPet>
        </MainView >
    );
}