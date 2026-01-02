import { StyleSheet, SafeAreaView, StatusBar, View, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react'
import WeatherCard from "../Components/WeatherCard";
import AddButton from '../svg/HomePage/AddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Data: [],
            CityLatLonList: [],
        }
        const ApiKey = 'cdf2e240c90815b6955b29a9d976674e';

        GetCityLatLonList = async () => {
            try {
                await AsyncStorage.getItem('CityLatLonList').then((value) => {
                    if (value !== null) {
                        this.setState({
                            CityLatLonList: JSON.parse(value),
                        })
                    }
                })
                console.log("HomePage GetCityLatLonList Success");
                GetCityDegree();
            }
            catch (error) {
                console.log(error);
            }
        }

        GetCityDegree = async () => {
            if (this.state.CityLatLonList.length > 0) {
                for (let i = 0; i < this.state.CityLatLonList.length; i++) {
                    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.CityLatLonList[i].lat + '&lon=' + this.state.CityLatLonList[i].lon + '&appid=' + ApiKey + '&units=metric')
                        .then((response) => response.json())
                        .then((json) => {
                            this.setState({
                                Data: this.state.Data.concat(json),
                            })
                            console.log(json);
                        }
                        ).catch((error) => {
                            console.error(error);
                        })
                }
            }
        }

        this.componentDidMount = () => {
            GetCityLatLonList();
        }
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden={true} />
                <View>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        numColumns={2}
                        data={this.state.Data}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={() => {
                                console.log("xd");
                                this.props.navigation.navigate('WeatherPage', {
                                    city: item.name,
                                    lat: item.coord.lat,
                                    lon: item.coord.lon,
                                })
                            }
                            }>
                                <View style={{ flex: 1 }}>
                                    <WeatherCard
                                        CityName={item.name}
                                        Temp={item.main.temp}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <AddButton
                        onPress={() => {
                            this.props.navigation.push('AddPage')
                        }}
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            alignSelf: 'center',
                        }} />
                </View>
            </SafeAreaView >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});