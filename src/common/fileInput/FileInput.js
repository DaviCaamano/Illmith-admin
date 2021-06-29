import React from 'react';

const FileInput = (props) => {

    const onChange = props.onChange
        ?props.onChange
        :(e) => {

            e.persist();
            props.setFile(e.target.files[0]);
        }

    return (
        <div className={`form-group files ${props.file? 'd-none': ''}`} style={{ margin: '0px'}}>
            {props.borderDropdown}
            <input
                className={'form-control'}
                type="file"
                multiple=""
                onChange={onChange}
                style={props.customStyle}
            />
        </div>
    )
}

export default FileInput;