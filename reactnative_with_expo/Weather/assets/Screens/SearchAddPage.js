import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import React, { Component } from 'react';
import SearchCard from '../Components/SearchCard';
import BackButton from "../svg/SearchPage/Back";
import Plus from "../svg/SearchPage/Plus";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SearchAddPageClass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            apiData: [],
            CityLatLonList: [],
        }

        const ApiKey = 'cdf2e240c90815b6955b29a9d976674e';

        SearchCity = async (text) => {
            if (text.length > 2) {
                fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + text + '&limit=5&appid=' + ApiKey)
                    .then((response) => response.json())
                    .then((json) => {
                        /*let deleted = false;
                        for (let i = 0; i < json.length; i++) {
                            if (deleted == true) {
                                i--;
                            }
                            if (json[i + 1] != undefined) {
                                if (json[i].name == json[i + 1].name) {
                                    json.splice(i + 1, 1);
                                    deleted = true;
                                }
                                else {
                                    deleted = false;
                                }
                            }
                        }*/
                        // if city names are equal delete the city from the list
                        json = json.filter(function (item, pos) {
                            return json.map(function (mapItem) { return mapItem.name; }).indexOf(item.name) === pos;
                        });
                        this.setState({
                            apiData: json,
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            if (text.length <= 2) {
                this.setState({
                    apiData: [],
                })
            }
        };

        GetCityLatLonList = async () => {
            try {
                await AsyncStorage.getItem('CityLatLonList').then((value) => {
                    if (value !== null) {
                        this.setState({
                            CityLatLonList: JSON.parse(value),
                        })
                    }
                })
                console.log("SearchAddPage GetCityLatLonList Success");
            } catch (error) {
                console.log(error);
            }
        }

        SaveCityLatLonList = async () => {
            try {
                await AsyncStorage.setItem('CityLatLonList', JSON.stringify(this.state.CityLatLonList));
                console.log("SearchAddPage SaveCityLatLonList Success");
            }
            catch (error) {
                console.log(error);
            }
        }

        this.componentDidMount = () => {
            GetCityLatLonList();
        }
    }


    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.TopContainer}>
                    <View style={styles.BackButton}>
                        <BackButton
                            width={33}
                            height={33}
                            onPress={() => this.props.navigation.push('Home')}
                        />
                    </View>
                    <View style={styles.SearchBorderContainer}>
                        <TextInput
                            style={styles.SearchInput}
                            placeholder="Search"
                            placeholderTextColor="#57534E"
                            onChangeText={(text) => { SearchCity(text) }}
                        />
                    </View>
                </View>
                <View style={styles.CityList}>
                    <FlatList
                        keyboardShouldPersistTaps='handled'
                        data={this.state.apiData}
                        renderItem={({ item }) =>
                            <View style={{ height: 58 }}>
                                <SearchCard
                                    CityName={item.name}
                                    CountryName={item.country}
                                />
                                <View style={styles.Plus}>
                                    <Plus onPress={
                                        () => {
                                            this.state.CityLatLonList.push({ lat: item.lat, lon: item.lon, CityName: item.name });
                                            SaveCityLatLonList();
                                            this.props.navigation.push('Home')
                                        }
                                    } />
                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    SearchBorderContainer: {
        flex: 1,
        alignItems: 'center',
    },
    SearchInput: {
        width: '73%',
        height: 40,
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#57534E',
        borderRadius: 10,
        textAlign: 'center',
        color: '#57534E',
        alignSelf: 'center',
    },
    BackButton: {
        position: 'absolute',
        marginLeft: 10,
        alignSelf: 'center',
    },
    TopContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    CityList: {
        flex: 1,
        marginTop: 10,
    },
    Plus: {
        position: 'absolute',
        right: 40,
        bottom: 15,
    },
})