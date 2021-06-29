import React from 'react';
import { CSSTransition } from 'react-transition-group';

//css
import './Modal.css'

const Modal = (props) => {

    return (
        <div
            className={`modal-backdrop d-none`}
            ref={props.backdropRef}
            onClick={props.onBackdropClick}
            style={props.zIndex? { zIndex: props.zIndex }: {}}
        >
            <CSSTransition
                in={props.visible}
                unmountOnExit
                timeout={300}
                classNames={'animate'}
                {...props.transitionFuncs}
            >
                <div
                    className='modal-container'
                    style={props.modalSize? { ...props.modalSize }: {}}
                    onClick={(e) => {e.stopPropagation();}}
                >
                    <div className="modal">
                        {props.children}
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Modal;