import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from './CreateAccount/CreateAccount';
import Home from './Home/Home';
import AboutUs from './AboutUs/AboutUs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}