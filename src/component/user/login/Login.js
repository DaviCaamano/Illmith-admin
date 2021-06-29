import React from 'react';
import {Link} from "react-router-dom";

//component
import InputErrorContainer from "../../../common/inputError/InputErrorContainer";

const Login = (props) =>
    <form
        id="login-form"
        onSubmit={ props.submit }
    >
        <div className={'user-title'}>
            <b>Login</b>
        </div>


        <label htmlFor="login-username-input">
            <b>Username or Email</b>
        </label>
        <InputErrorContainer error={props.userInputError} setError={props.setUserInputError}>
            <input
                id={'login-username-input'}
                type="text"
                placeholder="Username or Email"
                name="username"
                value={props.username}
                onChange={props.handleUserInputChange}
            />
        </InputErrorContainer>

        <label htmlFor="login-password-input">
            <b>Password</b>
        </label>
        <InputErrorContainer
            error={props.passwordInputError}
            setError={props.setPasswordInputError}
            style={{top: 'calc(100% + 8px)'}}
        >
            <input
                id={'login-password-input'}
                type="password"
                placeholder="Password"
                name="password"
                value={props.password}
                onChange={props.handlePasswordInputChange}
                style={{ marginBottom: 0 }}
            />
        </InputErrorContainer>
        <span id={'login-warning'}>
            {props.warning}
        </span>
        <button
            id={'login-button'}
            type="submit"
        >
            Login
        </button>

        <label htmlFor={'remember-checkbox'} >
            <input
                id={'remember-checkbox'}
                type="checkbox"
                checked={props.remember}
                onChange={props.handleRememberCheck}
                name="remember-checkbox"
            />&nbsp;Remember me
        </label>

        <div  style={{'backgroundColor' : '#f1f1f1', padding: '16px', marginTop: '30px'}}>
            <button
                type="button"
                onClick={props.hideModal}
                className="login-cancel-btn"
            >
                Cancel
            </button>

            <span className="psw">
                <Link to="#" onClick={props.swapToResetPassword}>Forgot password?</Link>
            </span>
        </div>
    </form>


export default Login;
