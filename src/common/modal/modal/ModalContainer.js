import React, {useRef} from 'react';

//components
import Modal from './Modal'

//css
import './Modal.css'

const ModalContainer = (props) => {

    let modalSize = {};
    if(props.modalSize) modalSize = props.modalSize;
    else {

        if(props.height) modalSize.height = props.height;
        if(props.width) modalSize.width = props.width;
        if(props.maxHeight) modalSize.maxHeight = props.maxHeight;
        if(props.maxWidth) modalSize.maxWidth = props.maxWidth;
        if(props.minHeight) modalSize.minHeight = props.minHeight;
        if(props.minWidth) modalSize.minWidth = props.minWidth;
    }

    const backdropRef = useRef(null);
    const transitionFuncs = {
        onEnter: (e) => backdropRef.current.classList.remove('d-none'),
        onExit: (e) => backdropRef.current.classList.add('d-none')
    };

    /**
     * Function which checks if the parent would like to control if clicking the backdrop causes the modal to close.
     * if props.onBackdropClose(e) is defined and returns false, the modal will not close.
     * @param e, event
     */
    const onBackdropClick = (e) => {

        //If props.onBackdropClose is not defined or if it is and it returns true;
        if(!props.onBackdropClick || (props.onBackdropClick && props.onBackdropClick(e)))
            props.setVisible(false);
    }
    return (
        <Modal
            visible={props.visible}
            setVisible={props.setVisible}
            modalSize={modalSize}
            backdropRef={backdropRef}
            transitionFuncs={transitionFuncs}
            onBackdropClick={onBackdropClick}
            zIndex={props.zIndex}
        >
            {props.children}
        </Modal>
    )
}

export default ModalContainer;