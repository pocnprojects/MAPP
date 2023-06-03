import React from 'react';
import Style from '../style'
import footerLogo from '../assets/playStoreLogo.png'
const Footer = () =>{
    return(
        <div style={Style.footer}>
            <img style={Style.image} src={footerLogo} alt={'logo'}/>
        </div>
    )
}
export default Footer