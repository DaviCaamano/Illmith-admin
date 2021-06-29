import React, { useState, useEffect } from 'react';
import "bootstrap/js/src/collapse.js"


//css
import './Table.css';

//Img
import plus from '../../../resources/img/plus.png';
import minus from '../../../resources/img/minus.png';

//Data
import codes from '../../../resources/data/codes'
import stringSearch from '../utils/searchString';

//Component
import CollapsableTable from "./CollapsableTable";
import EditableCell from "./component/editableCell/EditableCell";

const CollapsableTableContainer = (props) => {

    const [searchString, setSearchString] = useState('');
    const [expandedRows, setExpandedRows] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState('25');
    const toggleSubRow = (rowId) => {

        const currentExpandedRows = expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

        setExpandedRows(isRowCurrentlyExpanded ?
            currentExpandedRows.filter(id => id !== rowId) :
            currentExpandedRows.concat(rowId));
    }

    const onSearchChange = (e) => setSearchString(e.target.value);

    useEffect(() => { setExpandedRows([]); }, [props.data]);

    const deleteCallback = (index, element) => {

        element.stopPropagation();
        props.deleteCallback(index)
    }

    useEffect(() => setPage(1), [rowsPerPage]);


    const renderRow = (row, index, containsSubRows, rows, searchStringWithNeedle) => {

        //rows for collapsable sub-rows.
        const subRows = row.subRows;
        //check if the index of this row is included in the array of expanded rows.
        const expanded = expandedRows.includes(index);
        //If the row is both expanded and it has sub-rows.
        const showSubRows = expanded && subRows;

        //Cells in this row.
        const cells = [];
        if(row.selectable) {

            if(typeof props.selectedRows !== 'object' && !row.uniqueSelector) throw codes.Error.Table.message
            cells.push(
                <td key={'selecter-cell-' + index} style={{padding: '0 26px 0 .75rem'}}>
                    <input
                        type='checkbox'
                        className='selector-cell-checkbox'
                        checked={row.uniqueSelector? props.selectedRows === index: !!props.selectedRows[index]}
                        onChange={
                            (e) => props.setSelectedRows(prev => {
                                return row.uniqueSelector
                                ?   index
                                :   { ...prev, [index]: e.target.checked }
                            })
                        }
                    />
                </td>
            );
        }
        //Add Column for the "+" and "-" which expands the and collapses sub-rows.
        else if(containsSubRows)
            cells.push(setSubRowExpanderColumn(!!subRows, showSubRows, index));

        //Add Cells to row.
        for(let i in row.cells) {

            let cell, editable;
            if(typeof row.cells[i] === 'object') {
                cell = row.cells[i].content;
                //Allow user to edit the contents of this cell.
                editable = !!row.cells[i].editable
            }
            else
                cell = row.cells[i];

            if(searchStringWithNeedle && searchStringWithNeedle(cell) === -1) return;
            //Editable Cell
            if(editable)
                cells.push(
                    <td key={'cell-' + i} style={{ padding: '0 26px 0 .75rem'}}>
                        <EditableCell
                            cellId={index}
                            onEnterOnly={true}
                            onEnter={props.edit}
                        >
                            {cell}
                        </EditableCell>

                        <button
                            className="cell-copy-button cell-button"
                            onClick={(e) => copyToClipboard(cell,e)}
                        />

                    </td>
                )
            //Non-Editable Cell
            else
                cells.push(
                    <td
                        key={'cell' + i}
                        style={{
                            paddingRight: '26px',
                            maxWidth: props.width - 2 + 'px',
                            paddingLeft: '.75rem'
                        }}
                    >
                        <div>
                            {cell}
                        </div>
                        <button
                            className="cell-copy-button cell-button"
                            onClick={(e) => copyToClipboard(cell,e)}
                        />
                    </td>
                );
        }

        //Permanent Property disables the delete row column and buttons.
        if(!row.permanent)
            cells.push(
                <td key={'delete-cell' + index} cellSpacing={0} className="cell-delete-container">
                    <button
                        className="cell-delete-button"
                        onClick={(e) => deleteCallback(index, e)}
                    />
                </td>
            )

        const itemRows = [
            <tr key={'row' + index} className={expanded? 'active': ''} onClick={() => toggleSubRow(index)}>
                {cells}
            </tr>
        ];

        //Render subtable if there is a subtable for this row and the row is expanded.
        if(subRows)
            itemRows.push(addSubRows(subRows, index, showSubRows))

        rows.push(itemRows);
    }

    const renderHeader = (containsSubRows) => {

        const headerColumns = [];
        if(containsSubRows) headerColumns.push(<th key={'expander-table-header'} />);

        for(let i in props.head){

            if(props.head[i])
                headerColumns.push(<th key={'table-head' + i} scope="col">{props.head[i]}</th>)
            else
                headerColumns.push(<th key={'table-head' + i} scope="col" />)
        }
        headerColumns.push(<th key={'delete-table-header'} style={{width: '24px'}} />)
        return headerColumns;
    }


    let containsSubRows = false;
    for(let i in props.data)
        if(props.data[i].subRows){

            containsSubRows = true;
            break;
        }

    //Data for each row.
    let rows = [];

    const searchStringWithNeedle = searchString? stringSearch(searchString): null;

    for(let i = 0; i < props.data.length; i++)
        renderRow(props.data[i], i, containsSubRows, rows, searchStringWithNeedle)

    let paginatedRows;
    if(rowsPerPage === '*') {
        paginatedRows = rows;
    }
    else {

        const firstPageRow = (page - 1) * rowsPerPage;
        const lastPageRow = Math.min(props.data.length, page * rowsPerPage);
        paginatedRows = rows.slice(firstPageRow, lastPageRow)
    }

    const   columns = renderHeader(containsSubRows);

    return (
        <div className={!props.visible? 'd-none': ''}>
            <CollapsableTable
                columns={columns}
                rows={paginatedRows}
                page={page}
                itemAmount={props.data.length}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                searchPlaceholder={props.searchPlaceholder}
                searchString={searchString}
                onSearchChange={onSearchChange}
            />
        </div>
    );
}

