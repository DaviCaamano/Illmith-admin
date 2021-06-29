import React, {useState, useRef, useEffect} from 'react';
import {useCookies} from "react-cookie";
import {Link} from "react-router-dom";
import axios from "axios";

//utils
import queryArticlesTree from "../component/articleEditor/api/articleTreeQuery";
import queryFilePrm from "../common/api/imageQuery";
import codes from "../resources/data/codes";

//css
import './css/ArticleEditor.css';

//Containers
import ArticleManager from "../component/articleEditor/articleManager/ArticleManager";
import CreateArticleFormContainer from "../component/articleEditor/createArticle/CreateArticleFormContainer";

//Component
import ToggleDiv from "../common/toggleDiv/ToggleDiv";
import Tabs from "../common/tabs/Tabs";
import ArticlePreview from "../component/articleEditor/articlePreview/ArticlePreview";
import ToggleSwitch from "../common/toggleSwitch/ToggleSwitch";

//img
import plus from "../resources/img/plus white.png";

const ArticleEditor = (props) => {

    const [cookies] = useCookies(['token']);
    const [tab, setTab] = useState(0);
    const [thumbnails, setThumbnails] = useState([]);
    const [articleList, setArticleList] = useState({})
    const [previewMode, setPreviewMode] = useState(false);

    const pathTree = useRef('');

    //Create ArticleContent State
    const [newArticle, setNewArticle] = useState({
        title: 'Mizof, Realm of Wills',
        addTitle: true,
        markdown: 'A realm orbiting outside the planar disk. Parts of semblance reach around Sennos as invisible bands where the light of the stars die before they make it across. Starfarers must be aware of these roaming bands called lostcrowns as traveling through them will subject the ship\'s crew to a host of invasive thoughts which will mesh with reality, turning their vessel into a nightmare scape of their own making. \n' +
            'Semblance itself is not governed by the same existential laws which define the other planar realities. There the act of thinking both generates and consumes matter. A creature from the other planar realities orbiting Sennos will likely think itself into a new unsustainable form within minutes and perish within seconds. The only things resembling life in this plane are beings whose inconceivable thoughts grant them enough power to survive the damage their unknowable minds do regularly their own bodies and the areas around them. \n' +
            'Unhindered by the normal shackles of a consistent existence, the only force limiting the boundless potential of the denizens of Semblance is competition. Warfare, both physical and psionic, is eternal in the mad realm. The destruction wrought by these ever present conflicts are incomprehensible, seeming to violate reasonable understanding of time, space, and even death. It is speculated that this ubiquitous struggle is what drives the creatures of Semblance to seek out other realms. Whatever their motivations, their very presence would disrupt the laws of reality as the sentient and logical minds of the multiverse understand them, creating a semblance like hybrid to which no native being could survive. \n' +
            '\n' +
            '![>ArticleContent](http://www.illmith.com/api/article/thumbnail/default.jpg)  \n' +
            '\n' +
            'While the lesser spawn of Semblance frequently leak through the in-between and find their way to other realms, only one realm has ever survived a visit from one of the greater beings of Semblance. The dark realm of Pios was said to contain a bright and prosperous world before the touch of Semblance altered the realm\'s very core where the husk of this indescribable invader rests. The now ocean buried planetiod now drifts along the planar blind to the sun which all realms on the disk share. \n' +
            '  \n'
    })

    //Edit ArticleContent State
    const [editingArticle, setEditingArticle] = useState({
        title: '',
        addTitle: true,
        markdown: '',
        initialPath: null,
        initialThumbnail: null
    })

    useEffect(() => {

        if(!cookies.token) return;
        queryFiles(cookies.token, setThumbnails, props.alert);
        updateArticles();
    // eslint-disable-next-line
    }, [cookies.token]);

    const updateArticles = () => {
        
        getCategories(cookies.token, pathTree, props.alert).then();
        queryArticlesTree(cookies.token)
        .then((resp) => setArticleList(articleTableData(resp.data.articles)))
        .catch(() => {alert(codes.Error.Article.cannotGetArticleTree.message)})
    }

    //If editingArticle state has fields an articleContent is being edited.
    const editMode = editingArticle.title !== ''
        || editingArticle.markdown !== ''
        || !!editingArticle.initialPath
        || !!editingArticle.thumbnail;

    const previewProps = tab === 0
        ? { ...editingArticle }
        : { ...newArticle }

    if(!cookies.token) return <></>
    return (
        <div className="content-plane" style={{width: '1200px', position: 'relative'}}>
            {
                previewMode ?
                <ArticlePreview {...previewProps}/>
                :null
            }
            <div style={{display: previewMode? 'none': null}}>
                <div className="section-title">
                    {tab === 0? 'ArticleContent Editor': 'Create ArticleContent'}
                </div>
                <ToggleDiv className="content-wrapper" visible={!previewMode}>
                    <ToggleDiv visible={tab === 0}>
                        <ArticleManager
                            alert={props.alert}
                            confirm={props.confirm}
                            articleList={articleList}
                            pathTree={pathTree}
                            thumbnails={thumbnails}
                            setThumbnails={setThumbnails}
                            article={editingArticle}
                            setArticle={setEditingArticle}
                            editMode={editMode}
                            updateArticles={updateArticles}
                        />
                    </ToggleDiv>
                    <ToggleDiv visible={tab === 1}>
                        <CreateArticleFormContainer
                            alert={props.alert}
                            setTab={setTab}
                            pathTree={pathTree}
                            thumbnails={thumbnails}
                            setThumbnails={setThumbnails}
                            article={newArticle}
                            setArticle={setNewArticle}
                            updateArticles={updateArticles}
                        />
                    </ToggleDiv>
                </ToggleDiv>
                <Tabs
                    tab={tab}
                    setTab={setTab}
                    tag='image-manager'
                    tabInfo={tabInfo}
                    style={{left: '-32px'}}
                />
            </div>
            {
                ((tab === 0 && editMode) || tab === 1) &&
                <div className='toggle-switch' style={{bottom: 'unset', top: '10px', right: '-60px'}}>
                    {
                        !previewMode
                            ?   <label className='toggle-switch-label'>Preview Mode</label>
                            :   null
                    }
                    <ToggleSwitch
                        checked={previewMode}
                        toggle={() => setPreviewMode(!previewMode)}
                        onColor='#c0a333'
                        offColor='#282c34'
                    />
                </div>
            }

        </div>
    );
}

