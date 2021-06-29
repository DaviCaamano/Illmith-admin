import React from 'react';

//Components
import RelatedArticles from "./relatedArticles/RelatedArticles";
import SectionIndex from "./sectionIndex/SectionIndex";

const ArticleNavbar = (props) => {

    return (
        <div id='article-nav-container'>
            <span className='article-nav-label'>Contents</span>
            <SectionIndex sections={props.sections} />
            <span className='article-nav-label' style={{marginTop: '25px'}}>Related Articles</span>
            <RelatedArticles parent={props.parent} children={props.children}/>
        </div>
    )
}

export default ArticleNavbar;