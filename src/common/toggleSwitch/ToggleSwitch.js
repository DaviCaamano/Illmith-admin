import React from 'react';

//css
import './ToggleSwitch.css';


const Check = (
    <svg className='toggle-switch-check' viewBox="-2 -5 17 21" >
        <path
            d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0"
            fill="#fff"
            fillRule="evenodd"
        />
    </svg>
);

const d2 = "M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 " +
    "7.072 4.95 9.9 2.12"
const DiagonalCross = (
    <svg className='toggle-switch-cross' viewBox="-2 -5 14 20" >
        <path

            d={d2}
            fill="#fff"
            fillRule="evenodd" />
    </svg>
)
const ToggleSwitch = (props) => {

    return (
        <div
            className={`toggle-container ${props.checked? 'checked': ''} ${props.className || ''}`}
            onClick={props.toggle}
            style={{
                width: props.size? props.size + 'px': '56px',
                height: props.size? (props.size / 2) + 'px':'28px',
                border: props.checked
                    ? props.onColor? `1px solid ${props.onColor}`:'1px solid #c0a333'
                    : props.onColor? `1px solid ${props.offColor}`:'1px solid #282c34',
                backgroundColor: props.checked
                    ? props.onColor || '#c0a333'
                    : props.offColor || '#282c34',
                ...props.style
            }}
        >
            {Check}
            {DiagonalCross}
            <div className={`dialog-button ${props.checked ? 'checked' : ''}`} />

        </div>
    )
}

export default ToggleSwitch;