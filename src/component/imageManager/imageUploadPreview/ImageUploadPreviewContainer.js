import React, {useState} from 'react';

import ImageUploadPreview from "./ImageUploadPreview";

const ImageUploadPreviewContainer = (props) => {

    const [removeFileVisible, setRemoveFileVisible] = useState(false);

    return (
        <ImageUploadPreview
            file={props.file}
            setFile={props.setFile}
            removeFileVisible={removeFileVisible}
            setRemoveFileVisible={setRemoveFileVisible}
        />
    )
}

export default ImageUploadPreviewContainer;