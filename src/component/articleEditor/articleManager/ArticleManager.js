import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useCookies} from "react-cookie";

//api
import getArticle from "../api/getArticle";

//utils
import codes, { getCode } from "../../../resources/data/codes";

//Containers
import ArticleFormContainer from "../articleForm/ArticleFormContainer";

//Components
import ArticleTable from "../articleTable/ArticleTable";
import ToggleDiv from "../../../common/toggleDiv/ToggleDiv";

const ArticleManager = (props) => {

    const [cookies] = useCookies(['token'])

    //ArticleContent URL Path
    const [inputs, setInputs] = useState({
        path: {  options: [], selected: [], input: ''},
        selectedRows: []
    });
    const didMount = useRef(false);

    //Errors
    const [warning, setWarning] = useState('');
    const [titleError, setTitleError] = useState('');
    const [urlPathError, setUrlPathError] = useState('');
    const [thumbnailError, setThumbnailError] = useState('');
    const [markdownError, setMarkdownError] = useState('');


    /**
     *  If the component is used to edit an existing articleContent,
     *  configure the URL Path input to already be set to the initial path passed into props.
     */
    useEffect(() => {

        if(!didMount.current && props.editMode && props.pathTree.current && props.thumbnails) {

            didMount.current = true;
            populateUrlPath(props.editMode, props.pathTree, props.thumbnails, props.article, setInputs)
        }
    // eslint-disable-next-line
    }, [props.pathTree.current, props.thumbnails, props.article.initialPath])

    /**
     * populate the articleContent table when the page loads.
     */
    useEffect(() => {

        if(cookies.token)
            props.updateArticles();
    // eslint-disable-next-line
    }, [cookies.token])

    //URL Path Tree and List of Thumbnail files is required for this component to display.
    if(!props.thumbnails && !props.pathTree) return null;


    /**
     * Send Request to Edit the articleContent loaded into ArticleContent Form Container after validating its information.
     */
    const submitEdit = () => {

        //Convert selected path object array to path string.
        const selectedPathString =
            (inputs.path.selected.length? inputs.path.selected.map((item) => item.name).join('/') + '/': '') +
            `${inputs.path.input}`;

        const thumbnail = props.thumbnails[inputs.selectedRows[0]/2]?.name;
        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/articles/`,
            headers: { auth: cookies.token },
            data: {
                path: props.article.initialPath,
                newPath: selectedPathString.toLowerCase(),
                thumbnail: thumbnail,
                title: props.article.title,
                content: addTitleToArticle(props.article.markdown, props.article.addTitle)
            },
        })
        .then((resp) => {

            if(!resp.data.success)
                setWarning(getCode(resp.data.error.code).message)
            else {
                let body = resp.data;
                if (!body.success && body.error.code === codes.Error.Article.articleUnchanged.code)
                    return setWarning(codes.Error.Article.articleUnchanged.message)
                else
                    clearPage();
            }
        })
        .catch((err) => {

            const error = err.response && err.response.data?.error;
            const errors = codes.Error.Article;

            if(
                error.code === errors.pathUsedByOtherArticle.code
                || error.code === errors.mustHaveParent.code
                || error.code === errors.pathMissing.code
            )
                setUrlPathError(error.message);
            else if(error.code === errors.thumbnailDoesNotExist.code)
                setThumbnailError(error.message);
            else
                setWarning(codes.Error.Article.addGeneric.message)
        })
    }

    const clearPage = () => {

        props.updateArticles();
        didMount.current = false;
        setInputs({ path: { options: [], selected: [], input: '' }, selectedRows: [] })
        setWarning('')
        setTitleError('')
        setUrlPathError('')
        setThumbnailError('')
        setMarkdownError('')
        props.setArticle({
            title: '',
            addTitle: true,
            markdown: '',
            thumbnail: null,
            initialPath: null
        })
    }

    const rowEdit = (index) => {

        const path = props.articleList.paths[index]
        getArticle(path)
        .then((resp) => {

            const {title, thumbnail, content} = resp.data;
            props.setArticle({
                title,
                initialThumbnail: thumbnail,
                markdown: content,
                initialPath: path,
                addTitle: false
            });
        })
        .catch((err) => {

            const error = err.response && err.response.data?.error;
            if(error)
                props.alert(error.message);
            else {
                props.alert(codes.Error.Article.addGeneric.message);
            }
        })
    }

    const rowDelete = (index) => {

        const path = props.articleList.paths[index];
        const title = props.articleList.titles[index];

        let confirmCallback = () => {

            axios({
                method: 'delete',
                url: process.env.REACT_APP_API_URL + '/articles/',
                headers: { auth: cookies.token },
                params: { path }
            }).then((resp) => {

                let body = resp.data;

                if(!body.success && body.error)
                    return props.alert(resp.error.message)
                else
                    clearPage();

            }).catch((err) => {

                const error = err.response && err.response.data?.error;
                if(error)
                    props.alert(error.message);
                else
                    props.alert(codes.Error.Article.deleteGeneric.message);
            })
        }

        props.confirm(
            'Delete ArticleContent: ' + title,
            confirmCallback,
            () => {},
            'Confirm',
            'Cancel'
        )
    }

    return (
        <>
            {
                !props.editMode &&
                    <ArticleTable
                        articleList={props.articleList}
                        rowEdit={rowEdit}
                        rowDelete={rowDelete}
                    />
            }
            <ToggleDiv visible={props.editMode}>
                <ArticleFormContainer
                    setArticle={props.setArticle}
                    title={props.article.title}
                    //paths
                    inputs={inputs}
                    setInputs={setInputs}
                    articlePath={inputs.path.input}
                    selectedPath={inputs.path.selected}
                    optionalPath={inputs.path.options}
                    pathTree={props.pathTree}

                    //thumbnails
                    selectedRows={inputs.selectedRows}
                    thumbnails={props.thumbnails}

                    //markdown
                    markdown={props.article.markdown}
                    addTitle={props.article.addTitle}

                    //submit
                    submit={submitEdit}
                    cancel={clearPage}
                    //errors
                    warning={warning}
                    titleError={titleError}
                    setTitleError={setTitleError}
                    urlPathError={urlPathError}
                    setUrlPathError={setUrlPathError}
                    thumbnailError={thumbnailError}
                    setThumbnailError={setThumbnailError}
                    markdownError={markdownError}
                    setMarkdownError={setMarkdownError}
                />
            </ToggleDiv>
        </>
    )
}


const addTitleToArticle = (markdown, addTitle) => (addTitle && !markdown.startsWith('__title  \n')
    ? '__title  \n' + markdown
    : markdown)

const populateUrlPath = (editMode, pathTree, thumbnails, article, setInputs) => {

    //Set Paths for Path URL Input
    let node = pathTree.current;
    let currentArticlePath = '';
    const initialSelectedPath = [];
    const inputPath = article.initialPath.split('/');

    for(let p = 0; p < inputPath.length; p++){

        for(let article in node) {

            if(inputPath[p] === article) {

                if(p < inputPath.length - 1){

                    node = node[article];
                    initialSelectedPath.push({name: article, children: pathTree.current[article]})
                }
                //Last Node in Path
                else {

                    currentArticlePath = article;
                }
                break;
            }
        }
    }

    //Set Selected Thumbnail for Thumbnail Table
    let initialSelectedRow;
    if(article.initialThumbnail)
        for (let i = 0; i < thumbnails.length; i++)
            if(thumbnails[i].name === article.initialThumbnail)
                initialSelectedRow = [i * 2];

    setInputs((prev) => ({
        path: {
            selected: initialSelectedPath,
            options: prev.path.options,
            input: currentArticlePath
        },
        selectedRows: initialSelectedRow || prev.selectedRows
    }))
}


export default React.memo(ArticleManager);


