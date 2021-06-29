import React  from 'react';

/**

 * @param props
 *  * props
 *      id - [any]: A value to be passed back to the parent for this cell.
 *      onEscape - [function]: function that runs on escape key press.
 *          Changes done to the cell will be canceled on escape even if a callback is not provided.
 *      onEnter - [function]: function that runs on enter key press.
 *      onKeyDown - [function]: function that runs on any key press.
 *      onClick - [function]: function that runs on click.
 *          Event propagation is always stopped (event.stopPropagation) even if no call back is provided.
 *      onFocus - [function]: function that runs when the cell is focused.
 *      onBlur - [function]: function that runs when the cell loses focus.
 *      onEnterOnly - [boolean]: if true, onBlur will also cancel changes.
 *      All callback functions will be provided the following arguments:
 *          innerHTML of the cell, the initial innerHTML and a prop.id.
 *          See below for the order for each function.
 * @returns {JSX.Element} Cell that is editable.
 */
const EditableCell = (props) => {

    const style = props.style? { ...props.style, position: 'relative'}:{position: 'relative'}
    return (
        <div className='editable-cell-container' style={style}>
            <div
                className={`editable-cell`}
                contentEditable={false}
                ref={props.inputRef}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onClick={props.onClick}
                onKeyDown={props.onKeyDown}
                tabIndex={0}
            >
                {props.content}
            </div>
            <button
                className="cell-edit-button cell-button"
                onClick={props.editClick}
                onMouseUp={(e) => { e.returnValue = false } }
            />
            <button
                className="cell-copy-button cell-button"
                onClick={props.copyClick}
            />
        </div>
    )

}

export default React.memo(EditableCell);