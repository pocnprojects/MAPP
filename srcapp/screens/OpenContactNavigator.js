import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OpenContact from './OpenContact'



const Stack = createNativeStackNavigator()

export default function OpenContactNavigator({route:{params}}) {

    //  console.log("params from OpenContactNavigator", params);

      return (
        <Stack.Navigator>
             <Stack.Screen name="OpenContact" component={OpenContact} options={{headerShown:false}} initialParams={params}></Stack.Screen>
        </Stack.Navigator>
      )
}