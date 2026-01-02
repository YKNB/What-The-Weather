import React from 'react';
import styles from "./styles";
import SearchCityBackground from "../../../assets/svg/SearchPage/SearchCityBackground";


import { Text, View } from 'react-native';

const MyComponent = (props) => {
    const { CityName, CountryName } = props;
    return (
        <View style={styles.Container}>
            <SearchCityBackground style={styles.SearchCityBackground}>
            </SearchCityBackground>
            <View>
                <Text style={styles.CityName}>{CityName}, {CountryName}</Text>
            </View>
        </View>
    );
};

export default MyComponent;