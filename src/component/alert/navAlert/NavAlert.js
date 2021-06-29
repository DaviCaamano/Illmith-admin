import React from 'react';
import {CSSTransition} from "react-transition-group";

//css
import './NavAlert.css'

const NavAlert = (props) => {

    return (
        <div id="nav-alert-transition-container">
            <CSSTransition
                in={props.visible}
                timeout={750}
                classNames={'animate-nav'}
                onExited={() => props.setContent(null)}
            >
                <div id="nav-alert-container" >
                    <div id="nav-alert-background-container">
                        <div id="nav-alert-background" />
                    </div>
                    <div id="nav-alert-content">
                        {props.content}
                    </div>
                    <span id="nav-alert-dismiss" onClick={() => props.setVisible(false)}>dismiss</span>
                </div>
            </CSSTransition>
        </div>
    )
}

export default NavAlert;