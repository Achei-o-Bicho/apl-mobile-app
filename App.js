import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './src/CreateAccount/CreateAccount';
import Home from './src/Home/Home';
import AboutUs from './src/AboutUs/AboutUs';
import HaveAccount from './src/HaveAccount/HaveAccount';
import LoginPassword from './src/LoginPassword/LoginPassword';
import InsideHome from './src/InsideHome/InsideHome';
import CreatePet from './src/CreatePet/CreatePet';
import MyPetInfo from './src/MyPetInfo/MyPetInfo';
import { UserProvider } from './src/contexts/UserContext';
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{
                title: "Abrir sua conta",
                headerBackTitle: "",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "purple"
                }
              }}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                  title: "Conheça a idéia",
                  headerBackTitle: "",
                  headerTintColor: "white",
                  headerStyle: {
                    backgroundColor: "purple"
                  }
                }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen
                name="HaveAccount"
                component={HaveAccount}
                options={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: "transparent"
                  }
                }}
              />
              <Stack.Screen
                name="LoginPassword"
                component={LoginPassword}
                options={{
                  headerShown: false,
                  contentStyle: {
                    backgroundColor: "transparent"
                  }
                }}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="InsideHome"
                component={InsideHome}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                  contentStyle: {
                    backgroundColor: "transparent"
                  }
                }}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="CreatePet"
                component={CreatePet}
                options={{
                  headerTintColor: "purple",
                  contentStyle: {
                    backgroundColor: "white"
                  }
                }}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name="MyPetInfo"
                component={MyPetInfo}
                options={{
                  headerTintColor: "purple",
                  title: "",
                  contentStyle: {
                    backgroundColor: "white"
                  }
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
          <StatusBar style="dark" />
        </NavigationContainer>
      </UserProvider>
    </RootSiblingParent>
  );
}