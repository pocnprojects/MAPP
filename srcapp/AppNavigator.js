import React from 'react'

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DefineDefaultRecord from './screens/DefineDefaultRecord'
import SearchAddressBook from './screens/SearchAddressBook'
import OpenContactNavigator from './screens/OpenContactNavigator'
import QRCodeGeneratorNavigator from './screens/QRCodeGeneratorNavigator'
import SearchAddressBookNavigator from './screens/SearchAddressBookNavigator'
import QRCodeScanning from './screens/QRCodeScanning.js'
import QrCodeGenerator from './screens/QrCodeGenerator'
import AddCard from './screens/AddCard'
import CustomShareNavigator from './screens/CustomShareNavigator'
import SignUpScreen from './screens/SignUpScreen'
import ScreenZero from './screens/ScreenZero'

///////////////////////////////////////////////////////////////////////////////////////////
//      
//      Open Items -
//                  local device signature reading
//                  setting initialRouteName to be either - ScreenZero or DefineDefaultRecord based on device signature
//                  All Screen Flows to be revisited once after complete functionality is done
//                        
///////////////////////////////////////////////////////////////////////////////////////////

const theme = 'dark'

export default function AppNavigator() {

    const Stack = createNativeStackNavigator()
    
    return (
            <NavigationContainer theme={DefaultTheme}>

                <Stack.Navigator initialRouteName="ScreenZero">

                    <Stack.Screen name="ScreenZero" component={ScreenZero} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="DefineDefaultRecord" component={DefineDefaultRecord} options={{ headerShown: false }} />
                    {/*<Stack.Screen name="DefineDefaultRecord" component={DefineDefaultRecord} options={{headerShown:false}}/>*/}
                    <Stack.Screen name="AddressBook" component={SearchAddressBook} options={{ headerShown: false }} />
                    <Stack.Screen name="AddressBookNavigator" component={SearchAddressBookNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="OpenContactNavigator" component={OpenContactNavigator} options={{ headerShown: false }}></Stack.Screen>
                    <Stack.Screen name="QRCodeScanner" component={QRCodeScanning} options={{ headerShown: false }}></Stack.Screen>
                    <Stack.Screen name="CustomShareNavigator" component={CustomShareNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="QrGenerator" component={QrCodeGenerator} options={{ headerShown: false }} />
                    <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }} />
                    <Stack.Screen name="QRCodeGeneratorNavigator" component={QRCodeGeneratorNavigator} options={{ headerShown: false }}>
                    </Stack.Screen>
            
                </Stack.Navigator>

            </NavigationContainer>
        )
}
