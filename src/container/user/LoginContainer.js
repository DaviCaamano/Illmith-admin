import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, flagAdmin } from '../../redux/users';
import { useHistory } from "react-router-dom";

//Components
import ModalContainer from '../../container/modal/ModalContainer';
import LoginModal from '../../component/user/LoginModal';

import codes, {getCode} from '../../data/codes'
import axios from "axios";
import {useCookies} from "react-cookie";

const LoginUserContainer = (props) => {

    const history = useHistory()
    const dispatch = useDispatch();
    const [cookies] = useCookies(['token'])

    console.log(cookies);
    const [warning, setWarning] = useState('');
    const [loginUser, setLoginUser] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const hideLoginModal = () => props.setLoginModalVisible(false);

    const swapToRegistration = () => {

        props.setLoginModalVisible(false);
        props.setUserRegistrationModalVisible(true)
    }

    const swapToResetPassword = () => {

        props.setLoginModalVisible(false);
        props.setResetPasswordVisible(true)
    }

    const handleUserInputChange = (e) => setLoginUser(e.target.value);

    const handlePasswordInputChange = (e) => setLoginPassword(e.target.value);

    const handleRememberCheck = (e) => setRemember(e.target.checked);

    const handleLogin = (event) => {

        console.log(0)
        event.preventDefault();

        axios({
            method:'post',
            url: process.env.REACT_APP_API_URL + '/users/login',
            data: {
                user: loginUser,
                password: loginPassword,
                remember
            }
        }).then(resp => {

            let data = resp.data;
            dispatch(login(data.email, data.username))
            if(data.admin) dispatch(flagAdmin());
            props.setLoginCookies(data.token, data.tokenExpiration);
            props.setLoginModalVisible(false)

            history.push('/');
        }).catch((err) => {

            if(err.response.status === 429){

                setWarning(codes.Error.Login.tooManyAttempts.message)
            } else if(err && err.response && err.response.data){

                //Invalid Login Information
                if(err.response.data.code){
                    setWarning(getCode(err.response.data.code).message)
                }
            } else {
                setWarning(getCode('NA_LOGIN').message);
            }
        })
    }

    /** On Site Load User Validation */
    const validate = () => {

        if(cookies.token)
            axios({
                method:'post',
                url: process.env.REACT_APP_API_URL + '/users/validate',
                data: {
                    token: cookies.token
                }
            }).then(resp => {

                let data = resp.data
                dispatch(login(data.email, data.username))
                if(data.admin) dispatch(flagAdmin());

            }).catch((err) => {

                if(err && err.response && err.response.data){

                    //Invalid Login Information
                    if(err.response.data.code){
                        props.alert(getCode(err.response.data.code).message)
                    }
                } else {
                    props.alert(getCode('NA_LOGIN').message);
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

        setWarning('')
    }, [props.modalVisible])

    return (
        <>
            <ModalContainer
                visible={props.modalVisible}
                setVisible={props.setModalVisible}
                width={'700px'}
            >
                <LoginModal
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
                    onExit
                />
            </ModalContainer>
        </>
    )
}

export default LoginUserContainer;