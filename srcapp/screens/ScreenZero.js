
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

import SignUpScreen from './SignUpScreen'

//////////////////////////////////////////////////////////////////////////////////////////////////
//
//      This is splash screen
//      It takes user to SignUp page
//      AppNavigator open this only if there is no device signature found on phone otherwise it starts with HomeScreen (DefineDefault component)
//
//////////////////////////////////////////////////////////////////////////////////////////////////

export default function ScreenZero({ navigation }) {

    return (
        <SafeAreaView style={styles.rowContainer}>

            <View style={{flex:4, marginBottom:2}}>
                <Image style={styles.qcIcon} source={require('../assets/qrlogo.png')}></Image>
            </View>

            <View style={[styles.rowContainer, {flex:4}, {marginBottom:2}]}>
                <View style={{flex:3}}>
                    <Text style={styles.qcTitle}>Q-Card</Text>
                </View>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <Text style={[styles.defDefineText]}>Default User Profile is not defined</Text>
                    </View>
                    <View style={{flex:1}}>    
                        <TouchableOpacity style={[styles.buttonSmallest]} onPress={() => {console.log("navigation", navigation); navigation.navigate('SignUpScreen')}}>
                            <Text style={styles.defDefineText}>Click here to define it!</Text>
                        </TouchableOpacity>
                    </View>                                
                </View>
            </View>

            <View style={{flex:1}}/>

        </SafeAreaView>
    )}



const styles = StyleSheet.create({

    rowContainer: {
        flex:1, 
        backgroundColor:"#385998"
    }, 
    buttonSmallest: 
    {
        position: "absolute",
        alignSelf: 'center',
        width: 366,
        height: 25,
        backgroundColor: "#385998",
        borderRadius: 24,
        justifyContent: 'center'
    }, 
    qcIcon:{
        position: 'absolute',
        alignSelf: 'center',
        marginTop:50,
        height: 211,
        width: 166
    },
    qcTitle:{
        position: 'absolute',
        alignSelf: 'center',
        fontWeight: 700,
        fontStyle: "normal",   
        fontSize: 64,
        lineHeight: 75,
        color: '#FCD589'
    },
    defDefineText:{
        position: 'absolute',
        alignSelf: 'center',
        fontWeight: 200,
        fontStyle: "normal",
        fontSize: 20,
        lineHeight: 23,
        color: '#FFFFFF'
    }
})
