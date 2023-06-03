import React, {useState} from 'react';


import {Button, Image, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CustomShareDetails = ({ navigation }) => {

    const initialItemState = {
        displayName: "Abhishek Tripathi",
        phoneNumber: "+91 9876543210",
        OfficialEmailAddress: "abhishek@xyz.com",
        PersonalEmailAddress: "abhishek@xyz.com",
        offAddress: "1229 B Galli no 13, Govindpuri, Kalka Ji, 110019",
        perAddress: '1229 B Galli no 13, Govindpuri, Kalka Ji, 110019'

    }
    const [nameBool, setNameBool] = useState(false);
    const [mobilebool, setMobileBool] = useState(false);
    const [offEmailbool, setOffEmailBool] = useState(false);
    const [perEmailbool, setPerEmailBool] = useState(false);
    const [offAddrbool, setOffAddrBool] = useState(false);
    const [perAddrbool, setPerAddrBool] = useState(false);

   
    const [contactObject,setContactObject]=useState({})


    function handleButtonPress(e) {
        let res={}
        let temp = false
        nameBool ? (()=>{
            res.displayName = initialItemState.displayName
            
        })() : false
        mobilebool ? (()=>{
            res.phoneNumber = initialItemState.phoneNumber
            
            
        })() : false
        offEmailbool ? (()=>{
            res.OfficialEmailAddress = initialItemState.OfficialEmailAddress
            console.log(res.OfficialEmailAddress)
            
        })() : false
        perEmailbool ? (()=>{
            res.PersonalEmailAddress = initialItemState.PersonalEmailAddress
            console.log(res.PersonalEmailAddress)
            
        })() : false
        offAddrbool ? (()=>{
            res.offAddress = initialItemState.offAddress
            
        })() : false
        perAddrbool ? (()=>{
            res.perAddress = initialItemState.perAddress
            
        })() : false
        
        if(Object.keys(res).length > 0)
        return navigation.navigate('QrGenerator', { initialItemState: res })
         else {
            ToastAndroid.showWithGravity(
                'Please Select at least 1 Value',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              )
         }
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.container}>
                <View style={styles.item}>
                    <View>
                        <Image style={styles.logo} source={require('./logo.png')}></Image>
                    </View>
                    <View>
                        <Text style={styles.default_text_size}>Custom Share Details</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 2, borderColor: 'gray' }}>
                    <View style={{ borderTopWidth: 2, marginTop: 10, borderColor: 'gray' }}>
                        <TouchableOpacity >
                            <View style={[styles.item]}>
                                <Text style={[styles.list_text]}>Name</Text><Text style={[styles.list_text, styles.list_text_right]}>{initialItemState.displayName}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={nameBool}
                                    onValueChange={(newValue) => {
                                        setNameBool(newValue)
                                    }}
                                    tintColors={{ true: 'gray', false: '#009ad0' }}

                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 2, borderColor: 'gray' }}>
                        <TouchableOpacity >
                            <View style={[styles.item]}>
                                <Text style={[styles.list_text]}>Off Mobile</Text><Text style={[styles.list_text, styles.list_text_right]}>{initialItemState.phoneNumber}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={mobilebool}

                                    onValueChange={(newValue) => setMobileBool(newValue)}
                                    tintColors={{ true: 'gray', false: '#009ad0' }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 2, borderColor: 'gray' }}>
                        <TouchableOpacity >
                            <View style={[styles.item]}>
                                <Text style={[styles.list_text]}>Off Email</Text><Text style={[styles.list_text, styles.list_text_right]}>{initialItemState.OfficialEmailAddress}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={offEmailbool}
                                    onValueChange={(newValue) => setOffEmailBool(newValue)}
                                    tintColors={{ true: 'gray', false: '#009ad0' }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 2, borderColor: 'gray' }}>
                        <TouchableOpacity >
                            <View style={[styles.item]}>
                                <Text style={[styles.list_text]}>Per Email</Text><Text style={[styles.list_text, styles.list_text_right]}>{initialItemState.PersonalEmailAddress}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={perEmailbool}
                                    onValueChange={(newValue) => setPerEmailBool(newValue)}
                                    tintColors={{ true: 'gray', false: '#009ad0' }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 2, borderColor: 'gray' }}>
                        <TouchableOpacity >
                            <View style={[styles.item]}>
                                <Text style={[styles.list_text]}>Off Adrr</Text><Text style={[styles.list_text, styles.list_text_right]}>{initialItemState.offAddress}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={offAddrbool}
                                    onValueChange={(newValue) => setOffAddrBool(newValue)}
                                    tintColors={{ true: 'gray', false: '#009ad0' }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopWidth: 2, borderColor: 'gray' }}>
                        <TouchableOpacity >
                            <View style={[styles.item]}>
                                <Text style={[styles.list_text]}>Per Adrr</Text><Text style={[styles.list_text, styles.list_text_right]}>{initialItemState.perAddress}</Text>
                                <CheckBox
                                    disabled={false}
                                    value={perAddrbool}
                                    onValueChange={(newValue) => setPerAddrBool(newValue)}
                                    tintColors={{ true: 'gray', false: '#009ad0' }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.bottomView} >
                    <TouchableOpacity
                        // style={styles.button_style}
                        onPress={() => navigation.navigate('QrGenerator',{initialItemState:initialItemState})}
                    >

                        <Text style={styles.textStyle}>Continue</Text>
                    </TouchableOpacity>

                </View> */}

                 <View style={styles.btncontainer}>
                    <View style={styles.buttonContainer}>
                        
                        <Button title="Continue" onPress={handleButtonPress} />
                    </View>
                </View> 
          


            </View>
        </SafeAreaView >
    );
}

export default CustomShareDetails;

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 60,
    },
    top: {
        marginTop: 20
    },
    item: {
        width: '100%', // is 50% of container width
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    default_text_size: {
        fontSize: 26,
        fontWeight: "bold",
        color: 'gray',
        padding: 10,
    },
    container: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        // marginTop:30
        // padding: 24,
    },
    row: {
        // marginTop: 10,
        padding: 1,
        // borderBottomColor: 'black',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: 2,
        borderColor: 'gray'
    }, list_text: {
        color: 'black',
        padding: 10,
        fontSize: 18,
        flex: 1,
        flexWrap: "wrap",
        alignSelf: 'flex-start'
    }, list_text_left: {


        // borderRightWidth: 1,
        // borderRightColor: '#808080'
    },
   textStyle: {

        color: '#fff',
        fontSize: 22
    },

    btncontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 10,
        width: "100%",
        
        
    },
    buttonContainer: {
        flex: 1,   
        height:50
    },
   

});