import React, {useState} from 'react';

import {Image, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity, Button, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

import {reStructureEmailAndPhoneNumbers, recordSegregator, stripingEmptyFieldsFromRecord} from '../inAppHelper/contactsObjRestructure'
import {getAppSecret} from '../inAppHelper/contacts.helper';
import {deleteRecordIds} from '../inAppHelper/contactsObjRestructure';
import {contactCard} from '../inAppHelper/contactCardRender';

import DefineDefaultRecord from './DefineDefaultRecord'

//////////////////////////////////////////////////////////////////////////////////////////////////
//
//  One time screen that appears after splash screen ie ScreenZero
//  This gets called only by SplashScreen
//
//  It takes -
//          1) user's name, phone and email (and category - work, home, other)
//          2) permissions
//          On Y -  1) creates a contact in address book for this user based on the inputs given above
//                  2) lands at the homepage with these details pre-filled in the first tab as default contact
//          On N -  1) clear all traces from the mobile before exiting
//                  2) exits without further installation
//
//  Open items -    On Submit, new contact creation or editing existing, to be flagged as default
//                  On Cancel, clean-up and exit
//                  API integration
//                  Category display to be fixed on iOS, it overshadows a large area as of now (try drop-down)
//
//////////////////////////////////////////////////////////////////////////////////////////////////


const SignUpScreen = ({navigation}) => {

    const [category, setCategory] = useState('home');
    const initialState = {
        cam: false,
        cont: false,
        lstore: false,
        pinfo: false,
    };
    const [state, setState] = React.useState(initialState);
    const [toggleButton, setToggleButton] = React.useState(false);

    return (

        <SafeAreaView style={[styles.rowContainer]}>
            
            <View style={{flex:1.5, marginBottom:2}}>
                <Text style={[styles.screenTitle]}>Define Default</Text>
            </View>

            <View style={[styles.rowContainer, {flex:6.5}]}>

                <View style={{flex:3}}>
                    <TextInput 
                        placeholder="name" style={[styles.inputStyle]} />
                    <TextInput 
                        placeholder="tel" style={[styles.inputStyle]} />
                    <TextInput 
                        placeholder="email" style={[styles.inputStyle]} />
                    <Picker style={{alignSelf: 'center', width: 340}}
                        selectedValue={category}
                        onValueChange={currentCategory => setCategory(currentCategory)}>
                        <Picker.Item style={[styles.messageText]} label="work" value="Work" />
                        <Picker.Item style={[styles.messageText]} label="home" value="Home" />
                        <Picker.Item style={[styles.messageText]} label="other" value="Other" />
                    </Picker>
                </View>
            
                <View style={{flex:1}}>
                    <View style={{flex:.5}}>
                        <TouchableOpacity style={[styles.buttonSmallest]} onPress={() => {console.log("navigation", navigation); navigation.navigate('DefineDefaultRecord')}}>
                            <Text style={{color: '#FFFFFF'}}>Submit</Text>
                        </TouchableOpacity>                            
                    </View>
                    <View style={{flex:.5}}>
                        <TouchableOpacity style={[styles.buttonSmallest]} onPress={() => {console.log("navigation", navigation); navigation.navigate('DefineDefaultRecord')}}>
                            <Text style={{color: '#FFFFFF'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex:2.5}}>
                    
                    <View style={{flex:.5}, {margin:.5}}>
                        <Text style={[styles.messageText, {margin:.5}]}>Please know that in order to process your request, we need access to some resources on your device. Please check the box/es below to grant us the permissions as under:</Text>
                    </View>    

                    <View style={{flex:2.5}, {alignItems: 'center'}}>
                        <View style={[styles.checkboxWrapper]}>
                            <CheckBox
                              value={state.cam}
                              onValueChange={value =>
                                setState({
                                  ...state,
                                  cam: value,
                                })
                              }
                            />
                            <Text style={[styles.messageText]}>Access to your Camera</Text>
                        </View>
                        <View style={[styles.checkboxWrapper]}>
                            <CheckBox
                              value={state.cont}
                              onValueChange={value =>
                                setState({
                                  ...state,
                                  cont: value,
                                })
                              }
                            />
                            <Text style={[styles.messageText]}>Access to your Contacts</Text>
                        </View>
                        <View style={[styles.checkboxWrapper]}>
                            <CheckBox
                              value={state.lstore}
                              onValueChange={value =>
                                setState({
                                  ...state,
                                  lstore: value,
                                })
                              }
                            />
                            <Text style={[styles.messageText]}>Access to your Local Storage</Text>
                        </View>
                        <View style={[styles.checkboxWrapper]}>
                            <CheckBox
                              value={state.pinfo}
                              onValueChange={value =>
                                setState({
                                  ...state,
                                  pinfo: value,
                                })
                              }
                            />
                            <Text style={[styles.messageText]}>`For seamless operation, we need to make a copy of the information being shared by you. We will not share this information or use it for any purpose, without your prior consent.`</Text>
                        </View>
                    </View>

                </View>

            <View style={{flex:1}}/>

        </View>
            
        </SafeAreaView> 
    );
};


const styles = StyleSheet.create({

    rowContainer: {
        flex:1, 
        backgroundColor:"#FFFFFF"
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
    buttonSmallest: 
    {
        position: "absolute",
        alignSelf: 'center',
        width: 310,
        height: 30,
        backgroundColor: "#385998",
        borderRadius: 24,
        justifyContent: 'center',
        margin:.3,
        alignItems: 'center',
        fontWeight: 200,
        fontStyle: "normal",
        fontSize: 20
    },
    messageText:
    {
        alignSelf: 'center',
        fontWeight: 100,
        fontStyle: "normal",
        fontSize: 11,
        color: '#000000',
        paddingLeft: 5,
        paddingRight: 7,
    },
    inputStyle: {
        marginTop: 5,
        width: 320,
        height: 35,
        paddingHorizontal: 10,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#385998",
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingVertical: 1,
        paddingLeft: 25,
    },
})

export default SignUpScreen;