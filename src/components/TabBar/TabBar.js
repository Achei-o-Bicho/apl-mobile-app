import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPets from '../../MyPets/MyPets';
import Profile from '../../Profile/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useUserContext } from '../../contexts/UserContext';
import PetID from '../../PetID/PetID';
import PetIDIcon from '../PetIDIcon/PetIDIcon';

const Tab = createBottomTabNavigator();
const ActiveTintColor = "purple"
const IconSize = 32

export default function TabBar() {
    const { userName } = useUserContext();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="MyPets"
                component={MyPets}
                options={() => ({
                    title: "Meus Pets",
                    tabBarActiveTintColor: ActiveTintColor,
                    headerTintColor: ActiveTintColor,
                    tabBarIcon: ({ color }) => {
                        return <Ionicons name="paw" size={IconSize} color={color} />
                    }
                })}
            />
            <Tab.Screen
                name="PetID"
                component={PetID}
                options={() => ({
                    title: "Pet ID",
                    headerShown: false,
                    tabBarActiveTintColor: ActiveTintColor,
                    headerTintColor: ActiveTintColor,
                    tabBarIcon: ({ color }) => {
                        return <PetIDIcon color={color} viewBox="-44 -170 1000 1000" />
                    }
                })}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={() => ({
                    title: userName ? userName : "Perfil",
                    tabBarActiveTintColor: ActiveTintColor,
                    headerTintColor: ActiveTintColor,
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome name="user" size={IconSize} color={color} />
                    }
                })}
            />
        </Tab.Navigator>
    );
}