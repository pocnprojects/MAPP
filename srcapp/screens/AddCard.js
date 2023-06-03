import React, { useEffect, useState } from 'react';
//import { ScrollView } from 'react-native-gesture-handler';
import { Image, StyleSheet, ScrollView, Text, ToastAndroid, View, TouchableOpacity } from 'react-native';
import { addContact } from '../inAppHelper/contacts.helper'
import commonStyles from '../stylesheet/common'
import { contactCard } from '../inAppHelper/contactCardRender'


const AddCard = ({ route, navigation }) => {
    let buttonDecision = {
        addAndExit: 'AE',
        addAndNext: 'AN',
        discardAndNext: 'DN',
        discardAndExit: 'DE'
    }
//    console.log('Router data in AddCard', route.params)
    const [result, setResult] = useState(JSON.stringify(route.params.newResult));
    // setResult(route.params.newResult);
    const handleClick = (key) => {
        if (key == buttonDecision.addAndNext) {
            addContact(result).then(res => {
        //        console.log(res)
                navigation.navigate('QRCodeScanner')
            }).catch(e => {
                console.error(e)
            })
        } else if (key == buttonDecision.addAndExit) {
            addContact(result).then(res => {
        //        console.log(res)
                navigation.navigate('HomeScreen')
            }).catch(e => {
                console.error(e)
            })

        } else if (key == buttonDecision.discardAndNext) {
            setResult('')
            navigation.navigate('QRCodeScanner')

        } else if (key == buttonDecision.discardAndExit) {
            setResult('')
            navigation.navigate('HomeScreen')


        }

    }
    let prepareViewToRender = () => {
        try {
            let arr = [];
            let newResult = JSON.parse(result)
        //    console.log('deleted Ids', newResult)
            let arrToDisplay = Object.keys(newResult);
            arrToDisplay.forEach(element => {
                if (!!newResult[element] && !Array.isArray(newResult[element])) {
                    arr.push(<Text style={[styles.text_size1]} key={element}>
                        {newResult[element]}
                    </Text>)
                } else if (!!newResult[element] && Array.isArray(newResult[element])) {
                    newResult[element].forEach((ele, i) => {
                        Object.keys(ele).forEach((e, index) => {
                            if (e != 'label') {
                                arr.push(<Text style={[styles.text_size1]} key={i + '' + index + e}>
                                    {ele[e]}
                                </Text>)
                            }
                        })
                    })
                }
            })
            return arr
        } catch (e) {
            console.error('caught', e)
            ToastAndroid.show('Invalid QR for contact');
        }
    }

    return (
        <View style={commonStyles.main_container}>
            <View style={commonStyles.item}>
                <View>
                    <Image style={commonStyles.logo} source={require('../images/logo.png')}></Image>
                </View>
                <View>
                    <Text style={commonStyles.default_text_size}>Add Card</Text>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <ScrollView style={{ height: '60%' }}>
                    {/* {prepareViewToRender()} */}
                    {contactCard(route.params.newResult)}
                </ScrollView>
            </View>
            <View style={[commonStyles.bottomViewButtonFourContainer]}>
                <TouchableOpacity style={[commonStyles.bottomViewButtonFourContainerStyle]}
                    onPress={() => handleClick(buttonDecision.addAndExit)}
                >
                    <View>
                        <Text style={[commonStyles.default_text_size, commonStyles.whiteColor]}>Add & Exit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.bottomViewButtonFourContainerStyle]}
                    onPress={() => handleClick(buttonDecision.addAndNext)}
                >
                    <View>
                        <Text style={[commonStyles.default_text_size, commonStyles.whiteColor]}>Add & Next Card</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.bottomViewButtonFourContainerStyle]}
                    onPress={() => handleClick(buttonDecision.discardAndNext)}
                >
                    <View>
                        <Text style={[commonStyles.default_text_size, commonStyles.whiteColor]}>Discard & Next Card</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[commonStyles.bottomViewButtonFourContainerStyle]}
                    onPress={() => handleClick(buttonDecision.discardAndExit)}
                >
                    <View>
                        <Text style={[commonStyles.default_text_size, commonStyles.whiteColor]}>Discard & Exit</Text>
                    </View>
                </TouchableOpacity>
            </View>           
        </View>





    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // textAlign: 'center',
        // padding: 10,
        // borderWidth:1,


    }, logo: {
        width: 155,
        height: 60,
    },
    default_text_size: {
        fontSize: 30,
        color: 'gray',
        padding: 10,
        fontWeight: "bold"
    },
    text_size: {
        fontSize: 26,
        color: '#0d90dd',
        marginLeft: 20,
        // fontFamily: "Raleway"
        fontWeight: '300'

    },
    item: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    bcontainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    text_size1: {
        fontSize: 22,
        color: 'black',
        marginLeft: 20,


    },
    text_size2: {
        fontSize: 22,
        color: '#0d90dd',
        marginLeft: 20,
        textDecorationLine: 'underline'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15
    },
    lowerBox: {
        height: '30%',
    },
    upperBox: {
        height: '50%',
        justifyContent: "center",
        alignItems: 'center',
        padding: '10%'
    }
});

export default AddCard;