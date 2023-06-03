import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import QrCodeGenerator from '../screens/QrCodeGenerator'

const Stack = createNativeStackNavigator()

export default function QRCodeGeneratorNavigator({route:{params}}) {
  return (
    <Stack.Navigator>
         <Stack.Screen name="QRCodeGenerator" component={QrCodeGenerator} options={{headerShown:false}} initialParams={params}></Stack.Screen>
    </Stack.Navigator>
  )
}