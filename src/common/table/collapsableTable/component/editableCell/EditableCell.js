import React, { useRef } from 'react';
const xss = require('xss');

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

    const initialContent = useRef(props.children || '')
    const previousEdit = useRef(props.children || '')
    const enterPress = useRef(false);
    const onKeyDown = (e) => {

        //Escape PRess
        if(e.keyCode === 27 || e?.key?.toLowerCase() === 'escape'){

            e.target.innerHTML = xss(previousEdit.current);
            if(props.onEscape) {

                const content = xss(e.target.textContent.trim());
                props.onEscape(content, initialContent.current, props.cellId)
            }
            e.target.blur();
        }
        else if(e.keyCode === 13 || (e.key && e.key?.toLowerCase() === 'enter')){

            if(props.onEnter) {

                enterPress.current = true;
                const content = xss(e.target.textContent.trim());
                props.onEnter(content, initialContent.current, props.cellId)
            }
            e.target.blur();
        }
        else if(props.onKeyDown) props.onKeyDown()
    }
    const onClick = (e) => {

        e.stopPropagation();
        if(props.onClick) {


            const content = xss(e.target.textContent.trim());
            props.onClick(e, content, initialContent.current, props.cellId);
        }
    }
    const onBlur = (e) => {

        if(props.onEnterOnly){

            if(enterPress.current) enterPress.current = false;
            else e.target.innerHTML = xss(previousEdit.current);
        }


        if(props.onBlur) {

            let content = xss(e.target.textContent.trim())
            props.onBlur(e, content, initialContent.current, previousEdit.current, props.cellId);
        }
    }
    const onFocus = (e) => {

        previousEdit.current = xss(e.target.textContent.trim());
        if(props.onFocus) {

            let content = xss(e.target.textContent.trim())
            props.onFocus(e, content, initialContent.current, props.cellId)
        }

    }
    return (
        <div
            className="editable-cell"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
        >
            {props.children}
        </div>
    )

}

export default EditableCell;