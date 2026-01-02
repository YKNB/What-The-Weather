import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import React, { Component } from 'react'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        const ApiKey = 'cdf2e240c90815b6955b29a9d976674e';
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden={true} />
                <View>

                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});