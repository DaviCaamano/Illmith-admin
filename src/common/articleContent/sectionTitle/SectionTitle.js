import React from 'react';

const SectionTitle = (props) => {

    let ref;
    for(let section of props.sections)
        if(section.title === props.children[0])
            ref = section.ref

    return <h1 ref={ref}>{props.children}</h1>
}

export default React.memo(SectionTitle);