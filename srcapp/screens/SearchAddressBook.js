import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, AppState, StatusBar } from 'react-native';
import { SearchBar } from "react-native-elements";
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import Contacts from 'react-native-contacts';
import React, { useEffect, useRef, useState } from "react";
import commonStyles from '../stylesheet/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cacheContacts, refreshContacts, sortingCallback, syncRefreshContacts} from '../inAppHelper/contacts.helper'
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';


const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    }, textInputStyle: {
        height: 40, margin: 5, backgroundColor: '#FFFFFF', color: 'black'
    }, list_container: {
        flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',
    }, conditional_border_left: {
        borderLeftWidth: 1, borderLeftColor: '#808080', borderRightWidth: 1, borderRightColor: '#808080',
    }, conditional_border_right: {
        borderLeftWidth: 1, borderLeftColor: '#808080', borderRightWidth: 1, borderRightColor: '#808080'
    }, conditional_border_bottom: {
        borderBottomWidth: 1, borderBottomColor: '#808080'
    }, conditional_border_index0: {
        borderTopWidth: 1, borderBottomColor: '#808080'
    }
})

// const customData = require('./temp.json')

const CreateDataProvider = () => {
    return new DataProvider((r1, r2) => r1 !== r2)
}

const dimensionsForScreen = Dimensions.get('screen');
const dimensionsForWindow =Dimensions.get('window')
const statusBarHeight = StatusBar.currentHeight
const windowHeight=dimensionsForWindow.height-statusBarHeight

let arr = [];

export default function SearchAddressBook({ route, navigation }) {
    var fromWhichButton = route.params.fromButton
    const [contact, setContact] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const [dataProvider, setdataProvider] = useState(CreateDataProvider().cloneWithRows(filteredDataSource))

    useEffect(() => {
        getContactPermissions()
    }, [])

    useEffect(() => {
        setdataProvider(CreateDataProvider().cloneWithRows(filteredDataSource))
    }, [filteredDataSource])


    //IS Focus experiments

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {

            }
            appState.current = nextAppState;
            if (appState.current == 'active') {

                syncRefreshContacts().then((res) => {

                    res.sort((a, b) => sortingCallback(a,b))
                    setFilteredDataSource(res);
                }).catch(e => console.error(e))

            }
            setAppStateVisible(appState.current);

        });

        return () => {
            subscription.remove();
        };
    }, []);
    // useFocusEffect(
    //     React.useCallback(() => {
    //        console.log('Infocus')
    //     }, [navigation])
    // );

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log('In FOCUS')
    //         // The screen is focused
    //         // Call any action
    //     });
    //
    //     // Return the function to unsubscribe from the event so it gets removed on unmount
    //     return unsubscribe;
    // }, [navigation]);

    //IS FOCUS experiment end
    function Profile() {
        // This hook returns `true` if the screen is focused, `false` otherwise
        const isFocused = useIsFocused();

        return <Text>{isFocused ? 'focused' : 'unfocused'}</Text>;
    }


    getContactPermissions = async () => {
        
        try {
        
            //// MS changed this. Undefined was being recieved.
            await cacheContacts().then( async(res) => {
                //console.log("res printed from getContactPermissions", res)
                res.sort((a, b) => sortingCallback(a,b))
                setContact(res)
                setMasterDataSource(res)
                setFilteredDataSource(res)
                setdataProvider(CreateDataProvider().cloneWithRows(res));
            }).catch(e => console.error(e))

        } catch (e) {
            console.error(e)
        }
    }

    const searchFilterFunction = (text) => {
        if (text) {
            let searchText = text.replace(/\s/g, '')
            let regex = new RegExp(searchText.toString(), 'i');
            const newData = masterDataSource.filter(item => {
                return (regex.test(item.displayName.toString().replace(/\s/g, '')) || (!!item.phoneNumbers[0] && regex.test(item.phoneNumbers[0].number.toString().replace(/\s/g, ''))))
            })
            setFilteredDataSource(newData)
        } else {
            setFilteredDataSource(masterDataSource)
        }
        setSearch(text)
    }

    const _layoutProvider = new LayoutProvider(index => 0, (type, dim) => {
        dim.width = dimensionsForScreen.width - 40;
        dim.height = dimensionsForScreen.height / 13;
    })

    const renderList = (type, item, index) => {
        let backgroundColorStyle = {
            backgroundColor: 'transparent',
            borderRadius : 20,
            height : '100%'
        }
        if(index %2 == 0){
        backgroundColorStyle.backgroundColor = '#D3D3D3'
        }

        ///// MS changed this. Name attribute is different in iOS and Android; Was not appearing in iOS.
        //console.log("item from renderlist", item)


        return (item ?
            <View style={backgroundColorStyle}>
                <View ></View>
                <View style={{ height: '100%'}}>
                    <TouchableOpacity style={[commonStyles.addressbook_item]} onPress={() => { fromWhichButton == 'default' ? navigation.navigate('OpenContactNavigator', { item, fromWhichButton }) : navigation.navigate('QRCodeGeneratorNavigator', { item, fromWhichButton }) }}>
                        <View style={[commonStyles.list_text_addressBook_left]} >
                            <Text style={commonStyles.list_text_addressBook} numberOfLines={2} >{Platform.OS === 'ios' ? item.givenName + ' ' + item.middleName + ' ' + item.familyName : item.displayName}</Text>
                        </View>
                        {/* <View style={[commonStyles.list_text_addressBook_middle_border,{borderLeftWidth:1,borderLeftColor:'gray'}]}>
                        </View> */}
                        <View style={[commonStyles.list_text_addressBook_right]}>
                            <Text style={[commonStyles.list_text_addressBook]} numberOfLines={2} >{!!item.phoneNumbers.length ? item.phoneNumbers[0].number : ''}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View> : <View>
                <Text>No record found</Text>
            </View>)
    }

    const defineKey = (type, item, index) => {
        return item.recordID;
    }

    return (<View style={commonStyles.main_container}>
        <SafeAreaView >
            <View style={commonStyles.item}>
                <View>
                    <Image style={commonStyles.logo} source={require('../images/logo.png')}></Image>
                </View>
                <View>
                    <Text style={commonStyles.default_text_size}>Select {fromWhichButton == 'select' ? '& Share' : 'Default'}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <SearchBar
                    //style={styles.textInputStyle}
                    onChangeText={(text) => {
                        searchFilterFunction(text)
                    }}
                    value={search}
                    placeholder="Search Here"
                    lightTheme
                    round
                    searchIcon={{ size: 24, color: 'black' }}
                    autoCorrect={false}
                    inputStyle={{ color: 'black' }}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent',
                        paddingLeft : 0,
                        paddingRight : 0
                    }}

                />
            </View>
            <View style={{ width: dimensionsForScreen.width, height: windowHeight - windowHeight*.15}}>
                {
                    filteredDataSource.length != 0 ?
                        <RecyclerListView
                            layoutProvider={_layoutProvider}
                            dataProvider={dataProvider}
                            rowRenderer={(type, data, index) => renderList(type, data, index)}
                            key={(type, data, index) => defineKey(type, data, index)}
                        /> :
                        <Text>No data</Text>
                }
            </View>
        </SafeAreaView>
    </View>

    )
}