import React from 'react';

//Containers
import ImageUpload from "../../../common/image/ImageUpload/ImageUpload";
import ToggleSwitch from "../../../common/toggleSwitch/ToggleSwitch";

const ImageManagerFileUpload = (props) => {

    let buttons;
    if(props.file) {


        if(props.readFile && props.isThumbnailUpload) {

            const   uploadThumbnail = () => props.submitThumbnail(props.previewCanvasRef.current, props.completedCrop),
                    buttonDisable = !props.completedCrop?.width || !props.completedCrop?.height,
                    downloadCrop = () => props.downloadCrop(props.previewCanvasRef.current, props.completedCrop);
            buttons = (
                <>
                    <button
                        onClick={uploadThumbnail}
                        style={{
                            width: '75%',
                            borderRadius: '0 0 0 8px',
                            marginBottom: '-20px'
                        }}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        disabled={buttonDisable}
                        onClick={downloadCrop}
                        style={{width: '25%', borderRadius: '0 0 8px 0'}}
                    >
                        Download cropped image
                    </button>
                </>
            )
        }
        else buttons = <button onClick={() => props.submit()} style={{width: '100%'}}>Submit</button>;
    }

    return (
        <div className="image-manager-file-wrapper">
            <div style={{margin: '10px 0 10px 10px'}}>
                <ToggleSwitch
                    checked={props.isThumbnailUpload}
                    toggle={() => props.setIsThumbnailUpload(!props.isThumbnailUpload)}
                    size={46}
                    onColor='#c0a333'
                    offColor='#282c34'
                    style={{marginLeft: '10px', marginTop: '4px'}}
                />

                <label htmlFor="image-manager-new-thumbnail-checkbox">Thumbnail</label>
            </div>
            <ImageUpload
                noPreview={!!props.isThumbnailUpload}
                file={props.file}
                setFile={props.setFile}
                readFile={props.readFile}
                isThumbnailUpload={props.isThumbnailUpload}
                setIsThumbnailUpload={props.setIsThumbnailUpload}
                previewCanvasRef={props.previewCanvasRef}
                completedCrop={props.completedCrop}
                setCompletedCrop={props.setCompletedCrop}
                customStyle={{
                    height: '325px',
                    padding: '150px 0px 0 40%',
                }}
            />
            {buttons}
        </div>
    )
}

export default ImageManagerFileUpload;