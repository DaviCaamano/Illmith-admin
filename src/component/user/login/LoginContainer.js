import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { login, flagAdmin } from '../../../redux/users';
import { useHistory } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import {useCookies} from "react-cookie";

//Components
import ModalContainer from '../../../common/modal/modal/ModalContainer';
import Login from './Login';

import codes, {getCode} from '../../../resources/data/codes'

const LoginUserContainer = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [cookies] = useCookies(['token'])

    const [warning, setWarning] = useState('');
    const [loginUser, setLoginUser] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [userInputError, setUserInputError] = useState('');
    const [passwordInputError, setPasswordInputError] = useState('');

    const firstRender = useRef(true)
    const hideLoginModal = () => props.setLoginModalVisible(false);

    const swapToRegistration = () => {

        props.setLoginModalVisible(false);
    }

    const swapToResetPassword = () => {

        props.setLoginModalVisible(false);
        props.setResetPasswordVisible(true)
    }

    const handleUserInputChange = (e) => setLoginUser(e.target.value);

    const handlePasswordInputChange = (e) => setLoginPassword(e.target.value);

    const handleRememberCheck = (e) => setRemember(e.target.checked);

    const handleLogin = (event) => {

        event.preventDefault();

        if(!loginUser) setUserInputError(codes.Error.Login.userFieldEmpty.message)
        if(!loginPassword) setPasswordInputError(codes.Error.Login.passwordFieldEmpty.message);
        if(!loginUser || !loginPassword) return;

        axios({
            method:'post',
            url: process.env.REACT_APP_API_URL + '/users/authorizedLogin',
            data: {
                user: loginUser,
                password: loginPassword,
                remember
            }
        }).then(resp => {

            let data = resp.data;
            const decoded = jwtDecode(data.token)
            dispatch(login(decoded.email, decoded.username))
            if(decoded.admin) dispatch(flagAdmin());

            props.setLoginCookies(data.token, data.tokenExpiration);

            props.setLoginModalVisible(false)

            history.push('/');
        }).catch((err) => {

            if(err && err.response && err.response.status === 429){

                setWarning(codes.Error.Login.tooManyAttempts.message)
            } else if(err && err.response && err.response.data){

                //Invalid Login Information
                if(err.response.data.code){
                    setWarning(getCode(err.response.data.code)?.message ?? 'Internal Error')
                }
            } else {
                setWarning(codes.Error.Login.generic.message);
            }
        })
    }

    /** On Site Load User Validation */
    const validate = () => {

        if(cookies.token)
            axios({
                method:'get',
                url: process.env.REACT_APP_API_URL + '/users/authorize',
                headers: { auth: cookies.token }
            }).then(resp => {

                let data = resp.data;
                const decoded = jwtDecode(data.token)
                dispatch(login(decoded.email, decoded.username))
                if(decoded.admin) dispatch(flagAdmin());
            }).catch((err) => {

                if(err && err.response && err.response.data){

                    //Invalid Login Information
                    if(err.response.data.code){
                        props.alert(getCode(err.response.data.code).message)
                    }
                } else {
                    props.alert(getCode('NA_LGN').message);
                }
                props.handleLogout();
            })
    }
    // eslint-disable-next-line
    useEffect(validate, []);
    /** End of User Validation */

    //Clear warnings when reopening login.
    // eslint-disable-next-line
    useEffect(() => {
        if(firstRender) firstRender.current = false;
        else setWarning('')
    }, [props.modalVisible])

    return (
        <>
            <ModalContainer
                visible={props.modalVisible}
                setVisible={props.setModalVisible}
                width={'700px'}
            >
                <Login
                    submit={ handleLogin }
                    warning={warning}
                    username={ loginUser }
                    handleUserInputChange={ handleUserInputChange }
                    password={ loginPassword }
                    handlePasswordInputChange={ handlePasswordInputChange }
                    hideModal={ hideLoginModal }
                    remember={ remember }
                    handleRememberCheck={ handleRememberCheck }
                    swapToRegistration={swapToRegistration}
                    swapToResetPassword={swapToResetPassword}
                    userInputError={userInputError}
                    passwordInputError={passwordInputError}
                    setUserInputError={setUserInputError}
                    setPasswordInputError={setPasswordInputError}
                />
            </ModalContainer>
        </>
    )
}

export default LoginUserContainer;