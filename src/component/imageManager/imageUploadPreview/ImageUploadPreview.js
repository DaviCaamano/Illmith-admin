import React from 'react';

//Components
import ImagePreview from "../../../common/image/imagePreview/ImagePreview";

const ImageUploadPreview = (props) => {

    return (
        <div className='article-banner-container'>
            <div className='preview-container'
                onMouseEnter={() => {props.setRemoveFileVisible(true)}}
                onMouseLeave={() => {props.setRemoveFileVisible(false)}}
                style={{position: 'relative'}}
            >
                <ImagePreview
                    file={props.file}
                    fileStyle={props.borderStyle}
                />
                <span
                    className={`remove-article-banner`}
                    onClick={() => props.setFile(null)}
                >Remove</span>
            </div>
        </div>
    )
}

export default ImageUploadPreview;