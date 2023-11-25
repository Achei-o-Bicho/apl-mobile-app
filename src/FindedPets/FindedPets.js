import React from 'react';
import { MainView } from './Style';
import { FlatList } from 'react-native';
import MyPetCard from '../components/MyPetCard/MyPetCard';
import { useUserContext } from '../contexts/UserContext';

export default function FindedPets({ navigation, route }) {
    const { results } = route.params;
    const { recentScannedPets, setRecentScannedPets } = useUserContext();

    return (
        <MainView>
            <FlatList
                style={{ marginTop: 40 }}
                data={results}
                renderItem={({ item }) => {
                    if (item && item.pet.images && item.pet.images[0] && item.pet.images[0].base64) {
                        return (
                            <MyPetCard
                                name={item.pet.name}
                                breed={item.pet.breed}
                                imagePreview={item.pet.images[0].base64}
                                description={item.pet.description}
                                onPress={() => {
                                    setRecentScannedPets((prev) => [...prev, item.pet]);
                                    navigation.navigate("MyPetInfo", { pet: item.pet, showChatButton: item.isOwner, owner: item.user });
                                }}
                            />
                        );
                    }
                }}
            />
        </MainView>
    )
}