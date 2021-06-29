import React from 'react';


const visibleStyle = {
    transition: 'max-height 0.2s ease-out, padding 0.2s ease-out',
    maxHeight: '5000px',
    padding:0,
    margin: 0,
    overflow: 'hidden',
}

const invisibleStyle = {
    transition: 'max-height 0.2s ease-out, padding 0.2s ease-out',
    maxHeight: 0,
    padding:0,
    margin: 0,
    overflow: 'hidden',
}

const Collapse = (props) =>
    <div
        id={props.id}
        className={props.className}
        style={props.visible
            ?   { ...props.style, ...visibleStyle}
            :   { ...props.style, ...invisibleStyle}
        }>
            {props.children}
    </div>

export default Collapse;