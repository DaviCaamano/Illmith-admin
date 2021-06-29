import {useEffect} from 'react';
import {useParams} from "react-router-dom";

import codes from "../resources/data/codes";
const CompletePasswordReset = (props) => {

    const { token } = useParams();

    const sendPasswordResetToken = () => {

        if(props.isLoggedIn()){

            props.alert(codes.Error.ResetPassword.logoutRequired.message)
        }
        else {


            props.setLoginModalVisible(false);
            props.setStage(2);
            props.setToken(token);
            props.setResetPasswordVisible(true);
        }
    }
    // eslint-disable-next-line
    useEffect(sendPasswordResetToken, []);

    const { stage, setResetPasswordVisible } = props;

    const hideModal = () => { setResetPasswordVisible(true); }
    useEffect(hideModal, [stage, setResetPasswordVisible]);

    return null;
}

export default CompletePasswordReset;