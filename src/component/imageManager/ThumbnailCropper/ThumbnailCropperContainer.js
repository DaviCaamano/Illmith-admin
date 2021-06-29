import React, { useState, useRef, useEffect, useCallback } from 'react';

//Component
import ThumbnailCropper from "./ThumbnailCropper";

//css
import 'react-image-crop/dist/ReactCrop.css';

const   defaultConfig = { unit: 'px' };
const ThumbnailCropperContainer = (props) => {

    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
        ...defaultConfig
    });
    const [removeFileVisible, setRemoveFileVisible] = useState(false);

    const imgRef = useRef(null);

    // const onLoadRectangle = useCallback((image) => {
    //
    //     const { width, height } = image;
    //     let dimensions = height > width
    //         ? { width: width, height: width / 2}
    //         : { width: Math.min(width, height*2), height: Math.min(width, height*2) / 2};
    //
    //     setCrop({
    //         x: (width - dimensions.width) /2,
    //         y: (height - dimensions.height) /2,
    //         ...defaultConfig,
    //         ...dimensions
    //     });
    //     imgRef.current = image;
    //     props.setCompletedCrop({
    //         x: (width - dimensions.width) /2,
    //         y: (height - dimensions.height) /2,
    //         ...defaultConfig,
    //         ...dimensions
    //     });
    //     return false;
    //
    // // eslint-disable-next-line
    // }, []);

    const onLoad = useCallback((image) => {

        const { width, height } = image;
        let dimensions = height > width
            ? { width: width, height: width }
            : { width: height, height: height };

        setCrop({
            x: (width - dimensions.width) /2,
            y: (height - dimensions.height) /2,
            ...defaultConfig,
            ...dimensions
        });
        imgRef.current = image;
        props.setCompletedCrop({
            x: (width - dimensions.width) /2,
            y: (height - dimensions.height) /2,
            ...defaultConfig,
            ...dimensions
        });
        return false;

        // eslint-disable-next-line
    }, []);


    useEffect(() => {

        if (!props.completedCrop || !props.previewCanvasRef.current || !imgRef.current) return;

        const image = imgRef.current;
        const canvas = props.previewCanvasRef.current;
        const crop = props.completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    // eslint-disable-next-line
    }, [props.completedCrop]);

    return (
       <ThumbnailCropper
           file={props.file}
           setFile={props.setFile}
           readFile={props.readFile}
           crop={crop}
           previewCanvasRef={props.previewCanvasRef}
           onImageLoaded={onLoad}
           setCrop={setCrop}
           completedCrop={props.completedCrop}
           setCompletedCrop={props.setCompletedCrop}
           removeFileVisible={removeFileVisible}
           setRemoveFileVisible={setRemoveFileVisible}
       />
    )
}

export default ThumbnailCropperContainer;