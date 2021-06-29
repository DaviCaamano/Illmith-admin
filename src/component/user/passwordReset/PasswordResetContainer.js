import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";

//Components
import ModalContainer from '../../../common/modal/modal/ModalContainer';
import PasswordResetModal from './PasswordReset';

//Data
import codes, {getCode} from "../../../resources/data/codes";

const PasswordResetContainer = (props) => {

    const history = useHistory()
    const [input, setInput] = useState('');
    const [warning, setWarning] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        hasSixCharacters: false,
        hasCorrectCase: false,
        hasNumber: false,
    })


    const validatePassword = () => {

        const hasEnoughLetters = (new RegExp("(?=.{6,})")).test(input);
        const hasNumber = (new RegExp("(?=.*[0-9])")).test(input);
        const hasLowercase = (new RegExp("(?=.*[a-z])")).test(input);
        const hasUppercase = (new RegExp("(?=.*[A-Z])")).test(input);

        setPasswordValidation({
            hasSixCharacters: hasEnoughLetters,
            hasCorrectCase: hasLowercase && hasUppercase,
            hasNumber: hasNumber,
        });
    }

    const passwordIsValidated = (validations = passwordValidation) =>
        validations.hasSixCharacters
        && validations.hasCorrectCase
        && validations.hasNumber;

    const swapToLogin = () => {

        props.setResetPasswordVisible(false)
        props.setLoginModalVisible(true);
    }

    const handleInputChange = (e) => {

        if(props.stage === 2) validatePassword();
        setInput(e.target.value);
    }

    const handleInitialRequest = (event) => {

        event.preventDefault();

        axios({
            method:'get',
            url: process.env.REACT_APP_API_URL + '/users/resetPassword',
            params: { user: input }
        })
            .then((resp) => {

                setInput('');
                swapToLogin();
                props.alert(codes.ResetPassword.emailSent.message)
            })
        .catch((err) => {

                if(err && err.response && err.response.data){

                    //Invalid Login Information
                    if(err.response.data.code){
                        props.alert(getCode(err.response.data.code))

                    }
                } else {
                    props.alert(codes.Error.ResetPassword.generic.message)
                }
            }
        )
    }

    const handleFinalRequest = (event) => {

        event.preventDefault();
        if(passwordIsValidated()){

            axios({
                method:'post',
                url: process.env.REACT_APP_API_URL + '/users/resetPassword',
                data: { 
                    password: input,
                    token: props.token,
                }
            })
                .then((resp) => {

                    setInput('');
                    setWarning('');
                    props.setResetPasswordVisible(false);
                    history.push('/');
                    props.alert(codes.ResetPassword.success.message)

                })
                .catch((err) => {

                        if(err && err.response && err.response.data){

                            //Invalid Login Information
                            if(err.response.data.code){
                                props.alert(getCode(err.response.data.code))

                            }
                        } else {
                            props.alert(codes.Error.ResetPassword.generic.message)
                        }
                    }
                )
        } else {

            setWarning(codes.Error.UserRegistration.invalidPassword.message);
        }

    }
    const onBackdropClick = () => false;
    return (
            <ModalContainer
                visible={props.modalVisible}
                setVisible={props.setModalVisible}
                height={(props.stage === 1)? '300px': '450px'}
                width={'700px'}
                onBackdropClick={onBackdropClick}
            >
                <PasswordResetModal
                    stage={props.stage}
                    submit={ props.stage === 1? handleInitialRequest: handleFinalRequest }
                    input={ props.input }
                    inputChange={ handleInputChange }
                    swapToLogin={swapToLogin}
                    passwordValidation={passwordValidation}
                    warning={warning}
                    setWarning={setWarning}
                />
            </ModalContainer>
    )
}

export default PasswordResetContainer;