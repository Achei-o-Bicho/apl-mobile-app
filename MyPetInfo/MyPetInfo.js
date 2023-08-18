import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton/BackButton';
import { ImagePet, ImagesView, MainView, ValuePet, ValuesView } from './Style';
import { View, Text, Dimensions } from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';


export default function MyPetInfo({ navigation, route }) {
    const { width } = Dimensions.get('window');
    const { name, imagePreview, breed, gender, description } = route.params;
    const [images, setImages] = useState([{ uri: imagePreview }]);

    useEffect(() => {
        navigation.setOptions({
            title: name,
            headerLeft: (() => (
                <BackButton navigation={navigation} />
            ))
        });
    }, [])

    return (
        <MainView>
            <ImagesView>
                <Carousel
                    pagination={PaginationLight}
                    data={images}
                    renderItem={(item, index) => (
                        <ImagePet
                            key={index}
                            width={width}
                            source={{ uri: item.uri }}
                        />
                    )}
                />
            </ImagesView>
            <ValuesView>
                <View
                    style={{ flexDirection: 'row', flex: 1 }}
                >
                    <View
                        style={{ flex: 1 }}
                    >
                        <Text>Nome:</Text>
                        <ValuePet>{name}</ValuePet>
                    </View>
                    <View
                        style={{ flex: 1 }}
                    >
                        <Text>Gênero:</Text>
                        <ValuePet>{gender === "Male" ? "Macho" : "Fêmea"}</ValuePet>
                    </View>
                </View>
                {breed && (
                    <>
                        <Text>Raça:</Text>
                        <ValuePet>{breed}</ValuePet>
                    </>
                )}
                {description && (
                    <View>
                        <Text>Descrição:</Text>
                        <ValuePet>{description}</ValuePet>
                    </View>
                )}
            </ValuesView>
        </MainView>
    );
}