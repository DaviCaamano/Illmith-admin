import React from 'react';

//Component
import LoadingModal from "./LoadingModal";

//css
import './LoadingModal.css';

const LoadingModalContainer = (props) => {

    return (
        <LoadingModal
            visible={props.visible}
            zIndex={1000}
        />
    )
}

export default LoadingModalContainer;