import React, { useState, useEffect } from 'react';
import "bootstrap/js/src/collapse.js"

//css
import './Table.css';
import './pagination/pagination.css';

//Img
import collapsedIcon from '../../resources/img/collapsed icon.svg';

//Data
import codes from '../../resources/data/codes'
import stringSearch from './utils/searchString';

//Component
import Table from "./Table";
import EditableCellContainer from "./editableCell/EditableCellContainer";

const TableContainer = (props) => {

    const [searchString, setSearchString] = useState('');
    const [expandedRows, setExpandedRows] = useState([]);
    const [page, setPage] = useState({
        no: 1,
        rowsPerPage: '25'
    });

    const onSearchChange = (e) => { setSearchString(e.target.value)};

    useEffect(() => {

        if(expandedRows.length > 0)
            setExpandedRows([]);

    // eslint-disable-next-line
    }, [props.data]);

    if(!props.data) return <></>;

    //Data for each row.
    let rows = [];

    let treeFormat = isTreeFormat(props.data)
    const searchStringWithNeedle = searchString? stringSearch(searchString): null;
    let rowIndex = 0;
    for(let dataIndex = 0; dataIndex < props.data.length; dataIndex++){

        const rendered = renderRow(
            props.data[dataIndex],
            rowIndex,
            treeFormat,
            searchStringWithNeedle,
            true,
            props,
            expandedRows,
            setExpandedRows,
        )
        rowIndex = rendered.nextIndex
        rows.push.apply(rows, rendered.rows)
    }

    const columns = renderHeader(treeFormat, props);

    const [paginatedRows, rowAmount] = paginateRows(rows, page.no, page.rowsPerPage)

    return (
        <Table
            columns={columns}
            rows={paginatedRows}
            page={page.no}
            itemAmount={rowAmount}
            setPage={setPage}
            rowsPerPage={page.rowsPerPage}
            searchPlaceholder={props.searchPlaceholder}
            searchString={searchString}
            onSearchChange={onSearchChange}
            style={props.style}
        />
    )
}

/**
 * Render the individual rows and subrows for the table.
 * @param row - Individual Row Object.
 *      row.cells [Array]: an array of cell objects to be rendered in the current row.
 *      row.children [Array]: An array of cell objects to be rendered as a child of the current row.
 *      row.selectable [Boolean]: If true, adds a checkbox in the first cell of the table.
 *      row.uniqueSelector [Boolean]: If true, only one of the checkboxes can be clicked at a time.
 * @param rows [Array]: An array the rows will be pushed into.
 * @param index [Number]: Index for the current row.
 * @param treeFormat [Boolean]: If true, a plus sign is added to the first cell of the row.
 * @param searchStringWithNeedle [Function]: A pre-processed searched function using Boyer–Moore–Horspool method.
 * @param parentExpanded [Boolean]: If false, the children rows will be collapsed.
 * @param props [Object]: Props passed to Table Container.
 * @param expandedRows [Array]: Array of Rows whose subrows are viewable.
 * @param setExpandedRows [Function]: State update function for expandedRows
 * @param level [number]: level of recursion in this function's call. Defines the number of indents applied to a row.
 */
