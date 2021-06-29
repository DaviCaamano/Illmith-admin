import React from 'react';

import { useSelector } from 'react-redux';

//css
import './Header.css';

//resources
import getElements from './utils/navbarElements';

//components
import Navbar from './navbar/Navbar';
import NavbarUserInfo from './navbar/navbarUserInfo/NavbarUserInfo';

//context
import {UserContextConsumer} from '../../context/UserContext';
import logo from "../../resources/img/header logo.webp";
import {Link} from "react-router-dom";

const Header = (props) => {

    const navElements = useSelector(state => getElements(state.user && state.user.admin));

    /**
     <NavAlertContainer
     visible={props.navVisible}
     setVisible={props.setNavVisible}
     content={props.navContent}
     setContent={props.setNavContent}
     />
     */
    return (
        <div id={"header"}>
            <table id='header-table'>
                <tbody>
                    <tr>
                        <td id='header-left'>
                            <Link to={'/'}>
                                <img id="logo" src={logo} alt={''}/>
                            </Link>
                        </td>
                        <td id='header-center'>
                            <Navbar navElements={navElements} />
                        </td>
                        <td id='header-right'>
                            <UserContextConsumer>
                                {({raiseLoginModal, handleLogout}) =>
                                    <NavbarUserInfo
                                        raiseLoginModal={raiseLoginModal}
                                        handleLogout={handleLogout}
                                    >
                                        <span>Logout</span>
                                    </NavbarUserInfo>
                                }
                            </UserContextConsumer>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}
export default Header;

