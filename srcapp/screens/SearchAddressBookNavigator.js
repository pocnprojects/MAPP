import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchAddressBook from './SearchAddressBook'

const Stack = createNativeStackNavigator()

export default function SearchAddressBookNavigator({route:{params}}) {
    return (
      <Stack.Navigator>
           <Stack.Screen name="AddressBook" component={SearchAddressBook} options={{headerShown:false}} initialParams={params}></Stack.Screen>
      </Stack.Navigator>
    )
  }