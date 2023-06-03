import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import commonStyles from '../stylesheet/common'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight'

const formatPhoneNumber = (str) => {
    str = str.split('').reverse().join('')
    str = str.split(' ').join('')
    let counter = 0;
    let arr = []
    for (let i = 5; i < str.length; i += 5) {
        arr.push(str.substring(counter, i));
        counter = i
    }
    arr.push(str.substring(str.length, counter));
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = arr[i].split('').reverse().join('')
    }
    return arr.reverse().join('-')
}

const contactCard = (data, fromWhichButton,allDataFields) => {
    

    console.log("data, fromWhichButton,allDataFields", data, fromWhichButton, allDataFields)

    ///////handle this data undefined gracefully
    /*
    if (data == undefined) {
        console.log('null',data)
        return
    }
    */
    let children = []
    let view1 = []
    let view2 = []
    //let emailAddresses = data.emailAddresses !== undefined ? data.emailAddresses : []
    //let phoneNumbers = data.phoneNumbers !== undefined ? data.phoneNumbers : [] 
    console.log('data in contactCard',data)


    //////////////////////////////////////////////////////////////////////////////////
    allDataFields = {}
    if (Platform.OS === 'ios') 
    {
        allDataFields.givenName = "xxx" 
        allDataFields.middleName = "yyy"
        allDataFields.familyName = "zzz"
    }
    else
    {
        allDataFields.displayName = "xxx yyy zzz"
    }
    phoneNumbers = [{'number':'9999999999', 'label': 'home'}, {'number':'8888888888', 'label': 'work'}, {'number':'7777777777', 'label': 'other'}]
    emailAddresses = [{'email':'xxx@xxx.com', 'label': 'home'}, {'email':'yyy@yyy.com', 'label': 'work'}, {'email':'zzz@zzz.com', 'label': 'other'}]
    //////////////////////////////////////////////////////////////////////////////////


    let personName = ' ';
    
    if(fromWhichButton == 'default'){
    
        Platform.OS === 'ios' ? 
            personName = allDataFields.givenName !== undefined ? allDataFields.givenName + ' ' : [] + allDataFields.middleName !== undefined ? allDataFields.middleName + ' ' : [] + allDataFields.familyName !== undefined ? allDataFields.familyName : []
            :
            personName = allDataFields.displayName !== undefined ? allDataFields.displayName : []
        console.log("personName", personName)
    }
    
    {/* {   fromWhichButton == 'default' ? view1.push(<View key='share'><Text style={[styles.button_text]}>Share:</Text></View>) : '' } */}

    {
        Platform.OS === 'ios' ?
            view1.push(<View key='displayName' >
                <Text style={fromWhichButton == 'default' ? [styles.button_text] : [commonStyles.qrCodeCardText]}>{personName}</Text>
            </View>) 
            : 
            view1.push(<View key='displayName' >
                <Text style={fromWhichButton == 'default' ? [styles.button_text] : [commonStyles.qrCodeCardText]}>{personName}</Text>
            </View>) 
    }

    {
        // phoneNumbers.map((d, i) => {
        //     view1.push(
        //         <View key={d.label + ' number' + i} >
        //             <Text style={fromWhichButton=='default'?[styles.button_text]:[commonStyles.qrCodeCardText]}>{d.number}</Text>
        //         </View>
        //     )
        // })        
        if (phoneNumbers.length > 0) {
            if (fromWhichButton == 'default') {
                let d = phoneNumbers[0]
                console.log("d", d)
                view1.push(
                    <View key={d.label + ' number'} >
                        <Text style={fromWhichButton == 'default' ? [styles.button_text] : [commonStyles.qrCodeCardText]}>{d.number}</Text>
                    </View>
                )
            }
            else {
                phoneNumbers.map((d, i) => {
                    view1.push(
                        <View key={d.label + ' number' + i} >
                            <Text style={fromWhichButton == 'default' ? [styles.button_text] : [commonStyles.qrCodeCardText]}>{d.number}</Text>
                        </View>
                    )
                })
            }
        }
    }
    {
        // emailAddresses.map((d, i) => {
        //     view1.push(
        //         <View key={d.label + ' email' + i}>
        //             <Text style={fromWhichButton=='default'?[styles.button_text]:[commonStyles.qrCodeCardText]}>{d.email}</Text>
        //         </View>
        //     )
        // })
        if (emailAddresses.length > 0) {
            if (fromWhichButton == 'default') {
                let d = emailAddresses[0]
                console.log("d", d)                
                view1.push(
                    <View key={d.label + ' email'}>
                        <Text style={fromWhichButton == 'default' ? [styles.button_text] : [commonStyles.qrCodeCardText]}>{d.email}</Text>
                    </View>
                )
            }
            else {
                emailAddresses.map((d, i) => {
                    view1.push(
                        <View key={d.label + ' email' + i}>
                            <Text style={fromWhichButton == 'default' ? [styles.button_text] : [commonStyles.qrCodeCardText]}>{d.email}</Text>
                        </View>
                    )
                })
            }
        }
    }
    {/*view2.push(
        fromWhichButton == 'default' ? <View key='rightIcon'>
            <FontAwesomeIcon icon={faCaretRight} style={commonStyles.rightArrowIcon} size={100} />
        </View> :
            ''
    )*/}
    children.push(<View key='view1' style={commonStyles.contactCardLeftView}>{view1}</View>)
    children.push(<View key='view2' style={[commonStyles.contactCardRightView]}>{view2}</View>)

    return children
}

module.exports = {
    contactCard,
    formatPhoneNumber
}

const styles = StyleSheet.create({

    button_text: {
        fontStyle: "italic",
        fontWeight: "200",
        fontSize: 21,
        //lineHeight: 38,
        color: '#FFFFFF',
        paddingLeft: 10,
        alignSelf: 'flex-start'
        //fontSize: normalize(24)
    }
})