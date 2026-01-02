import { Alert, Text, View, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ec35f8a347msh6ee98de6436e963p1a49d3jsn9533f1877ab9',
		'X-RapidAPI-Host': 'dark-sky.p.rapidapi.com'
	}
};

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(null);

    const loadForecast = async () => {
        setRefreshing(true);

        const {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert('Permission was denied');
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        let url = `https://dark-sky.p.rapidapi.com/${location.coords.latitude},${location.coords.longitude}?units=auto&lang=en`;

        const response = await fetch(url, options)
        .then(response => response.json())
	    .then(response => response)
	    // .catch(err => console.error(err));
        const data = response;
console.log(data)
        if(!response){
            Alert.alert('Error', 'Something went wrong');
        }else{
            setForecast(data);
        }
        setRefreshing(false);
    }

    useEffect(() => {
        loadForecast();
    }, []);

    if(!forecast){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    const current = forecast.currently;
    // console.log(current);
    let highest = 0 , lowest = 0;
    if(forecast){
        for(let i =0; i < forecast.hourly?.data.length; i++){
            if(Math.round(forecast.hourly.data[i].temperature) > highest){
                highest = Math.round(forecast.hourly.data[i].temperature);
            }
        }
    
        for(let i =0; i < forecast.hourly?.data.length; i++){
    
            if(Math.round(forecast.hourly.data[i].temperature) < lowest){
                lowest = Math.round(forecast.hourly.data[i].temperature);
            }
        }
    
    }

    return (
        <View style={styles.container}>
            <View style={{border:1, borderStyle: "solid", borderColor:'black', justifyContent: "center", }}>
                <View  style={{flexDirection: 'row', padding:7}}>
                    <View style={{ width: "15%"}}>
                        <View>
                            <Text style={{color:"#fff"}}>Search</Text>
                        </View>
                    </View>
                    <View style={{ width: "85%"}}>
                        <Text style={styles.title}>
                            Weather
                        </Text>
                    </View>
                </View>
                <View style={{alignItems: 'center', textAlign:'center', marginTop:5}}>
                    <Text style={{alignItems:'center', textAlign:'center', color:"#fff", fontSize: 35}}>
                    {forecast.timezone?.split('/')[1]}
                    </Text>
                    <View style={styles.current}>
                        {/* <Image 
                            style={styles.largeIcone}
                            source={{
                                uri: 'http://openweathermap.org/img/wn/cloudy@4x.png',
                            }}
                        /> */}
                        <Text style={{color:"#fff", fontSize: 100}}>
                            {Math.round(current?.temperature)}°
                        </Text>
                    </View>
                    <Text style={{alignItems:'center', textAlign:'center', color:"#fff", fontSize: 20}}>
                        {current?.summary}
                    </Text>
                    <View style={{alignItems: 'center', textAlign:'center', marginTop:5}}>
                    <Text style={{color:"#fff", fontSize: 20}}>
                        H: {highest}°  L: {lowest}°
                    </Text>
                </View>
                </View>
            </View>
            <ScrollView
                style={{padding:10}}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => loadForecast()} />
                }
            >
                <View style={{borderRadius:5, border:1, borderColor:"#fff", borderStyle:"solid", height: 77}}>
                    <View><Text style={{color:"#fff"}}>HOURLY</Text></View>
                            <FlatList 
                                horizontal
                                data={forecast.hourly?.data.slice(0,24)}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(hour) => {
                                let datetime = new Date(hour.item.time * 1000);
                                    return (
                                        <View styles={{marginTop:8,padding:6,justifyContent:"center", alignItems:"center", border:1, borderColor:"#fff", borderStyle:"solid", height:100}}>
                                            <Text style={{color: "#fff", textAlign: "center"}}>
                                                {datetime.toLocaleTimeString().replace(/:\d+:\d+ /, '')}
                                            </Text>
                                            <Text style={{color: "#fff", textAlign: "center"}}>
                                                {Math.round(hour.item.temperature)}°
                                            </Text>
                                        </View>
                                    )

                                }}
                            />
                            
                </View>

                <View style={{borderRadius:5, border:1, borderColor:"#fff", borderStyle:"solid", marginTop:10, marginBottom:10}}>
                    <View><Text style={{color:"#fff"}} >DAYS</Text></View>
                    <FlatList 
                                styles={{flexDirection:"row",width:"100%"}}
                                data={forecast.daily?.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={(day) => {
                                let date = new Date(day.item.time * 1000);
                                    return (
                                        <View styles={{flexDirection:"row",marginTop:8,padding:6, border:1, borderColor:"#fff", borderStyle:"solid", height:40}}>

                                            <View>
                                                <Text style={{color: "#fff" }}>
                                                    {date.toString().slice(0, 3)} {day.item.icon.replace('-',' ')} L: {Math.round(day.item.temperatureMin)}°  H: {Math.round(day.item.temperatureMax)}°
                                                </Text>
                                            </View>
                                        </View>
                                    )

                                }}
                            />
                </View>

                <View style={{ marginTop:10, marginBottom:10}}>
                        <View style={{flexDirection: 'row',  justifyContent: "space-between", marginBottom: 15}}>
                            <View style={{borderRadius:5, border:1, borderColor:"#fff", borderStyle:"solid", width:150, height:150}}>
                                <View><Text style={{color:"#fff"}} >HUMIDITY</Text></View>
                                <View style={{ alignContent: "center", alignItems:"center"}}>
                                    <Text style={{color:"#fff", fontSize: 50, textAlign: "center"}}>
                                        {current?.humidity * 100}%
                                    </Text>
                                </View>
                            </View>
                            <View style={{borderRadius:5, border:1, borderColor:"#fff", borderStyle:"solid", width:150, height:150}}>
                                <View><Text style={{color:"#fff"}} >PRESSURE</Text></View>
                                <View style={{ alignContent: "center", alignItems:"center"}}>
                                    <Text style={{color:"#fff", fontSize: 50, textAlign: "center"}}>
                                        {Math.round((current?.pressure/100)*100)/100}
                                    </Text>
                                    <Text style={{color:"#fff", fontSize: 30, textAlign: "center"}}>Pa</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: "space-between", marginBottom: 15}}>
                            <View style={{borderRadius:5, border:1, borderColor:"#fff", borderStyle:"solid", width:150, height:150}}>
                                <View><Text style={{color:"#fff"}} >WINDY</Text></View>
                                <View style={{ alignContent: "center", alignItems:"center"}}>
                                    <Text style={{color:"#fff", fontSize: 50, textAlign: "center"}}>
                                        {Math.round(current?.windGust)}
                                    </Text>
                                    <Text style={{color:"#fff", fontSize: 30, textAlign: "center"}}>mph</Text>
                                </View>
                            </View>
                            <View style={{borderRadius:5, border:1, borderColor:"#fff", borderStyle:"solid", width:150, height:150}}>
                                <View><Text style={{color:"#fff"}} >FEELS LIKE</Text></View>
                                <View style={{ alignContent: "center", alignItems:"center"}}>
                                    <Text style={{color:"#fff", fontSize: 50, textAlign: "center"}}>
                                    {Math.round(current?.apparentTemperature)}°
                                    </Text>
                                </View>
                            </View>
                        </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Weather

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 50
    },
    title: {
        textAlign: 'center',
        fontSize:15,
        fontWeight:'bold',
        color: '#fff'
    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    largeIcone: {
        width:300,
        height:250
    },
})
