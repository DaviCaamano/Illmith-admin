import React from 'react';

//Components
import RelatedArticleItem from "../relatedArticleItem/RelatedArticleItem";

const fallbackImg = `${process.env.REACT_APP_PINNED_IMG_URL}/library.png`;

const RelatedArticles = (props) => {

    const items = props.parent
        ?[
            props.parent.isRoot
                ?   <RelatedArticleItem key='article-item-root' thumbnail={thumbnailCss()} root={true}/>
                :   <RelatedArticleItem
                        key={`article-item-${props.parent.path}`}
                        path={props.parent.path}
                        thumbnail={thumbnailCss(props.parent.thumbnail)}
                        title={props.parent.title}
                    />
        ]
        :[];

    for(let child of props.children)
        items.push(
            <RelatedArticleItem
                key={`article-item-${child.path}`}
                path={child.path}
                thumbnail={thumbnailCss(child.thumbnail)}
                title={child.title}
                style={{marginTop: '2px'}}
            />
        );

    return <>{items}</>;
}

const thumbnailCss = (path) => {

    return path
        ?`url("${process.env.REACT_APP_THUMBNAIL_URL}/${path}"), url("${fallbackImg}")`
        :`url("${fallbackImg}")`;
}

export default RelatedArticles;