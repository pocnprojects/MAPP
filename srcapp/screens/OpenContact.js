import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import commonStyles,{normalize} from '../stylesheet/common';
import { reStructureEmailAndPhoneNumbers, selectedContactStructure } from '../inAppHelper/contactsObjRestructure';
import CheckBox from '@react-native-community/checkbox';
//import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatPhoneNumber } from "../inAppHelper/contactCardRender"

const styles = StyleSheet.create({
  upperTitle: {
    padding: 10,
    fontSize: normalize(24),
    marginTop: 10,
    marginBottom: 10
  }
})

export default function OpenContact({ route, navigation }) {
  //console.log(route.params)

  var labelNameToBeUsed = { mobile: 'Per', work: 'Off', other: 'Oth', home: 'Per' }
  var checkBoxDisabledCheck = 2
  var checkboxTouchableDisabledCheck = 2

  const data = route.params.item ? route.params.item : route.params.selectedContactObj
  var fromWhichButton = route.params.fromWhichButton ? route.params.fromWhichButton : 'default'
  const [isSelected, setSelection] = useState(true);

  const [checkboxValue, setCheckboxValue] = React.useState({})

  const checkBoxHandler = (obj) => {
    var uniqueKey = obj.obj
    //console.log(uniqueKey)
    const newValue = { ...checkboxValue }
    if (newValue[obj.obj] == undefined)
      newValue[obj.obj] = true
    else
      delete newValue[obj.obj]
    setCheckboxValue(newValue)
  }

  // useEffect(() => {
  // }, [checkboxValue])


  var phoneNumbersWithLabelAndId = data.phoneNumbers ? reStructureEmailAndPhoneNumbers(data, 'phoneNumbers') : []
  var emailWithLabelAndId = data.emailAddresses ? reStructureEmailAndPhoneNumbers(data, 'email') : []
  // console.log(phoneNumbersWithLabelAndId)
  // console.log(emailWithLabelAndId)
  const parseSelectedContact = async () => {
    var obj = { ...checkboxValue }
    obj['displayName'] = isSelected
    //console.log(data) //to be saved async storage
    //console.log(obj) //to be saved async storage
    const selectedItemsObj = selectedContactStructure(data, obj)
    const jsonDefaultContact = JSON.stringify(data)
    const jsonSelectedItems = JSON.stringify(selectedItemsObj)
    try {
      //console.log('setting Default Contact', jsonDefaultContact,jsonSelectedItems)
      await AsyncStorage.setItem('DefaultContact', jsonDefaultContact)
      await AsyncStorage.setItem('SelectedItem', jsonSelectedItems)

      navigation.navigate('HomeScreen')
    } catch (error) {
      console.error(error)
    }
  }

  const checkFirstPhoneNumberDisable = (index, i,uniqueKey) => {
    if (index === 0 && i === 0 && checkboxTouchableDisabledCheck == 2) {
      checkboxTouchableDisabledCheck = 1
      return true
    }
    else if (index === 0 && i === 0 && checkBoxDisabledCheck == 2) {
      checkBoxDisabledCheck = 1
      return true
    }
    return false
  }

  const checkBoxValueSetter = (index,i,uniqueKey) =>{
    if(checkboxTouchableDisabledCheck===1)
      {
        checkboxTouchableDisabledCheck=0
        const newValue = { ...checkboxValue }
        if (newValue[uniqueKey] == undefined)
          {
            newValue[uniqueKey] = true
            setCheckboxValue(newValue)
          }
        return true
      }
    else
      return checkboxValue[uniqueKey]
  }

  const checkBoxDisabledStyles=()=>{
    if(checkBoxDisabledCheck===1 || checkBoxDisabledCheck == 2)
      {
        checkBoxDisabledCheck=0
        return commonStyles.checkBoxDisabledStyle
      }
    return commonStyles.checkBoxStyle
  }

  const renderPhoneAndEmail = () => {
    var variableStore = [phoneNumbersWithLabelAndId, emailWithLabelAndId]
    let children = []
    children.push(
      <View style={[commonStyles.item, commonStyles.topBorder]} key={data.displayName}>
        <TouchableOpacity style={commonStyles.touchAbleOpacityStyle2} disabled={true}>
          <Text style={[commonStyles.blackColor, commonStyles.contactItemText, commonStyles.checkBoxItemLeft]}>Name</Text>
          <Text style={[commonStyles.blackColor, commonStyles.contactItemText, commonStyles.checkBoxItemMiddle]}>{data.displayName}</Text>
        </TouchableOpacity>
        <CheckBox
          disabled={true}
          value={isSelected}
          style={[commonStyles.checkBoxItemRight]}
          tintColors={commonStyles.checkBoxDisabledStyle}
        />
      </View>
    )
    variableStore.map((variableName, index) => {
      Object.entries(variableName).forEach(([key, value]) => {
        var tempArr = variableName[key]
        tempArr.map((d, i) => {
          var tempKey = key.charAt(0).toUpperCase() + key.slice(1)
          var cndNo = tempArr.length > 1 ? 1 : 0
          var numberEmail = index === 0 ? 'number' : 'email'
          var numberEmailValue = index === 0 ? d.number : d.email
          var uniqueKey = d.id + ' ' + numberEmail + ' ' + numberEmailValue + ' ' + key
          var mobileEmail = index === 0 ? 'Mobile' : 'Email'
          var label = labelNameToBeUsed[key] !== undefined ? labelNameToBeUsed[key] + ' ' + mobileEmail : 'Oth ' + labelNameToBeUsed[key]
          children.push(
            <View key={uniqueKey} style={[commonStyles.item, commonStyles.topBorder]}>
              <TouchableOpacity style={commonStyles.touchAbleOpacityStyle2} disabled={checkFirstPhoneNumberDisable(index, i,uniqueKey)} onPress={(params) => { checkBoxHandler({ obj: uniqueKey }) }}>
                <Text style={[commonStyles.blackColor, commonStyles.contactItemText, commonStyles.checkBoxItemLeft]}>{label}</Text>
                <Text style={[commonStyles.blackColor, commonStyles.contactItemText, commonStyles.checkBoxItemMiddle]}>{numberEmailValue}</Text>
              </TouchableOpacity>
              <CheckBox
                value={checkBoxValueSetter(index,i,uniqueKey)}
                onValueChange={(params) => { checkBoxHandler({ obj: uniqueKey }) }}
                style={[commonStyles.checkBoxItemRight]}
                tintColors={checkBoxDisabledStyles()}
                disabled={checkFirstPhoneNumberDisable(index, i,uniqueKey)}
              />
            </View>
          )
        })
      })
    })
    return children
  }

  const continueToQRGeneration = () => {
    var obj = { ...checkboxValue }
    obj['displayName'] = isSelected
    const selectedItemsObj = selectedContactStructure(data, obj)
    fromWhichButton = 'default'
    //console.log('test final bhai',selectedItemsObj)
    navigation.push('QRCodeGeneratorNavigator', { selectedItemsObj, fromWhichButton })
  }

  return (
    <View style={commonStyles.main_container}>
      <View style={commonStyles.item}>
        <View>
          <Image style={commonStyles.logo} source={require('../images/logo.png')}></Image>
        </View>
        {fromWhichButton == 'default' ?
          <View>
            <Text style={commonStyles.default_text_size}>Default Details</Text>
          </View> :
          <View>
            <Text style={commonStyles.default_text_size}>Custom Share Detail</Text>
          </View>
        }
      </View>
      {
        fromWhichButton == 'default' ?
          <View>
            <Text style={[commonStyles.blackColor, styles.upperTitle]}>Select Default Mobile-No and Email to be shared</Text>
          </View> :
          <View style={{ marginTop: 20 }}></View>
      }
      <View style={{ height: '75%' }}>
        <ScrollView>
          {renderPhoneAndEmail()}
          <View style={commonStyles.bottomBorder}></View>
        </ScrollView>
      </View>
      {fromWhichButton == 'default' ?
        <View style={[commonStyles.bottomViewButtonContainer]}>
          <TouchableOpacity
            onPress={parseSelectedContact}
          >
            <Text style={[commonStyles.button_text, commonStyles.bottomViewButton]}>Add Default Contact</Text>
          </TouchableOpacity>
        </View> :
        // <View style={[commonStyles.bottomViewButtonContainer]}>
        //   <TouchableOpacity
        //     onPress={continueToQRGeneration}
        //   >
        //     <Text style={[commonStyles.button_text, commonStyles.bottomViewButton]}>Continue</Text>
        //   </TouchableOpacity>
        // </View>
        <TouchableOpacity
          style={commonStyles.bottomViewButtonContainer}
          onPress={continueToQRGeneration}
        >
          <View style={[commonStyles.bottomViewTwoButtonContainerStyle]}>

            <Text style={[commonStyles.button_text, commonStyles.bottomViewButton]}>Continue</Text>

          </View>
        </TouchableOpacity>
      }
    </View>
  )
}