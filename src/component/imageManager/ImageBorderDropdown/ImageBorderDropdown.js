import React from 'react';

const ImageBorderDropdown = (props) => {

    return (
        <select
            className='file-uploader-border-select'
            value={props.borderStyle}
            onChange={(e) => (e) => props.setBorderStyle(e.target.value)}
        >
            <option value={'none'}>None</option>
            <option value={'border and staple'}>Border and Staple</option>
            <option value={'border and inner'}>Border and Inner Border</option>
            <option value={'border'}>Border</option>
            <option value={'staple'}>Staple</option>
        </select>
    )
}

export default ImageBorderDropdown;