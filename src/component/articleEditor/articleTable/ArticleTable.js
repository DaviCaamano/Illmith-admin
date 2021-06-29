import React from 'react';

//Components
import TableContainer from "../../../common/table/TableContainer";

const ArticleTable = (props) => {

    return (
        <div className='article-manager-table-container'>
            {
                props.articleList
                ?   <TableContainer
                        data={props.articleList.tableData}
                        head={[
                            { content:'Title', width: '25%'},
                            { content:'Path', width: '50%'},
                            { content:'Thumbnail',width: '25%'}
                        ]}
                        editRowCallback={props.rowEdit}
                        deleteRowCallback={props.rowDelete}
                        searchPlaceholder={'Search Articles...'}
                        indentFirstChild={true}
                        style={{border: 'none', minHeight: 'unset', paddingTop: 0}}
                        flag={true}
                    />
                :   null
            }
        </div>
    )
}

export default ArticleTable