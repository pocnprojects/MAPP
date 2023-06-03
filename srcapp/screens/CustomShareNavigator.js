import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import CustomShare from './CustomShare'

const Stack = createNativeStackNavigator()

export default function CustomShareNavigator({route:{params}}) {
    return (
      <Stack.Navigator>
           <Stack.Screen name="CustomShare" component={CustomShare} options={{headerShown:false}} initialParams={params}></Stack.Screen>
      </Stack.Navigator>
    )
  }