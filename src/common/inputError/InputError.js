import React from 'react';

//img
import Exclamation from '../../resources/img/Exclamation Box.svg';

//css
import './InputError.css';

const InputError = (props) => {

    return (
        <div className='input-error-wrapper' >
            <div className={`input-error-container ${props.visible? '': 'd-none'}`} style={props.style}>
                <div className='input-error'>
                    {props.error
                    ?   <>
                            <img className='exclamation-svg' alt='Warning!' src={Exclamation} />
                            {props.error}
                        </>
                    :   null
                    }
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default InputError;