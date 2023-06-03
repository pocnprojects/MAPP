import React from 'react';
import Style from '../style'
import logo from '../assets/logo.png'
const Header = () =>{
    return(
        <div style={Style.header}>
            <img style={Style.image} src={logo} alt={'logo'}/>
        </div>
    )
}
export default Header