const renderRow = (
    row,
    index,
    treeFormat,
    searchStringWithNeedle,
    parentExpanded = true,
    props,
    expandedRows,
    setExpandedRows,
    level = 0,
    ) => {
    ////Find out how to pass the entire ancestorIndexes back to the parent so they can remove from selected rows on click

    //rows for collapsable sub-rows.
    const children = row.children || 0;
    const hasChildren = row.children && Array.isArray(row.children) && row.children.length > 0;
    //check if the index of this row is included in the array of expanded rows.
    let isExpanded = expandedRows.includes(index)
    //If the row is both expanded and it has sub-rows.
    const expanded = isExpanded && hasChildren;
    let childrenNo = hasChildren? getRowCount(children): 0;

    //Cells in this row.
    const cells = [];

    //Flag for if search is being used. True if a cell without the ignoreSearch flag matches the search.
    let searchMatch = false;
    //Add Cells to row.
    for(let cellIndex = 0; cellIndex <row.cells.length; cellIndex++) {

        let cell, editable, ignoreSearch = false;
        if(typeof row.cells[cellIndex] === 'object') {

            ignoreSearch = row.cells[cellIndex].ignoreSearch
            cell = row.cells[cellIndex].content;
            //Allow user to edit the contents of this cell.
            editable = !!row.cells[cellIndex].editable
        }
        else
            cell = row.cells[cellIndex];

        //Do not add this cell to the table if the cell does not match
        if(!ignoreSearch && searchStringWithNeedle && searchStringWithNeedle(cell) > -1) searchMatch = true;

        const cellProperties = {}
        if(row.cells[cellIndex].colspan) cellProperties.colspan = row.cells[cellIndex].colspan;
        if(row.cells[cellIndex].center) cellProperties.center = row.cells[cellIndex].center;
        if(row.cells[cellIndex].hideOverflow) cellProperties.hideOverflow = row.cells[cellIndex].hideOverflow;
        cells.push(
            addCell(
                cell,
                props,
                cellProperties,
                editable,
                level,
                cellIndex,
                index,
                cellIndex === 0,
                hasChildren,
                expanded,
                row.noSelect,
            )
        );
    }


    //If table received a delete callback function, add delete button.
    //and/or if table received a edit callback function, add edit button
    renderRowButtons(props, index, level, cells)

    const ancestorIndexes = [index];
    let childRows = [];
    //Render subtable if there is a subtable for this row and the row is expanded.
    if(hasChildren) {

        for(let childIndex = 0; childIndex <children.length; childIndex++){

            const rendered = renderRow(
                children[childIndex],
                index + childIndex +1,
                isTreeFormat(row),
                searchStringWithNeedle,
                expanded,
                props,
                expandedRows,
                setExpandedRows,
                level + 1
            );
            if(rendered.searchMatch) searchMatch = true;
            if(rendered.rows.length > 0) childRows.push.apply(childRows, rendered.rows);
            if(rendered.ancestorIndexes)
                for(let i of rendered.ancestorIndexes)
                    if(!ancestorIndexes.includes(i)) ancestorIndexes.push(i)
        }
    }

    const rows = [
        (
            <tr
                key={'row-' + index}
                className={`ctable-row ${parentExpanded?'active': ''} ${'row-' + index}`}
                onClick={hasChildren? () => toggleSubRow(index, ancestorIndexes, expandedRows, setExpandedRows): null}
                root={level === 0? 'true': 'false'}
            >
                {cells}
            </tr>
        ),
        ...childRows
    ];

    return {
        rows: searchStringWithNeedle && !searchMatch? []: rows,
        nextIndex: index + childrenNo + 1,
        searchMatch,
        ancestorIndexes
    };
}

const RowCallback = (index, element, callback) => {

    element.stopPropagation();
    if(callback) callback(index)
}

const toggleSubRow = (rowId, ancestorIndexes, expandedRows, setExpandedRows) => {

    const currentExpandedRows = expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    setExpandedRows(isRowCurrentlyExpanded ?
        currentExpandedRows.filter(id => !ancestorIndexes.includes(id)) :
        currentExpandedRows.concat(rowId));
}
/**
 * Copy the contents of the cell to the user's clipboard.
 * @param cell - Contents of TD Element.
 * @param element - Element Listener.
 */
const copyToClipboard = (cell, element) => {

    element.stopPropagation();
    if(element.target.parentElement.getAttribute('contentEditable')) return;
    if(React.isValidElement(cell)){

        //The type field of react components is an object, where standard html DOM elements are just a string.
        const firstChild= typeof cell.type === 'string'? cell.type: cell.type.displayName;

        if(firstChild === 'Link')
            return navigator.clipboard.writeText(cell.props.to)
        if(firstChild === 'img')
            return navigator.clipboard.writeText(cell.props.src)
    }
    navigator.clipboard.writeText(cell).then().catch();
}

