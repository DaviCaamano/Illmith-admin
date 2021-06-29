import React from 'react';
import {Link} from "react-router-dom";

const RelatedArticleItem = (props) => (
    !props.root
    ?   <div
            className='related-article-item'
            ref={props.ref}
            style={props.style? props.style: {}}
        >
            <Link to={{ pathname: `/world/${props.path}`}}>
                <div className='related-article-thumbnail' style={{backgroundImage: props.thumbnail}}>
                    <div className='related-article-highlighter'/>
                    <span className='related-article-title'>{props.title}</span>
                </div>
            </Link>
        </div>
    :   <div className='related-article-item' style={props.style? props.style: {}}>
            <Link to={{ pathname: `/explore`}}>
                <div className='related-article-thumbnail' style={{backgroundImage: props.thumbnail}}>
                    <div className='related-article-highlighter'/>
                    <span className='related-article-title'>Explore Illmith</span>
                </div>
            </Link>
        </div>
);

export default RelatedArticleItem;