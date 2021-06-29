import React from 'react';
import Markdown from 'markdown-to-jsx';

const ArticleContent = (props) => (
    <div className="article-content-container">
        <div className="markdown-body">
            <Markdown options={props.markdownOptions}>
                {props.markdown}
            </Markdown>
        </div>
    </div>
);


export default ArticleContent;