import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    WeatherBackground: {
        position: 'absolute',
    },
    Content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CityName: {
        fontFamily: 'SairaSemiBold',
        fontSize: 20,
        color: '#fff',
    },
    Temp: {
        fontFamily: 'SairaSemiBold',
        fontSize: 25,
        color: '#fff',
    },
})

export default styles;