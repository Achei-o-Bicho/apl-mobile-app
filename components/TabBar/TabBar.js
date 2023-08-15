import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPets from '../../MyPets/MyPets';
import Profile from '../../Profile/Profile';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const ActiveTintColor = "purple"
const IconSize = 32

export default function TabBar() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="MyPets"
                component={MyPets}
                options={() => ({
                    tabBarActiveTintColor: ActiveTintColor,
                    title: "Meus Pets",
                    tabBarIcon: ({ color }) => {
                        return <Ionicons name="paw" size={IconSize} color={color} />
                    }
                })}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={() => ({
                    tabBarActiveTintColor: ActiveTintColor,
                    title: "Perfil",
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome name="user" size={IconSize} color={color} />
                    }
                })}
            />
        </Tab.Navigator>
    );
}