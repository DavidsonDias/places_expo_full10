import React from 'react'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { LatLng } from 'react-native-maps'

import * as placeRepo from '../services/place.repo'
import { Place } from '../models'

export default function PlacePage() {
    
    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()
    const coors = route.params as LatLng

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    function savePlace() {
        const place = {
            name, description,
            latitude: coors.latitude,
            longitude: coors.longitude,
        } as Place

        placeRepo.save(place).then(saved => {
            if (saved) navigation.goBack()
            else Alert.alert('Local já salvo anteriormente!')
        })
    }

    return (
        <View style={styles.container}>
            <Text>Latitude: {coors.latitude}</Text>
            <Text>Longitude: {coors.longitude}</Text>

            <View style={styles.main}>
                <Text>Nome:</Text>
                <TextInput style={styles.input} onChangeText={setName} />

                <Text>Descrição:</Text>
                <TextInput style={styles.input} onChangeText={setDescription} />
            </View>

            <View style={styles.buttonView}>
                <Button title="Salvar" onPress={savePlace} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    main: {
        padding: 30,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        borderColor: '#999',
    },
    buttonView: {
        marginLeft: 50,
        marginRight: 50,
    },
})