import {Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = {
    scrollViewStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#2196f3',
        height: deviceHeight,
        maxHeight: deviceHeight
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '10%',
        paddingLeft: 15,
        paddingTop: 10,
        width: deviceWidth,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 24,
        color: 'black',
    },
    textTitle1: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        padding: 16,
        color: 'white',
    },
    cardView: {
        width: deviceWidth - 32,
        height: deviceHeight - 350,
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: '10%',
        //backgroundColor: 'white',
    },
    scanCardView: {
        width: deviceWidth - 32,
        height: deviceHeight - 350,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        //backgroundColor: 'white',
        // color: 'black',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        padding:10
    },
    buttonScan: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#0070c0',
        width:'50%',
        // paddingTop: 5,
        // paddingRight: 25,
        // paddingBottom: 5,
        // paddingLeft: 25,
        // marginTop: 20,
    },
    buttonScan2: {
        marginLeft: deviceWidth / 2 - 50,
        width: 100,
        height: 100,
    },
    descText: {
        padding: 16,
        textAlign: 'center',
        fontSize: 16,
        color:'black'
    },
    highlight: {
        fontWeight: '700',
    },
    centerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        padding: 32,
        color: 'white',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    bottomContent: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        width: deviceWidth,
        height: 120,
        position: 'absolute',
        bottom: 0,
    },
    buttonTouchable: {
        fontSize: 21,
        backgroundColor: 'white',
        marginTop: 32,
        width: deviceWidth - 62,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
    },
    buttonTextStyle: {
        color: 'black',
        fontWeight: 'bold',
    },
    buttonBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // position: 'absolute',
        // bottom: deviceHeight * .05,
        height : '20%',
        width : '100%'
    },
    subButtonBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width : '50%'

    },
    button: {
        borderRadius: 5,
        padding: 3
    },
    container: {
        flex: 1,
        margin: 10,
        marginTop: 30,
        padding: 30,
    },
    buttonGPlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc4e41',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonFacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0070c0',
        // backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 60,
        borderRadius: 5,
        margin: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'stretch',
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
    },
    // buttonBackAndArrowContainer : {
    //     width : deviceWidth,
    //     padding : deviceWidth * .05
    // },
    homeButtonContainer : {
        width : '50%',
        flex : 1,
        justifyContent : 'center',
        paddingRight: 5,
    },
    contactText : {
        fontSize : 20,
        color: '#000000'
    },
    contactContainer : {
        width : '100%',
        height : '100%',
        flex : 5,
        justifyContent : 'center',
        paddingLeft : deviceWidth * .05,
    },
    headder : {
        flex : 1,
        width : '100%',
        justifyContent : 'space-evenly',
        flexDirection : 'row',
        alignItems : 'center'
    },
    headerText : {
        fontSize : deviceHeight*.029,
        color: '#000000'
    },
    cameraBox : {
        height :deviceHeight/2,
        width : deviceWidth/2
    }
};
export default styles;
