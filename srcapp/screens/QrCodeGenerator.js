import React, {useState} from 'react';
import commonStyles, {normalize} from '../stylesheet/common'
import {Image, SafeAreaView, StyleSheet, ScrollView, Text, TouchableOpacity, Button, View} from 'react-native';
//import {Button} from '@react-native-material/core'

import QRCode from 'react-native-qrcode-svg';
import {
    reStructureEmailAndPhoneNumbers,
    recordSegregator,
    stripingEmptyFieldsFromRecord
} from '../inAppHelper/contactsObjRestructure'
import {getAppSecret} from '../inAppHelper/contacts.helper'
import {deleteRecordIds} from '../inAppHelper/contactsObjRestructure';
import {contactCard} from '../inAppHelper/contactCardRender'
//import {ScrollView} from 'react-native-gesture-handler';

const QrCodeGenerator = ({route, navigation}) => {
    //console.log('test test yellow',route.params.defaultContactAllFields)
    // console.log(route.params[Object.keys(route.params)[1]])
    
    var fromWhichButton = route.params[Object.keys(route.params)[1]]
    var selectContactobj = route.params[Object.keys(route.params)[0]]
    var selectContactobjAllFields = fromWhichButton=='default' ? route.params.defaultContactAllFields :{}
    deleteRecordIds(selectContactobj)
    stripingEmptyFieldsFromRecord(selectContactobj);
    var segregatedRecords = recordSegregator(selectContactobj)
    //console.log('from qr generation', segregatedRecords)
    var newPhoneArray = segregatedRecords.mobile.concat(segregatedRecords.work, segregatedRecords.others)
    var newEmailAddress = segregatedRecords.homeEmail.concat(segregatedRecords.workEmail, segregatedRecords.othersEmail)
    if (selectContactobj.phoneNumbers && selectContactobj.phoneNumbers.length > 0)
        selectContactobj.phoneNumbers = newPhoneArray
    else if (selectContactobj.emailAddresses && selectContactobj.emailAddresses.length > 0)
        selectContactobj.emailAddresses = newEmailAddress
    let appSecretVar = getAppSecret()
    selectContactobj.appSecret = appSecretVar



//    console.log("selectContactobj", selectContactobj)


    return (
        
        <View style={commonStyles.main_container}>
            
            <View style={commonStyles.item}>
                <View>
                    <Image style={commonStyles.logo} source={require('../images/logo.png')}></Image>
                </View>
                <View>
                    <Text style={commonStyles.default_text_size}>Share QR</Text>
                </View>
            </View>
            
            <View style={[commonStyles.styleQRCode]}>
                <QRCode
                    value={JSON.stringify(selectContactobj)}
                    size={normalize(250,2.5)}
                    color="gray"
                    backgroundColor="transparent"
                    logoSize={30}
                    logoMargin={2}
                    logoBorderRadius={10}
                />
            </View>

            <View style={[commonStyles.contactDetailScrollView]}>
                <ScrollView persistentScrollbar={true}>
                    {contactCard(selectContactobj, 'select')}
                </ScrollView>
            </View>
            
            {/* fromWhichButton == 'default' ?
                <TouchableOpacity style={commonStyles.bottomViewButtonContainer} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={[commonStyles.button_text, commonStyles.bottomViewButton]}>Home</Text>
                </TouchableOpacity>

                :  */}
    
            <View style={[commonStyles.bottomViewTwoButtonContainer]}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <View style={[commonStyles.bottomViewTwoButtonContainerStyle]}>
                        <Text style={[commonStyles.button_text, commonStyles.bottomViewButton]}>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CustomShareNavigator', {fromWhichButton, selectContactobj,selectContactobjAllFields})}>
                    <View style={[commonStyles.bottomViewTwoButtonContainerStyle]}>
                        <Text style={[commonStyles.button_text, commonStyles.bottomViewButton]}>Custom Share</Text>
                    </View>
                </TouchableOpacity>
            </View>
        
        </View>
    );
};

export default QrCodeGenerator;


