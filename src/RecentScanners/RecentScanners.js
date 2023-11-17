import React from 'react';
import { MainView } from './Style';
import { FlatList } from 'react-native';
import MyPetCard from '../components/MyPetCard/MyPetCard';
import { useUserContext } from '../contexts/UserContext';

export default function RecentScanners({ navigation }) {
    const { recentScannedPets } = useUserContext();

    return (
        <MainView>
            <FlatList
                data={recentScannedPets}
                renderItem={({ result }) => {
                    if (result && result.pet.images && result.pet.images[0] && result.pet.images[0].base64) {
                        return (
                            <MyPetCard
                                name={result.pet.name}
                                breed={result.pet.breed}
                                imagePreview={result.pet.images[0].base64}
                                description={result.pet.description}
                                onPress={() => {
                                    navigation.navigate("MyPetInfo", { pet: result.pet });
                                }}
                            />
                        );
                    }
                }}
            />
        </MainView>
    )
}