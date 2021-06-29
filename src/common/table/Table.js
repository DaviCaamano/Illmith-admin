import React  from 'react';

//img
import searchIcon from '../../resources/img/search icon.svg'

//containers
import PaginationContainer from "./pagination/PaginationContainer";

const Table = (props) => {

    return (
        <div
            className='content-wrapper'
            style={props.style}
        >
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
                        onChange={(e) => {

                            e.persist();
                            return props.setPage((prev) => ({...prev, rowsPerPage: e.target.value}))}
                        }
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={'*'}>&#8734;</option>
                    </select>
                    &nbsp;entries
                </span>
                <div className="ctable-search">
                    <input
                        type="text"
                        placeholder={props.searchPlaceholder || 'Search Table'}
                        style={{paddingLeft: '40px', marginRight: '10px'}}
                        value={props.searchString}
                        onChange={props.onSearchChange}
                    />
                    <img
                        className="ctable-search-icon"
                        src={searchIcon}
                        alt={'search icon'}
                    />
                </div>
            </div>
            <table className="ctable" cellSpacing={0} cellPadding={0} style={{marginBottom: '10px'}}>
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

export default React.memo(Table);

