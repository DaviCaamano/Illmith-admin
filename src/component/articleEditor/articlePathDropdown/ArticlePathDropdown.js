import React, {useState, useEffect, useRef} from 'react';



const ArticlePathDropdown = (props) => {

    //Has State Exception for Non-Scene and Non-container.
    //Component has a dropdown menu that hides itself when user clicks outside menu.
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const dropdownRef = useRef(null);

    const onChange = (e) => props.setInputs((prev) => {

        e.persist();
        return {
            path: {
                options: prev.path.options,
                    selected: prev.path.selected,
                    input: props.dropdownInputRef.current.value.replace(/\//g, '')
            },
            selectedRows: prev.selectedRows
        }
    });

    const select = (e) => {

        e.persist();
        props.setInputs((prev) => {


            console.log('prev')
            console.log(prev)
            return {
                path: {
                    options: prev.options,
                    selected:[...prev.path.selected, props.optionalPath[e.target.getAttribute("index")]],
                    input: '',
                },
                selectedRows: prev.selectedRows

            }
        })
        props.dropdownInputRef.current.focus();
    }

    //Generate Dropdown Options
    let options;
    if(!props.optionalPath || (props.optionalPath && props.optionalPath.length === 0))
        options = [
            <div
                key={1}
                index={0}
                className="new-article-path-option-disabled"
                style={{cursor: 'default'}}
                onClick={() => props.dropdownInputRef.current.focus()}
            >
                Enter the Article Url Path.
            </div>
        ]
    else {

        //If input has been typed into, only display options that match the input
        const optionArray = props.input
            ? props.optionalPath
            .filter((item) => item.name.toLowerCase().includes(props.input.toLowerCase()))
            : props.optionalPath;
        options = optionArray.map((item, index) => (
                <div
                    className="new-article-path-option"
                    key={index}
                    index={index}
                    onClick={select}
                >
                    {item.name}
                </div>
            ))
    }
    //End of Generate Dropdown Options

    //Close menu if clicked outside menu or input.
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    }
    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    // eslint-disable-next-line
    }, [dropdownRef]);
    //End of Close menu if clicked outside menu or input.

    return (
        <div className="new-article-path-input-dropdown-container" ref={dropdownRef}>
            <input
                className="new-article-path-input"
                placeholder={'...'}
                type='text'
                value={props.input}
                onChange={onChange}
                onFocus={() => { setDropdownVisible(true)}}
                style={{marginBottom: '0'}}
                ref={props.dropdownInputRef}
                autoComplete="off"
            />
            <div id="new-article-path-dropdown" className={`${dropdownVisible? '': 'd-none'}`}>
                {options}
            </div>
        </div>
    );
}

export default ArticlePathDropdown;

