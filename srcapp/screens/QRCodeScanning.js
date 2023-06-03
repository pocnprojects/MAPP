import React, { Fragment, useState } from 'react';
//import { Button } from "@react-native-material/core";
import { contactCard } from '../inAppHelper/contactCardRender'
import {
    Dimensions,
    Image,
    Linking,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
    Button,
    ScrollView
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './scanStyle';
import commonStyles,{normalize} from "../stylesheet/common";
import { deleteRecordIds,addNameProperties } from '../inAppHelper/contactsObjRestructure'
import { checkAppSecret } from '../inAppHelper/contacts.helper'
//import { ScrollView } from "react-native-gesture-handler";
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScanning({ navigation }) {

    const [scanResult, setScanResult] = useState(false)
    const [scan, setScan] = useState(false)
    const [result, setResult] = useState(null);
    const [contactToAdd, setContactToAdd] = useState(null)
    let onSuccess = e => {
        try {
            e = JSON.parse(e.data);

            if (!e.appSecret || !checkAppSecret(e.appSecret)) {
                console.log(e)
                throw "Invalid QR"
            }
            deleteRecordIds(e);
            delete e.appSecret;
            const check = e;
            // check.recordID = undefined;

            // setState({
            //     result: e, scan: false, scanResult: true,
            // });
            if (e.displayName)
                    addNameProperties(e)
            setResult(e);
            setScan(false);
            setScanResult(true);

            if (check.toString().substring(0, 3) == 'http') {
                Linking.openURL(e).catch(err => console.error('An error occurred', err));
            } else {
                // setState({
                //     result: e, scan: false, scanResult: true,
                // });
                if (e.displayName)
                    addNameProperties(e)
                setResult(e);
                setScan(false)
                setScanResult(true);
            }
        } catch (e) {
            console.error(e)
            console.error('caught on Success')
            ToastAndroid.show('Invalid QR for contact', ToastAndroid.TOP);
            console.error('displayed test')
            setScan(false)

        }
    };
    let activeQR = () => {
        setScan(true);
    };
    let scanAgain = () => {
        // setState({scan: true, scanResult: false});
        setScan(true);
        setScanResult(false);
    };
    let onButtonPress = (action) => {

        if (action.toString().toLowerCase() == 'back') {
            scanAgain();
        } if (action.toString().toLowerCase() == 'home') {
            navigation.navigate('HomeScreen');
        } if (action.toString().toLowerCase() == 'foreword') {
            let newResult = JSON.parse(JSON.stringify(result))
            deleteRecordIds(newResult)
            navigation.navigate('AddCard', { newResult })
        }
        // setState({scan: true, scanResult: false});
        setScan(true);
        setScanResult(false);
    };
    let prepareViewToRender = () => {
        try {

            let arr = []
            let newResult = JSON.parse(JSON.stringify(result))
            deleteRecordIds(newResult)
       //     console.log('deleted Ids', newResult)
            let arrToDisplay = Object.keys(newResult);
            arrToDisplay = arrToDisplay.filter(element => (element.toString().toLocaleLowerCase() != 'recordid' && element.toString().toLocaleLowerCase() != 'rawcontactid'));
            arrToDisplay.forEach(element => {
                if (!!newResult[element] && !Array.isArray(newResult[element])) {
                    arr.push(<Text style={[styles.contactText]} key={element}>
                        {newResult[element]}
                    </Text>)
                } else if (!!newResult[element] && Array.isArray(newResult[element])) {
                    newResult[element].forEach((ele, i) => {
                        Object.keys(ele).forEach((e, index) => {
                            if (e != 'label') {
                                arr.push(<Text style={[styles.contactText]} key={i + '' + index + e}>
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

    // const {scan, scanResult, result} = state;

    return <View style={commonStyles.main_container}>
        <Fragment>
            <View style={commonStyles.item}>
                <View>
                    <Image style={commonStyles.logo} source={require('../images/logo.png')}></Image>
                </View>
                <View>
                    <Text style={commonStyles.default_text_size}>{!!scanResult ? 'Scan-in' : 'Scan QR Code'}</Text>
                </View>
            </View>
            {!scan && !scanResult ? <View style={styles.cardView}>
                {/* <Image
                    source={require('../assets/camera.png')}
                    style={{ height: 36, width: 36 }}
                /> */}
                <View >
                    <FontAwesomeIcon icon={faCamera} color='#0070c0' size={35} />
                </View>
                <Text numberOfLines={8} style={styles.descText}>
                    Please move your camera {'\n'} over the QR Code
                </Text>
                <Image
                    source={require('../assets/qrcode.png')}
                    style={{ margin: 20 }}
                />
                <TouchableOpacity
                    onPress={activeQR}
                    style={styles.buttonScan}>
                    <View style={[styles.buttonWrapper]}>
                        {/* <Image
                            source={require('../assets/camera.png')}
                            style={{ height: 36, width: 36 }}
                        /> */}
                        <View>
                            <FontAwesomeIcon icon={faCamera} color='#0070c0' size={35} />
                        </View>
                        <Text style={{ ...styles.buttonTextStyle, color: '#0070c0' }}>
                            Scan QR Code
                        </Text>
                    </View>
                </TouchableOpacity>
            </View> : null}
            {!!scanResult ? <Fragment>
                <View>
                    <View style={[commonStyles.styleQRCode]}>
                        <QRCode
                            value={JSON.stringify(result)}
                            size={normalize(250,2.5)}
                            color="gray"
                            logoSize={30}
                            logoMargin={2}
                            logoBorderRadius={10}
                            backgroundColor='transparent'
                        />
                        {/* <View style={styles.contactContainer}>
                        <ScrollView>
                            {prepareViewToRender()}
                        </ScrollView>
                    </View> */}
                    </View>
                    <View>
                        <View style={{ height: '60%' ,marginTop:20}}>
                            <ScrollView>
                                {contactCard(result, 'select')}
                            </ScrollView>
                        </View>
                        <View style={[commonStyles.bottomViewButtonThreeContainer]}>
                            <TouchableOpacity style={[commonStyles.bottomViewButtonThreeContainerStyle, { width: '15%' }]}
                                onPress={() => {
                                    onButtonPress('back')
                                }}
                            >
                                <View>
                                    <FontAwesomeIcon icon={faTimes} color='white' size={35} style={[commonStyles.bottomViewButton]} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.bottomViewButtonThreeContainerStyle, { width: '15%' }]}
                                onPress={() => {
                                    onButtonPress('foreword')
                                }}
                            >
                                <View>
                                    <FontAwesomeIcon icon={faPlay} color='white' size={35} style={commonStyles.bottomViewButton} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.bottomViewButtonThreeContainerStyle, { width: '55%' }]}
                                onPress={() => {
                                    onButtonPress('home')
                                }}
                            >
                                <View>
                                    <Text style={[commonStyles.default_text_size, commonStyles.whiteColor]}>Home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Fragment> : null}
            {!!scan ?
                <QRCodeScanner
                    reactivate={true}
                    showMarker={true}
                    ref={node => {
                        this.scanner = node;
                    }}
                    containerStyle={commonStyles.cameraContainer}
                    onRead={onSuccess}
                    topContent={<Text>
                        Please move your camera {'\n'} over the QR Code
                    </Text>}
                    bottomContent={<View>
                        <TouchableOpacity
                            onPress={() => this.scanner.reactivate()}
                            onLongPress={() => setScan(false)}>
                        </TouchableOpacity>
                    </View>}
                />

                : null}
        </Fragment>
    </View>;
}

// export default QRCodeScanning;