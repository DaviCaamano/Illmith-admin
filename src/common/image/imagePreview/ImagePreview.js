import React from 'react';

//css
import './ImagePreview.css';

const ImagePreview = (props) => {

    let borders;
    if(props.fileStyle === 'border')
        borders = ( <div className="preview-banner-border"/>)
    else if(props.fileStyle === 'staple')
        borders =  (<div className="preview-banner-staples"/>)

    else if(props.fileStyle === 'border and inner')
        borders = (
            <>
                <div className="preview-banner-border"/>
                <div className="preview-banner-border inner"/>
            </>
        )
    else if(props.fileStyle === 'border and staple')
        borders = (<>
            <div className="preview-banner-border"/>
            <div className="preview-banner-staples"/>
        </>)
    else borders = ( <></> )

    return (
        <div className="preview-banner-container" >
            <div className="preview-banner-image-container">
                <img
                    className="preview-banner"
                    src={props.file? URL.createObjectURL(props.file): null}
                    alt={'articleEditor thumbnail'}
                />
                {borders}
            </div>
        </div>
    )
}

export default ImagePreview