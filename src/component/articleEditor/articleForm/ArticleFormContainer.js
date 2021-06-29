import React, {useCallback, useEffect, useRef} from 'react';
import {Link} from "react-router-dom";

//utils
import codes from "../../../resources/data/codes";

//Component
import ArticleForm from "./ArticleForm";

const ArticleFormContainer = (props) => {

    const dropdownInputRef = useRef(null);

    /**
     * Everytime the user clicks a path to add to the URL path of the file, this function repopulates the list of
     * optional paths they may take next.
     */
    useEffect(() => {

        if(props.pathTree.current) updateSelectedPath(props, props.inputs, props.setInputs)
        // eslint-disable-next-line
    }, [props.inputs.path.selected, props.pathTree.current])

    const thumbnailTableData = useCallback((fileSet) => {

        if(!fileSet) return [];
        const data = [];
        for (let individualFile of fileSet) {

            data.push({
                cells: [
                    { content: individualFile.name },
                    { content: individualFile.url, ignoreSearch: true}
                ],
                children: [
                    {
                        cells: [
                            {
                                content: (
                                    <Link
                                        key={individualFile.name}
                                        to={{pathname: process.env.REACT_APP_URL + individualFile.url}}
                                        target={'_blank'}>
                                        <img
                                            src={process.env.REACT_APP_URL + individualFile.url}
                                            alt={individualFile.name}
                                            style={{maxHeight: '500px', maxWidth: '100%'}}/>
                                    </Link>
                                ),
                                colspan: 2,
                                center: true,
                                ignoreSearch: true,
                            }
                        ],
                        noSelect: true,
                    }
                ],
            })
        }
        return data;
    }, [])

    /**
     * The URL Path of the articleContent being created is displayed via path boxes on the page.
     * This function allows the user to click one of these boxes to reduce the URL path to a previous segment.
     * ie: /a/b/c/d -> click c -> /a/b/
     * @param index
     */
    const clearPath = (index) =>
        props.setInputs(prev => ({
            path: {
                options: prev.path.options,
                input: prev.path.input,
                selected: prev.path.selected.slice(0, index)
            },
            selectedRows: prev.selectedRows
        }));

    /** Row Functions **/
    const setSelectedRows = (input) => {

        if(typeof input === 'function')
            props.setInputs(prev => ({...prev, selectedRows: input(props.inputs.selectedRows) || []}))
        else
            props.setInputs(prev => ({...prev, selectedRows: input || []}))
    }

    //URL Path Tree and List of Thumbnail files is required for this component to display.
    if(!props.thumbnails && !props.pathTree) return null;

    //Get which of the thumbnails on the thumbnail tables that is selected. Only one can be selected at a time.
    const selectedThumbnail = props.thumbnails.length > 0 && props.thumbnails[props.inputs.selectedRows[0]/2]
        ? process.env.REACT_APP_URL + props.thumbnails[props.inputs.selectedRows[0]/2].url
        : null;

    const validateInputs = () => {

        if(!props.inputs.path.input) {

            if(props.inputs.path.selected.length > 0)
                props.setUrlPathError(codes.Error.Article.pathAlreadyExists.message);
            else
                props.setUrlPathError(codes.Error.Article.urlPathFieldEmpty.message);
        }
        if(!props.title) props.setTitleError(codes.Error.Article.titleFieldEmpty.message);
        if(!selectedThumbnail) props.setThumbnailError(codes.Error.Article.noThumbnailSelected.message);
        if(!props.markdown) props.setMarkdownError(codes.Error.Article.articleContentMissing.message);
        return props.inputs.path.input && props.title && selectedThumbnail && props.markdown;
    }

    const submit = () => {

        if(props.submit && validateInputs())
            props.submit();
    }
    return (
        <ArticleForm
            //Inputs
            inputs={props.inputs}
            setInputs={props.setInputs}
            //ArticleContent Data
            setArticle={props.setArticle}
            //Title
            title={props.title}
            titleError={props.titleError}
            setTitleError={props.setTitleError}
            //URL Path
            articlePath={props.articlePath}
            selectedPath={props.selectedPath}
            optionalPath={props.optionalPath}
            clearPath={clearPath}
            dropdownInputRef={dropdownInputRef}
            urlPathError={props.urlPathError}
            setUrlPathError={props.setUrlPathError}
            //Thumbnails
            selectedRows={props.selectedRows}
            setSelectedRows={setSelectedRows}
            selectedThumbnail={selectedThumbnail}
            thumbnailError={props.thumbnailError}
            setThumbnailError={props.setThumbnailError}
            tableData={thumbnailTableData(props.thumbnails)}
            //Markdown
            markdown={props.markdown}
            addTitle={props.addTitle}
            markdownError={props.markdownError}
            setMarkdownError={props.setMarkdownError}
            //submissions
            submit={submit}
            cancel={props.cancel}
            //general warning
            warning={props.warning}
        />
    )
}


/**
 * Everytime the user clicks a path to add to the URL path of the file, this function repopulates the list of
 * optional paths they may take next.
 */
const updateSelectedPath = (props, inputs, setInputs) => {

    let node;
    //Set the node to the selected node or the root of the path tree if no node is selected
    node =  inputs.path.selected.length === 0
        ?   props.pathTree.current
        :   inputs.path.selected[inputs.path.selected.length - 1].children;

    const newOptions = [];
    //Add individual options consisting of a name and children fields.
    for (let k in node) {

        let children = {};
        for (let child in node[k])
            if (child !== 'url' && child !== 'thumbnail')
                children[child] = node[k][child]

        newOptions.push({name: k, children})
    }

    setInputs((prev) => ({
        path: {
            selected: prev.path.selected,
            options: newOptions,
            input: prev.path.input
        },
        selectedRows: prev.selectedRows
    }));
    // eslint-disable-next-line

}

export default ArticleFormContainer;