import React from 'react';
import {Link} from "react-router-dom";

//img
import back_button from "../../../resources/img/back button.svg";
import {ReactComponent as CircleCheck} from "../../../resources/img/circle check.svg";

//Components
import InputErrorContainer from "../../../common/inputError/InputErrorContainer";

const PasswordReset = (props) =>{

    const bulletStyle = {height: '14px', width: '14px', position: 'relative', bottom: '1px'}, passwordBullets = [
            props.passwordValidation.hasSixCharacters
                ? <CircleCheck style={bulletStyle}/>
                : <>&#8226;</>,
            props.passwordValidation.hasCorrectCase
                ? <CircleCheck style={bulletStyle}/>
                : <>&#8226;</>,
            props.passwordValidation.hasNumber
                ? <CircleCheck style={bulletStyle}/>
                : <>&#8226;</>
        ],
        passwordBulletsColors = [
            props.passwordValidation.hasSixCharacters ? 'green' : 'black',
            props.passwordValidation.hasCorrectCase ? 'green' : 'black',
            props.passwordValidation.hasNumber ? 'green' : 'black'
        ],
        bulletSpanStyle = {display: 'inline-block', width: '20px', textAlign: 'center'};

    return <form
        id="reset-password-form"
        onSubmit={ props.submit }
    >
        <div className={`user-title ${props.stage === 2? 'd-none': ''}`} style={{marginBottom: '25px'}}>
            <b className={'user-title-right'}>
                <Link
                    className={'title-link'}
                    to={'#'}
                    onClick={props.swapToLogin}
                >
                    <img
                        src={back_button}
                        style={{
                            height: '16px',
                            marginBottom: '3px'
                        }}
                        alt={'Back to Login'}
                    /> Login
                </Link>
            </b>
        </div>

        <label htmlFor="reset-password-input">
            <b>{props.stage === 2 ? 'Enter your new password' : 'Enter your username or account email'}</b>
        </label>
        <br/>
        <InputErrorContainer error={props.warning} setError={props.setWarning}>
            <input
                id={'reset-password-input'}
                type={props.stage === 2? "password": "text"}
                placeholder={props.stage === 2 ? 'New Password' : 'Username or account email'}
                name="email"
                required
                value={props.user}
                onChange={props.inputChange}
            />
        </InputErrorContainer>
        <br />
        <button
            id={'reset-password-button'}
            type="submit"
        >
            Request Reset
        </button>

        <div className={`reset-password-infobox ${props.stage === 2? '': 'd-none'}`}>

            Your Password must contain at least:
            <br/>
            <span style={{color: passwordBulletsColors[0]}}>
                <span style={bulletSpanStyle}>{passwordBullets[0]}</span>6 characters
            </span>
            <br/>
            <span style={{color: passwordBulletsColors[1]}}>
                <span style={bulletSpanStyle}>{passwordBullets[1]}</span>1 upper and lower case letter
            </span>
            <br/>
            <span style={{color: passwordBulletsColors[2]}}>
                <span style={bulletSpanStyle}>{passwordBullets[2]}</span>1 number
            </span>
        </div>
    </form>
}



export default PasswordReset;
