import React, {useEffect, useState} from 'react';

let Splash = (props) => {

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), [])

    return (
        <div id={'splash-box'}>
            <div
                id={'firstBox'}
                className={'splash'
                    + (props.active === 0? ' splash-active': '')
                    + (mounted? ' articleManager-transition': '')}
                 style={{ backgroundImage: `url("${props.previewImage1}")` }}
            />
            <div
                id={'secondBox'}
                className={'splash'
                    + (props.active === 1? ' splash-active': '')
                    + (mounted? ' articleManager-transition': '')}
                style={{ backgroundImage: `url("${props.previewImage2}")` }}
            />
            {props.children}
        </div>
    )
}

export default Splash;