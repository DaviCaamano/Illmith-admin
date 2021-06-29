import React from 'react';
import xss from "xss";

//utils
import markdownOptions from "../../resources/data/markdownOptions";

//Components
import ArticleContent from "./ArticleContent";

const ArticleContentContainer = (props) => {

    let markdown = xss(props.markdown? props.markdown.replace(/(?<=]\(.*)(\s)(?=.*\))/g, '%20'): '');

    const titleComponent = "<div className='article-title'>" + props.title + "</div>"
    markdown = markdown.replace(/\b(__title)\b/g, titleComponent);

    return (
        <ArticleContent
            title={props.title}
            markdown={'<articleNavbar/>' + markdown}
            parent={props.parent}
            children={props.children}
            markdownOptions={markdownOptions(props.sections, props.parent, props.children)}
        />
    )
};

export default ArticleContentContainer;