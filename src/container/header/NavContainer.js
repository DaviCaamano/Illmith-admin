import React from 'react';

//Redux
import store from '../../redux'
import { useSelector } from 'react-redux';

//data
import getElements from '../../data/navbarElements';

//components
import Navbar from '../../component/header/Navbar';
import NavbarUserInfo from '../../component/header/NavbarUserInfo';

//context
import {UserContextConsumer} from '../../context/UserContext';

const NavbarContainer = (props) => {

    const navElements = useSelector(state => getElements(state.user && state.user.admin));

    console.log('navElements');
    console.log(navElements);
    console.log(store.getState().user);
    console.log(store.getState().user.admin);
    return (
        <>
            <Navbar navElements={navElements} />
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
        </>
    );
}
export default NavbarContainer;

