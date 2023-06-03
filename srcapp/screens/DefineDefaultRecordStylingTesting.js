
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, AppState} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import commonStyles, { normalize } from '../stylesheet/common'
import {cacheContacts, sortingCallback} from '../inAppHelper/contacts.helper'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Contacts from "react-native-contacts";

//import { ScrollView } from 'react-native-gesture-handler';

import { contactCard } from '../inAppHelper/contactCardRender';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons/faCaretLeft'

//import {PermissionsAndroid} from "react-native";
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';


const styles = StyleSheet.create({

    centre_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    not_defined_text: {
        left: 5,
        fontSize: normalize(24),
        color: 'black'
    },
    main_container: {
        padding: 20,
        flex: 1
    },
    top: {
        marginTop: 20
    },
    button_style: {
        alignItems: "flex-start",
        justifyContent: 'center',
        height: 60,
        borderRadius: 10,
        backgroundColor: "#0070c0",
        padding: 10,
        paddingLeft: 20
    },

})



export default function DefineDefaultRecord({ navigation }) {

    const [defaultContactAllFields, setdefaultContactCheck] = useState(null)
    const [defaultContactSelectedFields, setselectedFields] = useState(null)

    
    useEffect(() => {
        const test = navigation.addListener('focus', () => {
        //    console.log("inside useEffect1")
            getDefaultContact()
        })
    }, [])

    
    useEffect(() => {
        cacheContacts()
            .then(r => {
            //    console.log(r);  
                console.log('Fetched Data Successfully');
            //    console.log('Which platform', Platform.OS);     
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
//            console.log('AppState', appState.current);
            
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
                                    //console.log("getAll result", res);
                                    res = res.filter(element =>{
                                        return element.phoneNumbers.length > 0 || element.emailAddresses.length > 0 || element.imAddresses.length > 0 || element.postalAddresses.length > 0 || element.urlAddresses.length > 0;
                                    })
                                    const jsonValue = JSON.stringify(res)
                                    //console.log("jsonValue", jsonValue);
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
            // console.log('working')
            let jsonValue = await AsyncStorage.getItem('DefaultContact')
            let jsonValue2 = await AsyncStorage.getItem('SelectedItem')
            // console.log('jsonvalue',jsonValue)
            // console.log('jsonvalue2',jsonValue2)
            if (jsonValue && jsonValue2) {

                setdefaultContactCheck(JSON.parse(jsonValue))
                setselectedFields(JSON.parse(jsonValue2))
            }
        } catch (e) {
            console.error(e)
        }
    }


    const renderDefaultContactCard = () => {

    //    console.log("defaultContactSelectedFields", defaultContactSelectedFields)
        return contactCard(defaultContactSelectedFields)
    }


    return (
        <View style={commonStyles.main_container}>
            <View>
                <Image style={commonStyles.logo} source={require('../images/logo.png')}></Image>
            </View>
            <ScrollView>
                <View>
                    {defaultContactAllFields ? <View>
                        <TouchableOpacity onPress={()=>navigation.navigate('QRCodeGeneratorNavigator',{defaultContactSelectedFields,'fromButton':'default',defaultContactAllFields})} style={commonStyles.touchAbleOpacityStyle}>
                            <View style={commonStyles.item}>{contactCard(defaultContactSelectedFields,'default',defaultContactAllFields)}</View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity
                                style={commonStyles.touchAbleOpacityStyle}
                                onPress={() => navigation.navigate('AddressBookNavigator',{'fromButton':'select'})}
                            >
                                <Text style={[commonStyles.button_text, { alignSelf: 'center' }]}>Select and Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={commonStyles.touchAbleOpacityStyle}
                                onPress={() => navigation.navigate('QRCodeScanner')}
                            >
                                <View style={commonStyles.item}>
                                <View style={commonStyles.contactCardLeftView}><Text style={[commonStyles.button_text]}>Scan In</Text></View>
                                <View style={commonStyles.contactCardRightView2}>
                                    <FontAwesomeIcon icon={faCaretLeft} style={commonStyles.rightArrowIcon} size={50} />
                                </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View> :
                        <View>
                            <View style={styles.top}>
                                <Text style={styles.not_defined_text}>Default record not defined.{"\n"}This is supposed to be your Visiting
                                    Card</Text>
                            </View>
                            <View style={styles.top}>
                                <TouchableOpacity
                                    style={styles.button_style}
                                    onPress={() => navigation.navigate('AddressBookNavigator',{'fromButton':'default'})}
                                >
                                    <Text style={commonStyles.button_text}>Click here to define it.</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    }
                </View>

            </ScrollView>

        </View>
    )
}