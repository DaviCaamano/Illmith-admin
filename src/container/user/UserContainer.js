import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';

//containers
import LoginContainer from './LoginContainer';
import RegisterUserContainer from './RegisterUserContainer';
import CompleteUserRegistration from './CompleteUserRegistration';
import PasswordResetContainer from './PasswordResetContainer';
import CompletePasswordReset from './CompletePasswordReset';

//contexts
import { UserContextConsumer } from '../../context/UserContext';
import { AlertConsumer } from '../../context/AlertContext';
//css
import '../../css/Login.css'



const UserContainer = (props) => {


    const [resetPasswordStage, setResetPasswordStage] = useState(1);
    const [resetPasswordToken, setResetPasswordToken] = useState('');

    return (
        <AlertConsumer>
            {(alert) => (
                <UserContextConsumer>
                    { context => (
                        <>
                            <LoginContainer
                                handleLogout={context.handleLogout}
                                modalVisible={context.loginModalVisible}
                                setModalVisible={context.setLoginModalVisible}
                                setLoginModalVisible={context.setLoginModalVisible}
                                setUserRegistrationModalVisible={context.setUserRegistrationModalVisible}
                                setResetPasswordVisible={context.setResetPasswordVisible}
                                setLoginCookies={context.setLoginCookies}
                                alert={alert.alert}
                            />
                            <RegisterUserContainer
                                modalVisible={context.userRegistrationModalVisible}
                                setModalVisible={context.setUserRegistrationModalVisible}
                                setUserRegistrationModalVisible={context.setUserRegistrationModalVisible}
                                setLoginModalVisible={context.setLoginModalVisible}
                                alert={alert.alert}
                                confirm={alert.confirm}
                            />
                            <PasswordResetContainer
                                modalVisible={context.resetPasswordVisible}
                                setModalVisible={context.setResetPasswordVisible}
                                setResetPasswordVisible={context.setResetPasswordVisible}
                                setLoginModalVisible={context.setLoginModalVisible}
                                stage={resetPasswordStage}
                                token={resetPasswordToken}
                                resetPasswordToken={resetPasswordToken}
                                alert={alert.alert}
                            />
                            <Switch>
                                <Route path="/user/CompleteUserRegistration/:token">
                                    <CompleteUserRegistration setLoginCookies={context.setLoginCookies} />
                                </Route>
                                <Route path="/user/CompletePasswordReset/:token">
                                    <CompletePasswordReset
                                        isLoggedIn={context.isLoggedIn}
                                        setLoginModalVisible={context.setLoginModalVisible}
                                        setUserRegistrationModalVisible={context.setUserRegistrationModalVisible}
                                        stage={resetPasswordStage}
                                        setStage={setResetPasswordStage}
                                        setResetPasswordVisible={context.setResetPasswordVisible}
                                        setToken={setResetPasswordToken}
                                        alert={alert.alert}
                                    />
                                </Route>
                            </Switch>
                        </>)
                    }
                </UserContextConsumer>
            )}
        </AlertConsumer>
    )
}

export default UserContainer