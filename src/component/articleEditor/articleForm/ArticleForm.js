import React from 'react';

//Containers
import TextareaAutosize from "react-textarea-autosize";
import TableContainer from "../../../common/table/TableContainer";
import InputErrorContainer from "../../../common/inputError/InputErrorContainer";

//Components
import ArticlePathNode from "../articlePathNode/ArticlePathNode";
import ArticlePathDropdown from "../articlePathDropdown/ArticlePathDropdown";
import ToggleSwitch from "../../../common/toggleSwitch/ToggleSwitch";

const ArticleForm = (props) => {

    return (
        <div style={{padding: '0 0'}}>
            <label style={{marginLeft: '10px'}} >
                Title
            </label>
            <InputErrorContainer error={props.titleError} setError={props.setTitleError}>
                <input
                    name="title"
                    className={'login-input'}
                    type="text"
                    placeholder="ArticleContent Title"
                    value={props.title}
                    onChange={(e) => {

                        e.persist();
                        props.setArticle(prev => ({ ...prev, title: e.target.value}))
                    }}
                />
            </InputErrorContainer>
            <label style={{marginRight: '10px', marginLeft: '10px'}}>URL Path</label>
            <span>
            <ArticlePathNode
                input={props.articlePath}
                selectedPath={props.selectedPath}
                clearSelectedIndex={props.clearPath}
                dropdownInputRef={props.dropdownInputRef}
            />
        </span>
            <InputErrorContainer error={props.urlPathError} setError={props.setUrlPathError} bottom='-52px'>

                <ArticlePathDropdown
                    input={props.articlePath}
                    setInputs={props.setInputs}
                    selectedPath={props.selectedPath}
                    optionalPath={props.optionalPath}
                    dropdownInputRef={props.dropdownInputRef}
                />
            </InputErrorContainer>
            <br/>
            <div style={{position: 'relative'}}>
                <label style={{margin: '0 10px 5px 10px', float: 'unset'}}>Thumbnail</label>
            </div>
            <InputErrorContainer
                error={props.thumbnailError}
                setError={props.setThumbnailError}
                bottom='-52px'
                left='155px'
            >
                <div style={props.selectedThumbnail? {display: 'flex', justifyContent: 'center'}: null}>
                    {
                        props.selectedThumbnail
                        ?   <div id='selected-thumbnail-wrapper'>
                                <img
                                    id='new-article-editor-selected-img'
                                    src={props.selectedThumbnail} alt='thumbnail used for this article.'
                                />
                                <span
                                    className={`remove-new-selected-thumbnail-banner`}
                                    onClick={() => props.setSelectedRows([])}
                                >
                                Remove
                                </span>
                            </div>
                        :   <TableContainer
                                visible={true}
                                data={props.tableData}
                                head={['Name', 'URL']}
                                searchPlaceholder={'Search Thumbnails...'}
                                selected={props.selectedRows}
                                setSelected={props.setSelectedRows}
                                singleSelect={true}
                            />
                    }
                </div>
            </InputErrorContainer>
            <br/>
            <div style={{padding: '0 5px'}}>
                <div>
                    <label className='toggle-switch-label'
                           style={{marginRight: '10px', marginLeft: '5px'}}>
                        ArticleContent Content
                    </label>
                    <div style={{float: 'right', position: 'relative', top: '2px'}}>
                        <label
                            className='toggle-switch-label'
                            style={{
                                marginRight: '10px',
                                marginLeft: '5px',
                                fontSize: '16px'
                            }}>
                            Add Title to start of ArticleContent
                        </label>
                        <ToggleSwitch
                            className='add-title-switch'
                            checked={props.addTitle}
                            toggle={() => props.setArticle(prev => ({ ...prev, addTitle: !props.addTitle}))}
                            onColor='#c0a333'
                            offColor='#282c34'
                            size={40}
                            style={{margin: '0 5px -4px -6px'}}
                        />
                    </div>
                </div>
                <InputErrorContainer error={props.markdownError} setError={props.setMarkdownError}
                                     bottom={'-46px'}>
                    <TextareaAutosize
                        className="markdown-editor"
                        minRows={5}
                        value={props.markdown}
                        onChange={(e) => {

                            e.persist();
                            props.setArticle(prev => ({ ...prev, markdown: e.target.value}));
                        }}
                    />
                </InputErrorContainer>
            </div>
            <div className='submit-warning-container'>
            <span className='submit-warning'>
                {props.warning}
            </span>
            </div>
            <button type="button" style={{width: props.cancel? '75%': '100%'}} onClick={props.submit}>Submit</button>
            {
                props.cancel &&
                <button type="button" style={{width: '25%'}} onClick={props.cancel}>Cancel</button>
            }
        </div>
    )
}

export default React.memo(ArticleForm);