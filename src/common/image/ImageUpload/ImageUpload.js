import React from 'react';

//Containers
import ThumbnailCropperContainer from "../../../component/imageManager/ThumbnailCropper/ThumbnailCropperContainer";

//Component
import ImageUploadPreviewContainer from "../../../component/imageManager/imageUploadPreview/ImageUploadPreviewContainer";
import FileInput from "../../fileInput/FileInput";
import ImageBorderDropdown from "../../../component/imageManager/ImageBorderDropdown/ImageBorderDropdown";

//css
import './ImageUpload.css';

const ImageUpload = (props) => {

    let borderDropdown = props.borderStyle
        ? <ImageBorderDropdown borderStyle={props.borderStyle} setBorderStyle={props.setBorderStyle} />
        : null

    let display = props.isThumbnailUpload
        ? ( <ThumbnailCropperContainer
            file={props.file}
            setFile={props.setFile}
            readFile={props.readFile}
            previewCanvasRef={props.previewCanvasRef}
            completedCrop={props.completedCrop}
            setCompletedCrop={props.setCompletedCrop}
        /> )
        : !props.file
        ?(
            <FileInput
                file={props.file}
                setFile={props.setFile}
                borderDropdown={borderDropdown}
                customStyle={props.customStyle}
            />
        )
        : !props.noPreview
        ?(
            <>
                {borderDropdown}
                <ImageUploadPreviewContainer
                    file={props.file}
                    setFile={props.setFile}
                    borderStyle={props.borderStyle}
                />
            </>
        )
        : null;

    return (
        <form method="post" action="#" id="#">
            <label>{props.label}</label>
            { display }
            {props.children}
        </form>
    )
}

export default ImageUpload;