
import React, {useEffect, useRef, useState} from 'react'

import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, AppState} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Contacts from "react-native-contacts";
import {SafeAreaView} from 'react-native-safe-area-context';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import commonStyles, { normalize } from '../stylesheet/common'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft'

import {cacheContacts, sortingCallback} from '../inAppHelper/contacts.helper'
import { contactCard } from '../inAppHelper/contactCardRender'

/////////////////////////////////////////////////////////////////////////////////////////////////
//  Call to HomeScreen in the start is commented as of now 
//                        <Stack.Navigator initialRouteName="HomeScreen">
//
//                        SignUpScreen for signUp & permissions
//                        
//                        submit shall go to define default
//                        cancel shall stop app installation 
//                        have made it first in the flow as of now and this goes to the home page in submit/cancel both cases
//
//
//   - on cancel, clear phone and exit
//                        - on submit, write to DB, create local token, and proceed to HomeScreen (means DefineDefaultRecord component, which ideally shall be renamed now)   
///////////////////////////////////////////////////////////////////////////////////////////////


const styles = StyleSheet.create({

    rowContainer: {
        flex:1, 
        backgroundColor:"#FFFFFF"
    }, 
    containerInside: {
        backgroundColor: '#385998', 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },  
    button: 
    {
        position: "absolute",
        alignSelf: 'center',
        width: 366,
        height: 119,
        backgroundColor: "#385998",
        borderRadius: 24,
        justifyContent: 'center',
    },
    buttonText: 
    {
        position: "absolute",
        fontStyle: "normal",
        fontWeight: "200",
        fontSize: 32,
        lineHeight: 38,
        color: '#FFFFFF',
        paddingLeft: 10,
        alignSelf: 'flex-start'
    },   
    screenTitle:
    {
        alignSelf: 'flex-start',
        paddingTop: 30,
        paddingLeft: 10,
        width: 366,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 32,
        color:'#C89E4B'
    },
    triangleForward: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 40,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: '#FFFFFF',
        transform: [{ rotate: "90deg" }],
        alignSelf: 'flex-end'
    },
    triangleBackward: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 40,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: '#FFFFFF',
        transform: [{ rotate: "-90deg" }],
        alignSelf: 'flex-end'
    }
})



export default function DefineDefaultRecord({ navigation }) {

    const [defaultContactAllFields, setdefaultContactCheck] = useState(null)
    const [defaultContactSelectedFields, setselectedFields] = useState(null)

    useEffect(() => {
        const test = navigation.addListener('focus', () => {
            console.log("inside useEffect1")
            getDefaultContact()
        })
    }, [])
    
    useEffect(() => {
        cacheContacts()
            .then(r => {
                console.log(r);  
                console.log('Fetched Data Successfully');
                console.log('Which platform', Platform.OS);     
            })
            .catch(e => console.error(e));
    }, [])

    // useEffect(() => {
    //     console.log('x',renderDefaultContact)
    //     console.log('y',defaultContactSelectedFields)
    //   setRenderDefaultContact(true)
    // }, [defaultContactSelectedFields])

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log('AppState', appState.current);
            
            if(appState.current == 'active'){
                    // MS changed it. Generic permissions in place of PermissionAndroid.
                    //    console.log("defaultContactAllFields, defaultContactSelectedFields", defaultContactAllFields, defaultContactSelectedFields)

                    check(
                      Platform.OS === 'ios'
                        ? PERMISSIONS.IOS.CONTACTS
                        : PERMISSIONS.ANDROID.READ_CONTACTS,
                    ).then(result => {
                        if(result !== 'granted')
                        {
                            request(
                              Platform.OS === 'ios'
                                ? PERMISSIONS.IOS.CONTACTS
                                : PERMISSIONS.ANDROID.READ_CONTACTS,
                            ).then(async (permissionResult) => {
                                if (permissionResult == 'granted') {                
                                    let res = await Contacts.getAll()
                                    res = res.filter(element =>{
                                        return element.phoneNumbers.length > 0 || element.emailAddresses.length > 0 || element.imAddresses.length > 0 || element.postalAddresses.length > 0 || element.urlAddresses.length > 0;
                                    })
                                    const jsonValue = JSON.stringify(res)
                                    await AsyncStorage.setItem('contacts', jsonValue);
                                }
                            }).catch(err => {     
                                console.error('Default Records Error', err)
                            })
                        }
                    })
            }

        });

        return () => {
            subscription.remove();
        };
    
    })

    /*
    const storeData = async (value) => {
        try {

            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('contacts', jsonValue)
        } catch (e) {
            console.error(e)
            // saving error
        }
    }


    const getData = async () => {
        try {

            let jsonValue = await AsyncStorage.getItem('contacts')
            if (!jsonValue) {
                let res = await Contacts.getAll()
                res = res.filter(element =>{
                    return element.phoneNumbers.length > 0 || element.emailAddresses.length > 0 || element.imAddresses.length > 0 || element.postalAddresses.length > 0 || element.urlAddresses.length > 0;
                })
                res.sort((a, b) => sortingCallback(a,b))
                storeData(res).then(response => console.log('DataSetSuccessfully')).catch(e => console.error(e));
            }
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e)
            // error reading value
        }
    }
    */

    const getDefaultContact = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem('DefaultContact')
            let jsonValue2 = await AsyncStorage.getItem('SelectedItem')
            if (jsonValue && jsonValue2){
                setdefaultContactCheck(JSON.parse(jsonValue))
                setselectedFields(JSON.parse(jsonValue2))
            }
        } catch (e) {
            console.error(e)
        }
    }


    const renderDefaultContactCard = () => {
        return contactCard(defaultContactSelectedFields)
    }


    return (

        <SafeAreaView style={[styles.rowContainer]}>
        
            <View style={{flex:1.5, marginBottom:2}}>
                <Text style={styles.screenTitle}>Share Options</Text>
            </View>

            <View style={[styles.rowContainer, {flex:6.5}]}>
                <View style={{flex:2}}>
                    <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('QRCodeGeneratorNavigator',{defaultContactSelectedFields,'fromButton':'default',defaultContactAllFields})}>
                        <View style={[styles.containerInside, {flex:1}, {borderRadius:24}]}>
                            <View style={{flex:3}}>
                               <View style={{paddingLeft:5,paddingTop:5}}>{contactCard(defaultContactSelectedFields,'default',defaultContactAllFields)}</View>
                            </View>
                            <View style={{flex:1, justifyContent:'center'}}>
                                <View style={styles.triangleForward}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <View style={{flex:2}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddressBookNavigator',{'fromButton':'select'})}>
                        <Text style={styles.buttonText}>Select & Share</Text>
                        <View style={styles.triangleForward}/>
                    </TouchableOpacity>
                </View>

                <View style={{flex:2}}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRCodeScanner')}>
                        <Text style={styles.buttonText}>Scan & Store</Text>
                        <View style={styles.triangleBackward}/>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1}}/>
            </View>

            <View style={{flex:1}}/>

        </SafeAreaView>
    )
}
