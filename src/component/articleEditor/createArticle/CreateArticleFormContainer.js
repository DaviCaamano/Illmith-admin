import React, {useRef, useState} from 'react';
import axios from 'axios';
import {useCookies} from "react-cookie";

//CSS

//Components
import ArticleFormContainer from "../articleForm/ArticleFormContainer";

import codes, { getCode } from "../../../resources/data/codes";

const CreateArticleFormContainer = (props) => {

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

    //URL Path Tree and List of Thumbnail files is required for this component to display.
    if(!props.thumbnails && !props.pathTree) return null;

    /**
     * Send Request to Create ArticleContent after validating its information.
     */
    const submit = () => {

        //Convert selected path object array to path string.
        const selectedPathString =
            (inputs.path.selected.length? inputs.path.selected.map((item) => item.name).join('/') + '/': '') +
            `${inputs.path.input}`;

        const thumbnail = props.thumbnails[inputs.selectedRows[0]/2]?.name;
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/articles/`,
            headers: { auth: cookies.token },
            data: {
                thumbnail: thumbnail,
                path: selectedPathString.toLowerCase(),
                title: props.article.title,
                content: addTitleToArticle(props.article.markdown, props.article.addTitle)
            },
        })
            .then(({data}) => {

                if(!data.success)
                    setWarning(getCode(data.error.code).message)
                else {

                    clearPage();
                    /**
                     *
                     *
                     *
                     * INSTEAD OF THIS ALERT, MAKE THE PAGE JUMP TO THE ARTICLE THAT WAS JUST CREATED.
                     *
                     *
                     *
                     */
                }
            })
            .catch((err) => {

                const error = err.response && err.response.data?.error;
                const errors = codes.Error.Article;

                if(error.code === errors.titleFieldEmpty.code)
                    setTitleError(error.message);
                else if(
                    error.code === errors.pathAlreadyExists.code
                    || error.code === errors.mustHaveParent.code
                    || error.code === errors.pathMissing.code
                )
                    setUrlPathError(error.message);
                else if(
                    error.code === errors.thumbnailDoesNotExist.code
                    || error.code === errors.noThumbnailSelected.code
                )
                    setThumbnailError(error.message);
                else if(error.code === errors.contentFieldEmpty.code)
                    setMarkdownError(error.message);
                else
                    setWarning(codes.Error.Article.addGeneric.message)
            })
    }

    /**
     * Reset the page by resetting all inputs, warnings and articleContent state.
     */
    const clearPage = () => {

        didMount.current = false;
        setInputs({ path: { options: [], selected: [], input: '' }, selectedRows: [] });
        setWarning('');
        setTitleError('');
        setUrlPathError('');
        setThumbnailError('');
        setMarkdownError('');
        props.setArticle({
            title: '',
            addTitle: true,
            markdown: ''
        });
        props.updateArticles();
        props.setTab(0);
    }

    return (

        <ArticleFormContainer
            article={props.article}
            setArticle={props.setArticle}
            title={props.article.title}
            updateArticles={props.updateArticles}

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
            submit={submit}
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
    )
}


const addTitleToArticle = (markdown, addTitle) => (addTitle && !markdown.startsWith('__title  \n')
    ? '__title  \n' + markdown
    : markdown)

export default React.memo(CreateArticleFormContainer);


