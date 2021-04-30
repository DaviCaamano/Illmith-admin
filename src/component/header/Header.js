import React from 'react';
import '../../css/Header.css';

//img
import logo from '../../img/Logo Text.png'

import NavbarContainer from '../../container/header/NavContainer'

const Header = (props) => {

    return (
        <>
            <div id="header-top-shadow" />
            <div id="header">
                <img id="logo" src={logo} alt={''}/>
                <NavbarContainer/>
            </div>
        </>
    )
}

export default Header;