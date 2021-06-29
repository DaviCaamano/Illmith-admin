import React  from 'react';

//img
import searchIcon from '../../../resources/img/search icon.svg'

//containers
import PaginationContainer from "./component/pagination/PaginationContainer";

const CollapsableTable = (props) => {

    return (
        <div className="content-wrapper">
            <PaginationContainer
                page={props.page}
                setPage={props.setPage}
                rowAmount={props.itemAmount ?? 0}
                rowsPerPage={props.rowsPerPage}
                pageButtonNo={7}
            />
            <div className="collapsable-table-header-container">
                <span style={{marginLeft: '10px', marginBottom: '5px'}}>
                    Show&nbsp;
                    <select
                        className="collapsable-table-row-per-page-select"
                        value={props.rowsPerPage}
                        onChange={(e) => props.setRowsPerPage(e.target.value)}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={'*'}>&#8734;</option>
                    </select>
                    &nbsp;entries
                </span>
                <div className="table-search">
                    <input
                        type="text"
                        placeholder={props.searchPlaceholder || 'Search Table'}
                        style={{paddingLeft: '40px', marginRight: '10px'}}
                        value={props.searchString}
                        onChange={props.onSearchChange}
                    />
                    <img
                        className="table-search-icon"
                        src={searchIcon}
                        alt={'search icon'}
                    />
                </div>
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        {props.columns}
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
            <PaginationContainer
                page={props.page}
                setPage={props.setPage}
                rowAmount={props.itemAmount ?? 0}
                rowsPerPage={props.rowsPerPage}
                pageButtonNo={7}
            />
        </div>
    );
}

export default CollapsableTable;

