import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './CreateAccount/CreateAccount';
import Home from './Home/Home';
import AboutUs from './AboutUs/AboutUs';
import HaveAccount from './HaveAccount/HaveAccount';
import LoginPassword from './LoginPassword/LoginPassword';
import InsideHome from './InsideHome/InsideHome';
import CreatePet from './CreatePet/CreatePet';
import MyPetInfo from './MyPetInfo/MyPetInfo';
import { UserProvider } from './contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </NavigationContainer>
    </UserProvider>
  );
}