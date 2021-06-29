import React from 'react';
import xss from "xss";

//utils
import markdownOptions from "../../../resources/data/markdownOptions";

//Components
import ArticleContent from "../../../common/articleContent/ArticleContent";

const ArticlePreview = (props) => {

    let markdown = xss(props.markdown? props.markdown.replace(/(?<=]\(.*)(\s)(?=.*\))/g, '%20'): '');
    const titleComponent = "<div className='articleContent-title'>" + props.title + "</div>"

    if(props.addTitle && !markdown.startsWith('__title'))
        markdown = titleComponent + '  \n' + markdown;

    markdown = markdown.replace(/\b(__title)\b/g, titleComponent);

    return (
        <ArticleContent
            title={props.title}
            markdown={markdown}
            markdownOptions={markdownOptions}
        />
    )
}

export default ArticlePreview;