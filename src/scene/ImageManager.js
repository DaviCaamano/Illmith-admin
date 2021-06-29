import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";

//resources
import codes from '../resources/data/codes';
import queryFilePrm from "../common/api/imageQuery";

//css
import './css/ImageManager.css';

//img
import plus from "../resources/img/plus white.png";

//Containers
import CollapsableTableContainer from "../common/table/TableContainer";

//components
import ImageManagerFileUpload from "../component/imageManager/imageManagerFileUpload/ImageManagerFileUpload";
import Tabs from "../common/tabs/Tabs";
import Loading from "../common/loading/loading";
import ToggleDiv from "../common/toggleDiv/ToggleDiv";

const ImageManager = (props) => {

    const [cookies] = useCookies(['token']);

    const [completedCrop, setCompletedCrop] = useState(null);
    const [images, setImages] = useState({
        general: [],
        thumbnails: [],
        set: false,
    });
    const [file, setFile] = useState();
    const [readFile, setReadFile] = useState();
    const [isThumbnailUpload, setIsThumbnailUpload] = useState(false);
    const [tab, setTab] = useState(0);

    const firstRender = useRef(true);
    const previewCanvasRef = useRef(null);

    // eslint-disable-next-line
    useEffect(() => { queryFiles(cookies.token, setImages).then().catch() }, [])
    useEffect(() => {

        if(firstRender.current)
            firstRender.current = false;
        else if (file) {

            const reader = new FileReader();
            reader.addEventListener('load', () => setReadFile(reader.result));
            reader.readAsDataURL(file);
        }
        else {
            setReadFile(null);
        }
        // eslint-disable-next-line
    }, [file]);

    const generateTableData = useCallback((fileSet) => {

        const data = [];
        for (let individualFile of fileSet) {

            data.push({
                cells: [
                    { content: individualFile.name, editable: true,},
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
                    }
                ],
            })
        }
        return data;
    }, [])

    if(!cookies.token) return <></>;

    const uploadImage = (overwrite = false, thumbnailCrop) => {

        if(file){

            const dataName = thumbnailCrop && isThumbnailUpload
            ?file.name
            :undefined
            props.startLoading();
            const formData = new FormData();
                formData.append(file.name, thumbnailCrop && isThumbnailUpload? thumbnailCrop: file, dataName);
            const config = {
                method: 'POST',
                url: process.env.REACT_APP_API_URL + '/articles/' + (isThumbnailUpload? 'thumbnails': 'images'),
                headers: {
                    auth: cookies.token,
                    'content-type': 'multipart/form-utils'
                },
                data: formData
            };
            if(overwrite) config.headers.overwrite = true;

            axios(config)
            .then((resp) => {

                const data = resp.data;
                if(data.err && data.err.code === codes.Error.Image.fileExists.code) {

                    props.stopLoading();
                    props.confirm(
                        'A file by this name exists in this category. Do you want to overwrite this file?',
                        () => uploadImage(
                            true,
                            thumbnailCrop && isThumbnailUpload? thumbnailCrop: file
                        ),
                        () => {},
                        'Yes',
                        'No'
                    );
                }
                else {

                    queryFiles(cookies.token, setImages)
                    .then(() => {

                        props.stopLoading();
                        props.alert('File Successfully Uploaded.');
                        setTab(0);
                    })
                }

            })
            .catch((err) =>{

                props.stopLoading();
                props.alert(err && err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : codes.Generic.message
                );
            })
        }
        else {
            props.alert('Upload Required.')
        }
    }

    const uploadThumbnail = (canvas, crop) => {

        if (!crop || !canvas) return;
        canvas.toBlob(
            (blob) => {

                uploadImage(false, blob)
            },
            'image/png',
            1
        );

    }

    const editImagePath = (content, initialContent) => {

        const path = '/api/article/'  + (tab === 0? 'display/': 'thumbnail/');
        props.startLoading();
        axios({
            method: 'patch',
            url: process.env.REACT_APP_API_URL + '/articles/' + (tab === 0? 'images': 'thumbnails'),
            headers: {auth: cookies.token},
            data: {
                source: path + initialContent,
                target: path + content,
            }
        })
        .then(() => queryFiles(cookies.token, setImages).then(() => props.stopLoading()))
        .catch((err) => {

            props.stopLoading();
            let errorMsg = err.response.data.error && err.response.data.error.message
                ? err.response.data.error.message
                : codes.Error.Image.unknown.message;
            props.alert(errorMsg);
            //Rerender
            // window.location.reload();
        })
    }

    const deleteImage = (index) => {


        index = index/2;
        console.log(tab === 0? images.general[index].url : images.thumbnails[index].url)
        props.startLoading();
        axios({
            method: 'delete',
            url: process.env.REACT_APP_API_URL + '/articles' + (tab === 0? '/images/': '/thumbnails/'),
            headers: {auth: cookies.token},
            data: {target: tab === 0? images.general[index].url : images.thumbnails[index].url}
        }).then(() => queryFiles(cookies.token, setImages).then(() => props.stopLoading()))
        .catch((err) => {

            console.log('!!!!!!!!!!!!!!!!!!!err')
            console.log(err)
            props.stopLoading();
            let errorMsg = err.response.data.error && err.response.data.error.message
                ? err.response.data.error.message
                : codes.Error.Image.unknown.message;
            props.alert(errorMsg);
        })
    }

    return (
        <div className="content-plane" style={{width: '1200px'}}>
            <span className="section-title">
                {tab === 0? 'General Images': tab === 1?'Thumbnail Images': tab === 2? 'Upload New Image': ''}
            </span>
            <div className="image-manager-tabs" style={{position: 'relative'}}>
                <ToggleDiv visible={tab === 0 && images.general.length > 0}>
                    <CollapsableTableContainer
                        data={generateTableData(images.general)}
                        head={['Name','URL']}
                        deleteRowCallback={deleteImage}
                        editCallBack={editImagePath}
                        searchPlaceholder={'Search Images...'}
                    />
                </ToggleDiv>
                { (tab === 0 && !images.general.length) && <Loading width={'400px'} height={'400px'} opacity={'.5'}/> }
                <ToggleDiv visible={tab === 1 && images.set}>
                    <CollapsableTableContainer
                        data={generateTableData(images.thumbnails)}
                        head={['Name','URL']}
                        deleteRowCallback={deleteImage}
                        editCallBack={editImagePath}
                        searchPlaceholder={'Search Thumbnails...'}
                    />
                </ToggleDiv>
                {(tab === 1 && !images.set) && <Loading width={'400px'} height={'400px'} opacity={'.5'}/>}
                {
                    tab === 2
                    ?   <ImageManagerFileUpload
                            file={file}
                            setFile={setFile}
                            readFile={readFile}
                            setReadFile={setReadFile}
                            isThumbnailUpload={isThumbnailUpload}
                            setIsThumbnailUpload={setIsThumbnailUpload}
                            previewCanvasRef={previewCanvasRef}
                            completedCrop={completedCrop}
                            setCompletedCrop={setCompletedCrop}
                            submit={uploadImage}
                            submitThumbnail={uploadThumbnail}
                            downloadCrop={downloadCrop}
                        />
                    :   null
                }
                <Tabs
                    tab={tab}
                    setTab={setTab}
                    key='image-manager'
                    tabInfo={tabInfo}
                    style={{top: '1px', left: '-32px'}}
                />
            </div>
        </div>
    )
}

const queryFiles = (token, setImages) => {

    return new Promise((resolve, reject) => {

        queryFilePrm(token)
        .then((resp) => {

            let data = resp.data;
            setImages({ general: data.files.display, thumbnails: data.files.thumbnail, set: true });
            resolve(resp);
        })
        .catch((err) => {

            console.log('err')
            console.log(err)
            reject(err)
        })
    })
}

const downloadCrop = (canvas, crop) => {

    if (!crop || !canvas) {
        return;
    }

    canvas.toBlob(
        (blob) => {
            const previewUrl = window.URL.createObjectURL(blob);

            const anchor = document.createElement('a');
            anchor.download = 'cropPreview.png';
            anchor.href = URL.createObjectURL(blob);
            anchor.click();

            window.URL.revokeObjectURL(previewUrl);
        },
        'image/png',
        1
    );
}

const tabInfo = [
    {tab: 'General', height:'56px'},
    {tab: 'Thumbnails', height:'85px'},
    {tab: <img src={plus} alt={'expand'}/>, height:'15px'}
]


export default ImageManager;