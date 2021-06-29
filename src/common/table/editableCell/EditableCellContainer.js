import React, {useRef, useEffect } from 'react';

//Components
import EditableCell from "./EditableCell";
const xss = require('xss');

const EditableCellContainer = (props) => {

    const inputRef = useRef(null)
    const initialContent = useRef(props.content || '')
    const previousEdit = useRef(props.children || '')
    const enterPress = useRef(false);

    useEffect(() => {

        initialContent.current = props.content;
    }, [props.content])
    const onKeyDown = (e) => {

        //Escape PRess
        if(e.keyCode === 27 || e?.key?.toLowerCase() === 'escape'){

            inputRef.current.innerHTML = xss(previousEdit.current);
            inputRef.current.blur();
        }
        else if(e.keyCode === 13 || (e.key && e.key?.toLowerCase() === 'enter')){

            if(props.onEnter) {

                enterPress.current = true;
                const content = xss(e.target.textContent.trim());
                props.onEnter(content, initialContent.current, props.cellId)
            }
            inputRef.current.blur();
        }
        else if(props.onKeyDown) props.onKeyDown()
    }

    const onBlur = (e) => {

        inputRef.current.contentEditable = false;
        if(enterPress.current) enterPress.current = false;
        else inputRef.current.innerHTML = xss(previousEdit.current);
    }

    const onFocus = (e) => {

        previousEdit.current = xss(e.target.innerHTML.trim());
        if(props.onFocus) {

            let content = xss(e.target.textContent.trim())
            props.onFocus(e, content, initialContent.current, props.cellId)
        }
    }

    const editClick = (e) => {

        e.stopPropagation();
        inputRef.current.contentEditable = true;
        setTimeout(function() {
            inputRef.current.focus();
        }, 0);
    }

    const onClick = (e) => {

        if(inputRef.current.getAttribute('contentEditable') === 'true'){

            e.stopPropagation()
        }
    }
    return (
        <EditableCell
            content={props.content}
            cellId={props.cellId}
            inputRef={inputRef}
            onEnter={props.onEnter}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            editClick={editClick}
            onClick={onClick}
            copyClick={props.copyClick}
            style={props.style}
        >
            {props.children}
        </EditableCell>
    )
}

export default React.memo(EditableCellContainer);