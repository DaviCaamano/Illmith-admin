import React from 'react';

const ToggleDiv = (props) =>
    <div
        id={props.id}
        className={props.className}
        style={props.visible
            ?   { ...props.style}
            :   { ...props.style, display: 'none'}
        }>
        {props.children}
    </div>

export default ToggleDiv;