const addCell = (
    cell,
    props,
    properties,
    isEditableCell,
    level,
    cellIndex,
    index,
    firstCell,
    hasChildren,
    expanded,
    noSelect,
    ) => {

    //Error: If multiple selected rows are allowed, the selected prop must be an object not a number.
    if(typeof props.selected !== 'object' && typeof props.singleSelect !== 'undefined')
        throw codes.Error.Table.message

    const tdStyle = properties.center? {textAlign: 'center'}: {}
    const wrapperStyle = properties.hideOverflow
        ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}
        : {};
    return (
        <td
            className='ctable-cell'
            key={'cell-' + cellIndex}
            colSpan={properties.colspan? properties.colspan : 1}
            style={{ ...tdStyle, ...wrapperStyle}}
        >
            <div className={`cell-wrapper ${level > 0? 'child': ''}`} style={wrapperStyle}>
                {
                    !!props.setSelected && !noSelect && cellIndex === 0
                    ?   <input
                            type='checkbox'
                            className='selector-cell-checkbox'
                            checked={
                                props.singleSelect
                                ? props.selected[0] === index
                                : props.selected.includes(index)
                            }
                            onChange={
                                (e) => props.setSelected(prev => {

                                    const checked = e.target.checked;
                                    if(props.singleSelect){

                                        const selected = prev[0] === index;
                                        if(checked && !selected)
                                            return [index];
                                        else if(!checked && selected)
                                            return [];

                                    }
                                    else {

                                        const included = prev.includes(index);
                                        if(checked && !included)
                                            return [...prev, index];
                                        else if(!checked && included)
                                            return prev.filter((e) => e !== index);
                                    }
                                    return prev;
                                })
                            }
                        />
                    :   null
                }
                {renderIndents(props, level, cellIndex)}
                {
                    firstCell
                    ?   hasChildren
                        ?   <img
                                className={`expand-icon-img ${expanded? 'expanded': ''}`}
                                src={collapsedIcon}
                                alt={'expand'}
                            />
                        :   <span className={`expand-icon-indent`} />
                    :   null
                }
                {
                    isEditableCell
                    ?   <EditableCellContainer
                            content={cell}
                            cellId={cellIndex}
                            onEnterOnly={true}
                            onEnter={props.editCallBack}
                            copyClick={(e) => copyToClipboard(cell,e)}
                            style={wrapperStyle}
                        />
                    :   <div className='cell' style={wrapperStyle}>
                            {cell}
                            <button
                                className="cell-copy-button cell-button"
                                onClick={(e) => copyToClipboard(cell,e)}
                            />
                        </div>
                }
            </div>
        </td>
    )
}

const renderHeader = (treeFormat, props) => {

    if(!props.head || !props.head.length) return null;
    const headerColumns = [],
        head = props.head,
        buttonColumnWidth = ((props.deleteRowCallback? 30: 0) + (props.editRowCallback? 30: 0)) + 'px';

    for(let i in head){


        if(typeof head[i] === 'object'){

            headerColumns.push(<th
                key={'ctable-head' + i}
                scope="col"
                style={head[i].width? {width: head[i].width}: {}}
            >
                {head[i].content}
            </th>)
        }
        else if(head[i])
            headerColumns.push(<th key={'ctable-head' + i} scope="col">{head[i]}</th>)
        else
            headerColumns.push(<th key={'ctable-head' + i} scope="col" />)
    }
    if(props.deleteRowCallback || props.editRowCallback)
        headerColumns.push(<th key={'deleteRowCallback-table-header'} style={{width: buttonColumnWidth}} />)

    return headerColumns;
}

const getRowCount = (rows, counter= { count: 0 }) => {

    for(let j = 0; j < rows.length; j++){

        counter.count++;
        if(rows[j].children)
            getRowCount(rows[j].children, counter);
    }
    return counter.count;
}

const isTreeFormat = (data) => {

    if(Array.isArray(data)) {
        for (let i in data)
            if (data[i].children) {

                return true
            }
        return false
    }
    else {
        return data.children && data.children.length > 0
    }
}

const paginateRows = (rows, page, rowsPerPage) => {

    let countedRootRows = 0;
    if (rowsPerPage === '*') {

        for(let row of rows)
            if (row.props?.root === 'true')
                countedRootRows++;
        return [rows, countedRootRows];
    }

    const   rowsInRange = [],
        firstRow = (page - 1) * rowsPerPage,
        lastRow = Math.min(rows.length, page * rowsPerPage);

    for(let row of rows) {

        if (countedRootRows >= firstRow && countedRootRows < lastRow)
            rowsInRange.push(row)
        if (row.props?.root === 'true')
            countedRootRows++;
    }

    return [ rowsInRange, countedRootRows ];
}

const renderIndents = (props, level, childIndex) => {

    if(!!props.indentChildren || (!!props.indentFirstChild && childIndex === 0)) {

        const indents = [];
        for(let i = 0; i < level; i++)
            indents.push(<span key={'ctable-indent-' + i} className='ctable-cell-indent' />);
        return indents;
    }
    else return null;
}

const renderRowButtons = (props, index, level, cells) => {

    if(props.deleteRowCallback || props.editRowCallback)
        cells.push(
            <td key={'delete-cell' + index} className="ctable-cell cell-delete-container">
                <div className={`cell-wrapper ${level > 0? 'child': ''}`}>
                    {
                        props.editRowCallback
                        &&  <button
                                className={`row-button edit left`}
                                onClick={(e) => RowCallback(index, e, props.editRowCallback)}
                            />
                    }
                    {
                        props.deleteRowCallback
                        &&  <button
                            className={`row-button delete ${props.editRowCallback? 'right': 'left'}`}
                            onClick={(e) => RowCallback(index, e, props.deleteRowCallback)}
                        />
                    }
                </div>
            </td>
        )
}


export default React.memo(TableContainer);