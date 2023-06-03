import React from 'react'
import AppNavigator from './srcapp/AppNavigator'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

// import RecycleTestComponent from './srcapp/screens/RecycleTestComponent'
// import RecycleTest from './srcapp/screens/RecycleTest'

export default function App() {

  const Stack = createNativeStackNavigator()

  return (
        // <NavigationContainer>
        //   <Stack.Navigator initialRouteName="DefineDefaultRecord">
        //     <Stack.Screen name="Define" component={DefineDefaultRecord}/>
        //     <Stack.Screen name="Second" component={SecondScreen}/>
        //   </Stack.Navigator>
        // </NavigationContainer>
          <AppNavigator/>
        //<RecycleTestComponent />
        //<RecycleTest/>
      )
}
