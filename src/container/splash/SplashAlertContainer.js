import React from 'react';
import {CSSTransition} from "react-transition-group";
import SplashAlert from '../../component/splash/SplashAlert';

const SplashAlertContainer = (props) => {

    // useEffect(() => {
    //     setTimeout(() => {
    //
    //         props.setContent(<b>Heeeyyyooooo</b>)
    //         props.setVisible(prev => !prev)
    //     }, 500)
    //
    //     setTimeout(() => {
    //
    //         props.setVisible(prev => !prev)
    //     }, 3000)
    //
    // }, []);

    return(
        <div style={{ width: '100%', height: '100%', zIndex: -5}}>
            <CSSTransition
                in={props.visible}
                timeout={750}
                classNames={'animate-splash'}
            >
                <SplashAlert content={props.content}/>
            </CSSTransition>
        </div>
    )
}

export default SplashAlertContainer;