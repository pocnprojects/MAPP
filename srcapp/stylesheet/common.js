import { height } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import {Dimensions, PixelRatio, StyleSheet} from 'react-native'
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

export function normalize(size, dividend = 2.2) {
    let x = PixelRatio.getFontScale()
    let y = PixelRatio.get()
    const multiplayer = (x*y)/dividend
    console.log(PixelRatio.getFontScale(), PixelRatio.get())
    return size/multiplayer

}
export default commonStyles = StyleSheet.create({
    logo: {
        width: deviceHeight *.15,
        height: deviceHeight *.04,
    },
    main_container: {
        padding: 20,
        flex: 1,
        height : windowHeight,
        //borderWidth : 1
    },
    checkBoxItemLeft:{
        width:'35%',
        textAlign:'left'
    },
    checkBoxItemMiddle:{
        width:'65%',
        textAlign:'left'
    },
    checkBoxItemRight:{
        width:'10%',
        textAlign:'right'
    },
    checkBoxItemLeft1:{
        //backgroundColor:'red',
        width:'10%',
        textAlign:'center'
    },
    checkBoxItemRight1:{
        width:'90%',
        textAlign:'left',
        //backgroundColor:'red'
    },
    checkBoxItemText:{
        fontSize:normalize(20),
        padding:10
    },
    contactItemText:{
        fontSize:normalize(16),
        padding:10
    },
    item: {
        width: '100%', // is 50% of container width
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        // height : '10%',
        // borderWidth: 1

    },
    default_text_size: {
        fontSize:normalize(26),
        color: 'gray',
        padding: 10,
    },
    blackColor:{
        color:'black'
    },
    whiteColor:{
        color:'white'
    },
    list_text_left: {
        width: '50%',
        height:'100%',
        //paddingRight: '10%',
        // borderRightWidth: 1,
        // borderRightColor: '#808080'
    },
    list_text_right: {
        width: '50%',
        textAlign: 'right',
        height:'100%',
    },
    list_text: {
        color: 'black',
        fontSize: normalize(20),
        padding:10
    },
    addressbook_item:{
        flex:1,
        flexDirection:'row'
    },
    list_text_addressBook_left: {
        justifyContent:'center',
        width: '60%',
        padding:10
    },
    list_text_addressBook_right: {
        width: '40%',
        justifyContent:'center',
        padding:5
    },
    list_text_addressBook_middle_border:{
        width:'2%'
    },
    list_text_addressBook: {
        color: 'black',
        fontSize: normalize(16),
    },
    checkBoxStyle:{
        true:'#0070c0',
        false:'#0070c0'
    },
    checkBoxDisabledStyle:{
        true:'#d3d3d3',
        false:'#d3d3d3'
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
      },
    bottomViewButtonContainer:{
        flex: 1,
        flexDirection:'row',
        position:'absolute',
        bottom:10,
        alignSelf:'center',
        width: '100%',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: "#0070c0",
    },
    bottomViewTwoButtonContainer:{
        flex: 1,
        flexDirection:'row',
        position:'absolute',
        width:'100%',
        bottom:10,
        alignSelf:'center',
        justifyContent:'space-evenly',
        //backgroundColor:'red',,
        //  borderWidth: 1,
        alignItems : 'center',
        height : '10%'

    },
    bottomViewTwoButtonContainerStyle:{
        borderRadius: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: "#0070c0",
        justifyContent:'center',
        alignItems:'center'
    },
    bottomViewButton: {
        padding: 10,
        verticalAlign:'middle',
        backgroundColor : '#0070c0'
    },
      topBorder:{
        borderTopColor:'gray',
        borderTopWidth:1,
        marginLeft:8,
        marginRight:8
    },
    bottomBorder:{
        borderBottomColor:'gray',
        borderBottomWidth:1,
        marginLeft:8,
        marginRight:8
    },
    bottomBorder2:{
        borderBottomColor:'gray',
        borderBottomWidth:1,
        // width : '90%',
        // marginLeft : '5%'
    },
    button_text: {
        color: 'white',
        fontSize: normalize(24),
    },
    rightArrowIcon: {
        color:'white',
    },
    touchAbleOpacityStyle:{
         padding: 10,
         borderRadius: 10,
         backgroundColor: '#0070c0',
         marginTop: 20,
    },
    contactCardLeftView:{
        width: '80%',
        justifyContent:'center'
    },
    contactCardRightView:{
        width:'20%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    contactCardRightView2:{
        width:'20%',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    styleQRCode:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        alignItems : 'center',
        // paddingTop:50,
        // paddingBottom:50,
        height : '30%',
        //borderWidth: 1,
        // margin : '10%'
        marginTop : '5%',
        marginBottom : '5%',
    },
    touchAbleOpacityStyle2:{
        flex:1,flexDirection:'row',
        width:'90%'
    },
    touchAbleOpacityStyle3:{
        padding: 10,
        borderRadius: 10,
        //backgroundColor: '#0070c0',
        marginTop: 20,
   },
    qrCodeCardText: {
        color: 'gray',
        fontSize: normalize(24),
        width:'120%',
    },
    cameraContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    bottomViewButtonThreeContainer:{
        flex: 1,
        flexDirection:'row',
        position:'absolute',
        width:'100%',
        bottom:10,
        alignSelf:'center',
        justifyContent:'space-around',
        //backgroundColor:'red',
    },
    bottomViewButtonThreeContainerStyle:{
        borderRadius: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: "#0070c0",
        justifyContent:'center',
        alignItems:'center'
    },
    bottomViewButtonFourContainer:{
        flex: 1,
        flexDirection:'column',
        position:'absolute',
        width:'100%',
        bottom:10,
        alignSelf:'center',
        justifyContent:'space-around',
        //backgroundColor:'red',
    },
    bottomViewButtonFourContainerStyle:{
        borderRadius: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: "#0070c0",
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    contactDetailScrollView : {
        height : '45%',
        //borderWidth: 1,
        marginTop : '5%',
        marginBottom : '5%',

    }
})