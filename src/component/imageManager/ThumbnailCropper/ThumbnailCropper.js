import React from 'react';
import ReactCrop from 'react-image-crop';
import FileInput from "../../../common/fileInput/FileInput";

const ThumbnailCropper = (props) => {

    return (
        <div style={{textAlign: 'center'}}>
            <div>
                <FileInput
                    file={props.file}
                    setFile={props.setFile}
                    customStyle={{
                        height: '325px',
                        padding: '150px 0px 0 40%',
                    }}
                />
            </div>
            <div style={{lineHeight: 0, display: 'block', padding: '10px 0 0 0'}}>
                <ReactCrop
                    src={props.readFile}
                    onImageLoaded={props.onImageLoaded}
                    crop={props.crop}
                    onChange={(c) => props.setCrop(c)}
                    onComplete={(c) => { props.setCompletedCrop(c)}}
                    onImageError={console.log}
                    keepSelection={true}
                    locked={true}
                    style={{
                        lineHeight: 0,
                        maxWidth: '1000px',
                    }}
                >
                    <span
                        className={`remove-article-banner`}
                        onClick={() => props.setFile(null)}
                        style={{zIndex: 5, bottom: '45px'}}
                    >
                        Remove
                    </span>
                </ReactCrop>
            </div>
            {
                props.readFile
                &&  <div className="thumbnail-cropper-canvas-container">
                        <canvas
                            ref={props.previewCanvasRef}
                            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                            style={{
                                width: Math.round(props.completedCrop?.width ?? 0),
                                height: Math.round(props.completedCrop?.height ?? 0),
                                maxWidth: '100%',
                                maxHeight: '100%',
                                lineHeight: 0,
                                display: 'block',
                            }}
                        />
                    </div>
            }
        </div>
    );
}

export default ThumbnailCropper;