import { height } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { Dimensions, PixelRatio, StyleSheet } from 'react-native'
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

export function normalize(size, dividend = 2.2) {
    let x = PixelRatio.getFontScale()
    let y = PixelRatio.get()
    const multiplayer = (x * y) / dividend
    //console.log(PixelRatio.getFontScale(), PixelRatio.get())
    return size / multiplayer

}

export default globalStyle = StyleSheet.create({
    defaultRecScreen: {
        //alignSelf: 'center',
        //alignItems: 'center',
        //backgroundColor: '#FFFFFF',
        flex: 1,
        //flexDirection: 'column',
        //justifyContent: 'center',
        //width:'100%'
        padding:parseFloat(normalize(20)),
        height:windowHeight,
        backgroundColor:'white'
    },
    firstScreen: {
        // flex: 1,
        backgroundColor: "#385998",
        flex: 1,
        padding: parseFloat(normalize(20)),
        height:windowHeight,
    },
    shareQRScreen: 
    {
        //alignItems: 'center', 
        //backgroundColor: '#FFFFFF', 
        flex: 1,
        //alignSelf: 'center',  
        //justifyContent: 'space-between',
        padding:parseFloat(normalize(20)),
        height:windowHeight,
        backgroundColor:'white'
    },
    customShareScreen:{
            // flex: 1,
            backgroundColor: "white",
            flex: 1,
            padding: parseFloat(normalize(20)),
            height:windowHeight,
    },
    scanQRScreen:{
        flex: 1,
        padding:parseFloat(normalize(20)),
        height:windowHeight,
        backgroundColor:'white'
    },
    customShareDataContainer:{
        paddingLeft:parseFloat(normalize(10)),
        marginTop:parseFloat(normalize(35))
    },
    displayNameStyle:{
        fontWeight:600,
        fontSize:parseFloat(normalize(20)),
        lineHeight:parseFloat(normalize(24))
    },
    containerInside: {
         //backgroundColor: '#385998',
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        width:'70%',
        alignSelf:'center'
    },
    buttonSmallest:
    {
        //alignSelf: 'center',
        height: parseFloat(normalize(25)),
        borderRadius: parseFloat(normalize(24)),
        justifyContent: 'center',
    },

    button:
    {
        // position: "absolute",
        // alignSelf: 'center',
        // width: 366,
        // height: 119,
        // backgroundColor: "#385998",
        // borderRadius: 24,
        // justifyContent: 'center',
        backgroundColor:'#385998',
        borderRadius:parseFloat(normalize(24)),
        //padding:parseFloat(normalize(20)),
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        marginTop:parseFloat(normalize(32))
    },
    buttonText:
    {
        //position: "absolute",
        fontStyle: "normal",
        fontWeight: parseFloat((parseInt(normalize(400)/100)*100)),
        fontSize: parseFloat(normalize(32)),
        lineHeight: parseFloat(normalize(38)),
        color: '#FFFFFF',
        paddingLeft: parseFloat(normalize(10)),
        alignSelf: 'flex-start'
    },
    triangleForward: {
        width: parseFloat(normalize(0)),
        height: parseFloat(normalize(0)),
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: parseFloat(normalize(30)),
        borderRightWidth: parseFloat(normalize(30)),
        borderBottomWidth: parseFloat(normalize(40)),
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: '#FFFFFF',
        transform: [{ rotate: "90deg" }],
        alignSelf: 'flex-end'
    },
    triangleBackward: {
        width: parseFloat(normalize(0)),
        height: parseFloat(normalize(0)),
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: parseFloat(normalize(30)),
        borderRightWidth: parseFloat(normalize(30)),
        borderBottomWidth: parseFloat(normalize(40)),
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: '#FFFFFF',
        transform: [{ rotate: "-90deg" }],
        alignSelf: 'flex-end'
    },
    qcIcon: {
        //position: 'absolute',
        alignSelf: 'center',
        marginTop: parseFloat(normalize(107)),
        height: parseFloat(normalize(211)),
        width: parseFloat(normalize(166))
    },
    qcTitle: {
        //position: 'absolute',
        alignSelf: 'center',
        //fontWeight: normalize(700),
        fontWeight:'bold',
        fontStyle: "normal",
        fontSize: parseFloat(normalize(64)),
        lineHeight: parseFloat(normalize(75)),
        color: '#FCD589',
        marginTop:parseFloat(normalize(10)),
    },
    defDefineText: {
        //alignSelf: 'center',
        fontWeight: 200,
        fontStyle: "normal",
        fontSize: parseFloat(normalize(20)),
        //    lineHeight: 23,
        color: '#FFFFFF',
    },
    signUpScreen:
    {
        //alignItems: 'center', 
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: parseFloat(normalize(20)),
        //paddingTop:0,
        //alignSelf: 'center',  
        //justifyContent: 'space-evenly',
        height:windowHeight
    },
    screenTitle:
    {
        //alignSelf: 'flex-start',
        //padding: 30,
        //paddingLeft:0,
        paddingLeft: parseFloat(normalize(10)),
        //width: 366,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: parseFloat(normalize(32)),
        color: '#C89E4B',
        //backgroundColor: 'red',
        // borderLeftWidth:2,
        // borderLeftColor:'black'
    },
    textFieldsContainerStyle: {
        //backgroundColor:'blue',
        marginTop:parseFloat(normalize(20)),
        marginBottom:parseFloat(normalize(20)),
        // borderLeftWidth:2,
        // borderLeftColor:'black',
    },
    textFieldsStyle:{
        height: parseFloat(normalize(40)),
        margin: parseFloat(normalize(12)),
        borderWidth: parseFloat(normalize(3)),
        //padding: parseFloat(normalize(10)),
        borderRadius:parseFloat(normalize(12)),
        marginLeft:parseFloat(normalize(7)),
        borderColor:'#385998',
        color:'black',
        padding:0,
        paddingLeft:18,
        paddingRight:18,
        //fontSize:parseFloat(normalize(16))
        //fontWeight:'bold'
    },
    textFieldsLabelsStyle:{
        marginLeft:parseFloat(normalize(10)),
        marginBottom:parseFloat(normalize(-10)),
        color:'black',
        fontSize:parseFloat(normalize(16))
        //fontWeight:'bold'
    },
    pickerStyle:{
        height: parseFloat(normalize(40)),
        margin: parseFloat(normalize(12)),
        borderWidth: parseFloat(normalize(3)),
        borderRadius:parseFloat(normalize(12)),
        marginLeft:parseFloat(normalize(7)),
        justifyContent:'center',
        borderColor:'#385998',
    },
    messageText:
    {
        alignSelf: 'center',
        //fontWeight: 'bold',
        fontStyle: "normal",
        fontSize: parseFloat(normalize(18)),
        color: 'black',
        paddingLeft: parseFloat(normalize(5)),
        paddingRight: parseFloat(normalize(7)),
        flexShrink:1,
    },
    // inputStyle: {
    //     marginTop: 20,
    //     width: 320,
    //     height: 40,
    //     paddingHorizontal: 10,
    //     borderRadius: 25,
    //     borderWidth: 1,
    //     borderColor: "#385998",
    //     backgroundColor: '#FFFFFF',
    //     color: 'black',
    // },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        //alignSelf: 'flex-start',
        //justifyContent:'space-between',
        paddingVertical: parseFloat(normalize(1)),
        paddingLeft: parseFloat(normalize(8)),
        flexShrink:1,
    },
    bottomButtonsContainer:{
        flex: 1,
        flexDirection:'column',
        position:'absolute',
        width:'100%',
        bottom:parseFloat(normalize(10)),
        alignSelf:'center',
        justifyContent:'space-around',
        //height : '20%',
        paddingLeft:parseFloat(normalize(10)),
        paddingRight:parseFloat(normalize(10))
    },
    bottomButtonsContainerStyle:{
        borderRadius: parseFloat(normalize(12)),
        paddingLeft:parseFloat(normalize(20)),
        paddingRight:parseFloat(normalize(20)),
        backgroundColor: "#385998",
        justifyContent:'center',
        alignItems:'center',
        marginTop:parseFloat(normalize(10))
    },
    checkBoxStyle:{
        true:'#385998',
        false:'#385998'
    },
    rightMargin:{
        //marginRight:parseFloat(normalize(95)),
        
    },
    rightArrowIcon: {
        color:'white',
    },
    screenSummary:
    {
        alignItems: 'flex-start',
        paddingBottom:45,
        //backgroundColor: 'red', 
        //flex: 1,
        maxHeight: 120,
        minHeight:'15%',
        marginTop:parseFloat(normalize(22)),
        marginBottom:parseFloat(normalize(41)),
        paddingLeft:parseFloat(normalize(10)),
        paddingRight:parseFloat(normalize(10))
    },
    screenDescription:
    {
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: parseFloat(normalize(16)),
        color: "#000000",
        marginBottom:parseFloat(normalize(7))
        //alignSelf: "center",
        //justifyContent: 'center',
        //paddingLeft: 6,
        //paddingRight: 6,
    },
    aboveQRScreenText:{
        fontSize:parseFloat(normalize(16)),
        fontWeight:600,
        lineHeight:parseFloat(normalize(18))
    },
    styleQRCode:
    {
        // /backgroundColor: 'red', 
        alignSelf: 'center',
        marginBottom:parseFloat(normalize(16))
    },
    notSobottomButtonsContainer:{
        // /flex: 1,
        flexDirection:'column',
        //position:'absolute',
        width:'100%',
        //bottom:parseFloat(normalize(10)),
        alignSelf:'center',
        justifyContent:'space-around',
        marginTop:parseFloat(normalize(21)),
        paddingLeft:parseFloat(normalize(10)),
        paddingRight:parseFloat(normalize(10))
    },
    addressbookSearchContainerStyle:{
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingLeft : 0,
        paddingRight : 0,
        marginTop:parseFloat(normalize(32)),
        marginBottom:parseFloat(normalize(17)),
    },
    addressbookSearchInputStyle:{
        flexDirection:'row-reverse',
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#385998',
        borderBottomColor:'#385998',
        borderBottomWidth:1,
    },
    blackColor:{
        color:'black'
    },
    whiteColor:{
        color:'white'
    },
    horizontalLine:{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop:parseFloat(normalize(7)),
    },
    horizontalLine2:{
        borderTopColor: 'black',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    item: {
        width: '100%', // is 50% of container width
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        fontStyle : 'normal',
        fontWeight : 400,
        fontSize : 16,
        lineHeight : 19,
        color : '#000000',
        marginTop:parseFloat(normalize(12))
        // height : '10%',
        // borderWidth: 1
    },
    checkBoxItemText:{
        fontSize:parseFloat(normalize(16)),
        padding:parseFloat(normalize(10)),
        paddingLeft:parseFloat(normalize(0)),
        fontWeight:400,
        lineHeight:parseFloat(normalize(19)),
        color:'black',
    },
    checkBoxItemRight1:{
        width:'90%',
        textAlign:'left',
        //backgroundColor:'red'
    },
    checkBoxItemLeft1:{
        //backgroundColor:'red',
        width:'10%',
        textAlign:'center'
    },
    checkBoxStyle2:{
        true:'#999999',
        false:'#999999'
    },
    touchAbleOpacityStyle2:{
        flex:1,flexDirection:'row',
        width:'90%'
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
    checkBoxDisabledStyle:{
        true:'#d3d3d3',
        false:'#d3d3d3'
    },
    contactContainer : {
        justifyContent : 'center',
        //paddingLeft : deviceWidth * .05,
        marginTop:16,
    },
    contactText : {
        fontSize : parseFloat(normalize(16)),
        fontWeight:600,
        color: '#000000',
        paddingLeft:parseFloat(normalize(10)),
        paddingRight:parseFloat(normalize(10))
    },
})