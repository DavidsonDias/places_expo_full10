import React from 'react'
import MapView from 'react-native-maps'
import { Alert, StyleSheet, View } from 'react-native'
import {
    getCurrentPositionAsync,
    LocationObject,
    requestForegroundPermissionsAsync
} from 'expo-location'

export default function App() {

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
                onLongPress={(event) => Alert.alert('Aqui')}
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
