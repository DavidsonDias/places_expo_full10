import React from 'react'
import MapView, { LongPressEvent } from 'react-native-maps'
import { Alert, StyleSheet, View } from 'react-native'
import {
    getCurrentPositionAsync,
    LocationObject,
    requestForegroundPermissionsAsync
} from 'expo-location'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export default function App() {

    const navigation = useNavigation<NavigationProp<any>>()

    const [location, setLocation] = React.useState<LocationObject | undefined>(undefined)

    React.useEffect(() => {
        requestForegroundPermissionsAsync().then(result => {
            if (result.status === 'granted') {
                getCurrentPositionAsync({}).then(myLocation => {
                    setLocation(myLocation)
                })
            } else {
                Alert.alert('Permission to access location was denied')
            }
        })
    }, [])

    function goToPlace(event: LongPressEvent) {
        navigation.navigate('Place', event.nativeEvent.coordinate)
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                zoomControlEnabled={true}
                camera={location && {
                    center: location.coords,
                    heading: 0, pitch: 0, zoom: 15,
                }}
                onLongPress={goToPlace}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