/**
 * Copy the contents of the cell to the user's clipboard.
 * @param cell - Contents of TD Element.
 * @param element - Element Listener.
 */
const copyToClipboard = (cell, element) => {

    element.stopPropagation();

    if(React.isValidElement(cell)){

        //The type field of react components is an object, where standard html DOM elements are just a string.
        const firstChild= typeof cell.type === 'string'? cell.type: cell.type.displayName;

        if(firstChild === 'Link')
            return navigator.clipboard.writeText(cell.props.to)
        if(firstChild === 'img')
            return navigator.clipboard.writeText(cell.props.src)
    }
    navigator.clipboard.writeText(cell);
}

/**
 * Creates a cell with plus and minus signs indicating whether the row's subrows are expanded or collapsed.
 * @param rowHasSubRows - Whether this specific row has subrows.
 * @param showSubRows - If this row has its subrows expanded.
 */
const setSubRowExpanderColumn = (rowHasSubRows, showSubRows,  index) => {

    if (rowHasSubRows) {

        if (showSubRows)
            return (
                <td key={'expand-icon' + index} className="arrow-cel" style={{color: 'lightgray'}}>
                    <img src={minus} alt={'expand'}/>
                </td>
            )
        else
            return (
                <td key={'expand-icon' + index} className="arrow-cel" style={{color: 'darkgray'}}>
                    <img src={plus} alt={'expand'}/>
                </td>
            )
    }
    else return <td key={'expand-icon' + index}/>;
}
const addSubRows = (subRows, index, showSubRows) => {

    for(let k in subRows) {

        const expandedCells = [];
        for (let j in subRows[k]) {

            const subRow = subRows[k][j];
            //Subtable Row is a simple array of cell resources.
            if (typeof subRow === 'object')
                expandedCells.push(
                    <td
                        key={index + '' + k}
                        colSpan={subRow.colSpan ? subRow.colSpan : 1}
                        style={
                            showSubRows
                                ? {display: '5px 50px 5px 10px !important', border: 'none'}
                                : {padding: '0', border: 'none'}
                        }
                    >
                        <div
                            className={`expanded-content ${subRow.center? 'center': ''}`}
                            style={showSubRows ? {maxHeight: '500px', padding: '5px'} : {}}
                        >
                            {subRow.row}
                            <button
                                className="cell-copy-button cell-button"
                                onClick={(e) => copyToClipboard(subRow.row, e)}
                            />
                        </div>
                    </td>
                )

            else
                expandedCells.push(<td key={index + '' + k + '' + j}>{subRow}</td>)
        }
        return <tr key={"expanded-" + index} style={{backgroundColor: '#f1f1f1'}}>{expandedCells}</tr>;
    }
}

export default CollapsableTableContainer;

