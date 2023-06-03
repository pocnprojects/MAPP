import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import commonStyles from '../stylesheet/common'
import CheckBox from '@react-native-community/checkbox';
import QRCodeGeneratorNavigator from './QRCodeGeneratorNavigator';
import { recordSegregator } from '../inAppHelper/contactsObjRestructure';

export default function CustomShare({ route, navigation }) {

    var fromWhichButton = route.params.fromWhichButton
    var selectedContactObj = fromWhichButton == 'default' ? route.params.selectContactobjAllFields : route.params.selectContactobj

    //console.log('Custom Share', selectedContactObj)
    //console.log('Custome Share 2', fromWhichButton)

    const [official, setoffical] = useState(false)
    const [personal, setpersonal] = useState(false)
    const [selected, setselected] = useState(false)
    const [selectAll, setselectAll] = useState(false)
    const [officalDisabled, setofficalDisabled] = useState(false)
    const [personalDisabled, setpersonalDisabled] = useState(false)
    const [officalColor, setofficalColor] = useState(commonStyles.checkBoxStyle)
    const [personalColor, setpersonalColor] = useState(commonStyles.checkBoxStyle)

    const disableFunc = () => {
        setoffical(true)
        setpersonal(true)
        setpersonalDisabled(true)
        setofficalDisabled(true)
        setselected(false)
        setofficalColor(commonStyles.checkBoxDisabledStyle)
        setpersonalColor(commonStyles.checkBoxDisabledStyle)
    }

    const enableFunc = () => {
        setoffical(false)
        setpersonal(false)
        setpersonalDisabled(false)
        setofficalDisabled(false)
        setofficalColor(commonStyles.checkBoxStyle)
        setpersonalColor(commonStyles.checkBoxStyle)
    }

    useEffect(() => {
        if (selectAll)
            disableFunc()
        else
            enableFunc()
    }, [selectAll])

    useEffect(() => {
        if (selected) {
            enableFunc()
            setselectAll()
        }
    }, [selected])

    const continueToQRGeneration = () => {
        if ((personal || official || selected || selectAll) == false) {
        //    console.log('working')
            ToastAndroid.show('Please Select Details To Share', ToastAndroid.SHORT)
            return
        }
        fromWhichButton = 'default'
        if (selectAll) {
            navigation.push('QRCodeGeneratorNavigator', { selectedContactObj, fromWhichButton })
        }
        else {
            var res = recordSegregator(selectedContactObj)
            var selectContactobjCpy = { ...selectedContactObj }
            if (personal && official) {
                var newPhoneArray = res.mobile.concat(res.work)
                var newEmailAddress = res.homeEmail.concat(res.workEmail)
                selectContactobjCpy['phoneNumbers'] = newPhoneArray
                selectContactobjCpy['emailAddresses'] = newEmailAddress
                if (newPhoneArray.length==0 && newEmailAddress.length==0)
                    ToastAndroid.show('No Personal or official details found',ToastAndroid.LONG,ToastAndroid.CENTER,)
                else
                    navigation.push('QRCodeGeneratorNavigator', { selectContactobjCpy, fromWhichButton })
            }
            else if (personal) {
                selectContactobjCpy['phoneNumbers'] = res.mobile
                selectContactobjCpy['emailAddresses'] = res.homeEmail
                if (res.mobile.length==0 && res.homeEmail.length==0)
                    ToastAndroid.show('No Personal details found',ToastAndroid.LONG,ToastAndroid.CENTER,)
                else
                    navigation.push('QRCodeGeneratorNavigator', { selectContactobjCpy, fromWhichButton })
            }
            else if (official) {
                selectContactobjCpy['phoneNumbers'] = res.work
                selectContactobjCpy['emailAddresses'] = res.workEmail
                if (res.work.length==0 && res.workEmail.length==0)
                    ToastAndroid.show('No Offical details found',ToastAndroid.LONG,ToastAndroid.CENTER,)
                else
                    navigation.push('QRCodeGeneratorNavigator', { selectContactobjCpy, fromWhichButton })
            }
            else {
                fromWhichButton = 'select'
                navigation.push('OpenContactNavigator', { selectedContactObj, fromWhichButton })
            }
        }

    }

    const clickOfficalHandler = () => {
        setoffical(!official);
        setselected(false)
    }

    const clickPersonalHandler = () => {
        setpersonal(!personal); setselected(false)
    }

    //setoffical(!official); setselected(false) 

    return (
        <View style={commonStyles.main_container}>
            <View style={commonStyles.item}>
                <View>
                    <Image style={commonStyles.logo} source={require('../images/logo.png')}></Image>
                </View>
                <View>
                    <Text style={[commonStyles.default_text_size]}>Custom Share</Text>
                </View>
            </View>
            <View style={[commonStyles.item, { marginTop: 20 }]}>
                <CheckBox
                    value={official}
                    onValueChange={clickOfficalHandler}
                    style={[commonStyles.checkBoxItemLeft1]}
                    tintColors={officalColor}
                    disabled={officalDisabled}
                />
                <TouchableOpacity disabled={officalDisabled} onPress={clickOfficalHandler} style={[commonStyles.checkBoxItemRight1]}>
                    <Text style={[commonStyles.blackColor, commonStyles.checkBoxItemText]}>Share Official Details</Text>
                </TouchableOpacity>
            </View>
            <View style={[commonStyles.item]}>
                <CheckBox
                    value={personal}
                    onValueChange={clickPersonalHandler}
                    style={[commonStyles.checkBoxItemLeft1]}
                    tintColors={personalColor}
                    disabled={personalDisabled}
                />
                <TouchableOpacity disabled={personalDisabled} onPress={clickPersonalHandler} style={commonStyles.checkBoxItemRight1}>
                    <Text style={[commonStyles.blackColor, commonStyles.checkBoxItemText]}>Share Personal Details</Text>
                </TouchableOpacity>
            </View>
            <View style={[commonStyles.item]}>
                <CheckBox
                    value={selected}
                    onValueChange={setselected}
                    style={[commonStyles.checkBoxItemLeft1]}
                    tintColors={commonStyles.checkBoxStyle}
                />
                <TouchableOpacity style={commonStyles.checkBoxItemRight1} onPress={() => setselected(!selected)}>
                    <Text style={[commonStyles.blackColor, commonStyles.checkBoxItemText]}>Share Selected</Text>
                </TouchableOpacity>
            </View>
            <View style={[commonStyles.item]}>
                <CheckBox
                    value={selectAll}
                    onValueChange={setselectAll}
                    style={[commonStyles.checkBoxItemLeft1]}
                    tintColors={commonStyles.checkBoxStyle}
                />
                <TouchableOpacity style={commonStyles.checkBoxItemRight1} onPress={() => setselectAll(!selectAll)}>
                    <Text style={[commonStyles.blackColor, commonStyles.checkBoxItemText]}>Share All</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={commonStyles.bottomViewButtonContainer}
                onPress={continueToQRGeneration}
            >
                <View style={[commonStyles.bottomViewTwoButtonContainerStyle]}>

                    <Text style={[commonStyles.button_text, commonStyles.bottomViewButton]}>Continue</Text>

                </View>
            </TouchableOpacity>
        </View>
    )
}