import React, { useState, useEffect } from 'react';

//Components
import InputError from "./InputError";

const InputErrorContainer = (props) => {

    const [visible, setVisible] = useState(!!props.error);

    const style = { ...props.style};
    if(props.top) {

        style.bottom = 'unset';
        style.top = props.top;
    }
    if(props.bottom) {

        style.top = 'unset';
        style.bottom = props.bottom;
    }
    if(props.left) {

        style.right = 'unset';
        style.left = props.left;
    }
    if(props.right) {

        style.left = 'unset';
        style.right = props.right;
    }

    useEffect(() => {

        if(props.error) setVisible(true);
        const dropAlert = () => {

            props.setError('');
            setVisible(false)
        };
        window.addEventListener("mousedown", dropAlert);
        return () => window.removeEventListener("mousedown", dropAlert);
    // eslint-disable-next-line
    }, [props.error])

    return (
        <InputError error={props.error} visible={visible} style={style} >
            {props.children}
        </InputError>
    )
}

export default InputErrorContainer;