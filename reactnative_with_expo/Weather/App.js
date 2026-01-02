import HomePage from './assets/Screens/HomePage';
import SearchAddPage from './assets/Screens/SearchAddPage';
import WeatherPage from './assets/Screens/WeatherPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="AddPage" component={SearchAddPage} />
                <Stack.Screen name="WeatherPage" component={WeatherPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;