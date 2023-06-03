import React, {useRef, useState} from 'react';
import {QrReader} from 'react-qr-reader'
import globalStyle from '../style'
import {Button} from '@mui/material';

const QrScanner = (props) => {
    const [data, setData] = useState('No result');
    const [facingMode,setFacingMode] = useState('environment')
    function closeScanner(){
        props.closeQR(false)
    }
    return (
        <div>
            {
                !!props.parentScanningState ?
                    <div>
                        <QrReader
                            id='QRReader'
                            onResult={(result, error) => {
                                console.log('RESULT',result,process.env.REACT_APP_BASEURL)
                                const globalRegex = new RegExp(process.env.REACT_APP_BASEURL, 'i');
                                const httpsRegex = new RegExp(process.env.REACT_APP_BASEURL, 'i');
                                if (!!result && !!result.text && globalRegex.test(result.text)) {
                                    console.log('INSIDE')
                                    let res = result?.text;
                                    res = res.replace(process.env.REACT_APP_BASEURL ,'')
                                    res = decodeURIComponent(res);
                                    setData(res);
                                    props.scannedData(res)
                                    props.closeQR(false)
                                }else if (!!result && !!result.text && httpsRegex.test(result.text) && !globalRegex.test(result.text)){
                                    console.log(result.text)
                                    alert('Invalid Rebu URL')
                                }
                                if (!!error) {
                                    console.info(error);
                                }
                            }}
                            style={{width: '100%', marginBottom : '10%'}}
                            constraints={{facingMode: facingMode}}
                        />
                        <Button variant='contained' id='closeScanner' onClick={closeScanner} style={globalStyle.marginBox}> Close Scanner </Button>
                    </div>:
                    ''
            }
        </div>
    );
}
export default QrScanner