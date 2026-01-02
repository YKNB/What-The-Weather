import { Text, View } from 'react-native';
import WeatherBackground from '../../svg/WeatherCard/WeatherBackground.svg';
import WiCloudyVector from '../../svg/WeatherCard/WiCloudyVector.svg';

import styles from './styles';
import { useFonts } from "expo-font";

const WeatherCard = (props) => {
    const { Icon, CityName, Temp } = props;
    const [loaded] = useFonts({
        SairaSemiBold: require('../../fonts/Saira/Saira-SemiBold.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <View style={styles.Container}>
            <WeatherBackground style={styles.WeatherBackground} />
            <View style={styles.Content}>
                <WiCloudyVector fill={'#F5F5F4'} width="70" height="70" />
                <Text style={styles.CityName}>{CityName}</Text>
                <Text style={styles.Temp}>{Temp}°</Text>
            </View>
        </View>
    );
};

export default WeatherCard;
