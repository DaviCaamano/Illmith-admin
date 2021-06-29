import React from 'react';

const Pagination = (props) => {

    if(props.all){

        return (
            <div style={{position: 'relative', height: '32px'}}>
                <span style={{marginLeft: '10px'}}>
                    Showing All Rows
                </span>
            </div>
        )
    }
    else {

        return (
            <div style={{position: 'relative', marginBottom: '10px', marginTop: '10px'}}>
                <span style={{marginLeft: '10px'}}>
                    Showing {props.firstItemNo} to {props.lastItemNo} of {props.rowAmount || 0}
                    <table className={'pagination-table'}>
                        <thead className={'pagination-columns'}>
                            <tr>
                                {props.pageButtons}
                            </tr>
                        </thead>
                    </table>
                </span>
            </div>
        )
    }
}

export default Pagination;