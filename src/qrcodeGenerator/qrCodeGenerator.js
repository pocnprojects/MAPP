import React from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'react-qr-code';
import globalStyle from '../style';

const QrCodeGenerator = (props) =>{
//console.log(process.env, process.env.REACT_APP_BASEURL)
    let contactDetailObject = JSON.parse(props.contactDetails)
    console.log(contactDetailObject)
    let contactData = `${process.env.REACT_APP_BASEURL}${encodeURIComponent(props.contactDetails)}`;
    //console.log(contactData)
    return(
        <div style={globalStyle.qrcodeStyle}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={contactData}
                viewBox={`0 0 256 256`}
            />
        </div>
    )
}
export default QrCodeGenerator;