import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MapPage from './srcc/pages/Map'
import PlacePage from './srcc/pages/Place'

const Stack = createNativeStackNavigator()

function ListStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Map" component={MapPage} options={{ headerShown: false }} />
        <Stack.Screen name="Place" component={PlacePage} options={{ title: 'Novo Local' }} />
      </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={MapPage} options={{ headerShown: false }} />
        <Stack.Screen name="Place" component={PlacePage} options={{ title: 'Novo Local' }} />
        <Stack.Screen name="List" component={ListStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
