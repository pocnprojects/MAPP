import Contacts from "react-native-contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PermissionsAndroid} from "react-native";

import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const refreshContacts = () => {
    Contacts.getAll().then(res => {

        console.log("inside getAll, via refreshContacts")
        // res = res.filter(element => { return element.phoneNumbers.length > 0 })
        res = res.filter(element =>{
            return element.phoneNumbers.length > 0 || element.emailAddresses.length > 0 || element.imAddresses.length > 0 || element.postalAddresses.length > 0 || element.urlAddresses.length > 0;
        })
        let arr = JSON.stringify(res);
        AsyncStorage.setItem('contacts', arr).then(r => console.log('response set'));
    }).catch(e => console.log(e))
}

const syncRefreshContacts = async () => {
    let res = await Contacts.getAll()

        console.log("inside getAll, via syncRefreshContacts")
        // res = res.filter(element => { return element.phoneNumbers.length > 0 })
        let arr = JSON.stringify(res);
        AsyncStorage.setItem('contacts', arr).then(r =>console.log('response set'));
//        console.log(res[10])
        res = res.filter(element =>{
            return element.phoneNumbers.length > 0 || element.emailAddresses.length > 0 || element.imAddresses.length > 0 || element.postalAddresses.length > 0 || element.urlAddresses.length > 0;
        })
        return res;
}

    cacheContacts = async () => {

        console.log("inside cacheContacts")
            
        ////// MS changed this. Did this work earlier ? returned array was recived as undefined.
        return await check( Platform.OS === 'ios'
                        ? PERMISSIONS.IOS.CONTACTS
                        : PERMISSIONS.ANDROID.READ_CONTACTS,
                    ).then(async(result) => {

                        if(result === 'granted')
                        {                   
                            let stringifyContactJson = await AsyncStorage.getItem('contacts');
                            //console.log("contacts from AsyncStorage", stringifyContactJson);

                            if (!stringifyContactJson || JSON.parse(stringifyContactJson).length == 0) {
                                stringifyContactJson = await Contacts.getAll();
                                stringifyContactJson = stringifyContactJson.filter(element =>{
                                    return element.phoneNumbers.length > 0 || element.emailAddresses.length > 0 || element.imAddresses.length > 0 || element.postalAddresses.length > 0 || element.urlAddresses.length > 0;
                                })
                                AsyncStorage.setItem('contacts', JSON.stringify(stringifyContactJson));
                                return stringifyContactJson;

                            }
                            res = JSON.parse(stringifyContactJson);
                            //console.log('res inside cacheContacts', JSON.parse(stringifyContactJson).length, res);
                            //res = res.filter(element => { return element.phoneNumbers.length > 0 })
                            return res
                        }
                    
                    })
                    .catch(e => console.error(e))

    };

        

const addContact = async (result) => {

    try {

            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CONTACTS
                : PERMISSIONS.ANDROID.WRITE_CONTACTS && PERMISSIONS.ANDROID.READ_CONTACTS,
            )
            /*
            let Permissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
                buttonPositive: 'Please accept bare mortal',
            })
            console.log(Permissions)
            */
           .then(async (res) => {

                //console.log(res);
                if (res == 'granted') {
                    let response = await Contacts.addContact(JSON.parse(result))
                }
            
                return 'success'
            })

    } catch (e) {
        console.log(e);
        return 'error'
    }

}


const checkAppSecret = (text) => {

    try {

        if (text == 'jH4efAmGoJRlzzO8t31g')
            return true
        else
            return false
    } catch (e) {
        console.log(e);
        return 'error'
    }

}


const getAppSecret = () => {

    try {
       return 'jH4efAmGoJRlzzO8t31g'
    } catch (e) {
        console.log(e);
        return 'error'
    }

}


const sortingCallback = (a,b) => {

//    console.log("inside sortingCallback", a, b);
    if(!!a.givenName.localeCompare(b.givenName)){
        return a.givenName.localeCompare(b.givenName)
    }
    else {
        if(!!a.middleName.localeCompare(b.middleName)){
            return a.middleName.localeCompare(b.middleName)
        }else{
            return a.familyName.localeCompare(b.familyName)
        }
    }
}


module.exports = {
    refreshContacts,
    cacheContacts,
    syncRefreshContacts,
    addContact,
    checkAppSecret,
    getAppSecret,
    sortingCallback
}
