import React from 'react';

const SectionIndex = (props) => {

    let sections = [];
    if(props.sections)
        for(let i = 0; i < props.sections.length; i++)
            sections.push(
                <div
                    key={`section-index-${i}`}
                    className='article-section-index'
                    onClick={() => props.sections[i].ref.current.scrollIntoView(true)}
                >
                    {props.sections[i].title}
                </div>
            );

    if(sections.length > 0)
        return(
            <div id='article-section-index-container'>
                <div id='article-section-index-table'>
                    {sections}
                </div>
            </div>
        )
    return null;
}

export default SectionIndex;
