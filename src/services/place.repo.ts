import AsyncStorage from "@react-native-async-storage/async-storage"

import { Place } from "../models"

const PLACE_REPO_KEY = 'place_repo_key'

async function persist(places: Place[]) {
    await AsyncStorage.setItem(PLACE_REPO_KEY, JSON.stringify(places))
}

export async function getList() {
    const json = await AsyncStorage.getItem(PLACE_REPO_KEY)
    if (json) {
        return JSON.parse(json) as Place[]
    }
    return []
}

export async function save(place: Place) {
    const places = await getList()

    const saved = places.find(p => p.latitude === place.latitude && p.longitude === place.longitude)
    if (saved) return false
    
    places.push(place)
    await persist(places)
    return true
}
