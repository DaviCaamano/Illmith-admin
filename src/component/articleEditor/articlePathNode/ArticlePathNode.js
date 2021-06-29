import React from 'react';

const ArticlePathNode = (props) => {

    if(!props.selectedPath) return [];

    let tags = [<span key={'First Slash'} className="add-article-path-node-slash">/</span>];
    for(let i in props.selectedPath) {

        if (i > 0)
            tags.push(<span key={'Rear Slash'} className="add-article-path-node-slash">/</span>)

        const onClick = () => {

            props.clearSelectedIndex(i);
            props.dropdownInputRef.current.focus();
        }
        tags.push(
            <div key={i} onClick={onClick} className="add-article-path-node">
                <span style={{position:'relative', bottom: '1px'}}>{props.selectedPath[i].name}</span>
            </div>
        )
    }
    if(props.selectedPath && props.selectedPath.length > 0)
        tags.push(<span key={'Final Slash'} className="add-article-path-node-slash">/</span>);

    if(!props.input) tags.push(<span key={'User Input'} className="add-article-path-node-slash">...</span>);
    else tags.push(<span key={'User Input'} className="add-article-path-node-slash">{props.input.toLowerCase()}</span>)

    return tags;
}

export default ArticlePathNode;