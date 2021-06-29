import React from 'react';

const DarkFrame = (props) => {

    let outerStyle = {};
    let innerStyle = {};
    if(props.style) outerStyle = props.style;
    if(props.innerStyle) innerStyle = props.innerStyle;
    return(
        <div id={props.id} className='dark-frame' style={outerStyle}>
            <div className={'inner-dark-frame'} style={innerStyle}>
                {props.children}
            </div>
        </div>
    )
}

export default React.memo(DarkFrame);