const tabInfo = [
    {tab: 'General', height:'56px'},
    {tab: <img src={plus} alt={'expand'}/>, height:'16px'}
]


const queryFiles = (token, setThumbnails, alert) => {

    queryFilePrm(token)
    .then((resp) => setThumbnails(resp.data.files.thumbnail))
    .catch(() => { if(alert) alert(codes.Error.Article.cannotGetImages.message) })
}

const getCategories = (token, pathTree, alert) => {

    return new Promise((resolve, reject) => {

        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/articles/categories',
            headers: {auth: token}
        }).then((resp) => {

            pathTree.current = resp.data.pathTree;
            resolve(resp.data)
        })
            .catch((err) => {

                if(alert) alert(codes.Error.Article.cannotGetCategories.message)
                reject(err);
            })
    });
}
const thumbnailLink = (thumbnail) =>
    <Link
        className='thumbnail-link'
        to={{pathname: process.env.REACT_APP_API_URL + '/article/thumbnail/' + thumbnail}}
        target='_blank'
    >
        {thumbnail}
    </Link>

const articleLink = (path) => {

    return <Link
        className='thumbnail-link'
        to={{
            pathname: process.env.REACT_APP_ENV.trim() === 'local'
                ? process.env.REACT_APP_LOCALHOST + 'world/' + path
                : process.env.REACT_APP_URL + 'world/' + path
        }}
        target='_blank'
    >
        {path}
    </Link>
}

const articleTableData = (data,  path = '', paths = [], titles = []) => {

    const node = { cells: [] }
    const { title, thumbnail } = data;

    if(title && thumbnail) {
        node.cells.push({content: title, hideOverflow: true});
        titles.push(title)
        delete data.title;

        node.cells.push({content: articleLink(path), hideOverflow: true});
        paths.push(path);

        node.cells.push({content: thumbnailLink(thumbnail), ignoreSearch: true, hideOverflow: true});
        delete data.thumbnail;
    }

    const childNodes = Object.keys(data);
    if(childNodes.length > 0){

        node.children = [];
        childNodes.forEach((childNode) => {

            node.children.push(
                articleTableData(
                    data[childNode],
                    `${path === ''? '': path + '/'}${childNode}`,
                    paths,
                    titles
                ).tableData
            );
        })
    }
    if(!title && !thumbnail) return { tableData: node.children, paths, titles };
    return { tableData: node, paths, titles };
}

export default ArticleEditor;