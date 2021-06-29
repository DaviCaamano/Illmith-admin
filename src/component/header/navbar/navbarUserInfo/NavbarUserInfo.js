import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//components
import UserMenuContainer from '../userMenu/UserMenuContainer';

const NavbarUserInfo = (props) => {

    const {email, username} = useSelector(state => state.user);
    const loggedIn = email || username;
    const name = username && username !== 'null'
        ? username
        :email? email.split('@')[0]: null;

    return (
        <div id={'navbar-user-widget'} >
            { loggedIn
                ?   //If Logged in
                <UserMenuContainer
                    handleLogout={props.handleLogout}
                    items={props.items}
                    name={name}
                />
                :   //If Logged out
                <Link
                    to={'#'}
                    className={`header-element`}
                    onClick={props.raiseLoginModal}
                >
                    <span
                        className={'logged-user-greeting'}
                        style={{lineHeight: '57px'}}
                    >Login</span>
                </Link>
            }
        </div>
    )

}

export default NavbarUserInfo;