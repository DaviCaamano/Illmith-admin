import React from 'react';
import Pagination from "./Pagination";

import leftArrow from "../../../resources/img/select left icon tall.svg";
import rightArrow from "../../../resources/img/select right icon tall.svg";

const PaginationContainer = (props) => {

    const setPage = (newPage) => props.setPage((prev) => ({...prev, no: newPage}))

    if(props.rowsPerPage === '*'){

        return <Pagination all={true}/>
    }
    else {

        const   pageButtonsAmount = Math.min(props.pageButtonNo, Math.ceil(props.rowAmount/ props.rowsPerPage)),
            firstItemNo = (Math.max(1, props.page) - 1) * props.rowsPerPage + 1,
            lastItemNo = Math.min(Math.max(1, props.page)  * props.rowsPerPage, props.rowAmount),
            pageButtons = [],
            halfAvailableButtons = Math.floor(pageButtonsAmount / 2),
            lastPage = Math.ceil(props.rowAmount / props.rowsPerPage),
            pageOffset = Math.min(
                Math.max(props.page - halfAvailableButtons, 1),
                lastPage - pageButtonsAmount + 1
            );


        //Add left arrow is needed
        if(pageOffset > 1) {
            pageButtons.push(
                <th className="page-arrow-button-cell" key={'page-left-arrow'} onClick={() => setPage(1)}>
                    <button className="page-arrow-button" style={{backgroundImage: `url("${leftArrow}")`}} />
                </th>
            )    }
        //Add numeric page buttons
        for(let i = pageOffset; i < pageButtonsAmount + pageOffset; i++)
            if(i <= lastPage)
                if(i === props.page)
                    pageButtons.push(<th className="current-page" key={i}>{i}</th>)
                else
                    pageButtons.push(<th key={i} onClick={() => setPage(i)}><button>{i}</button></th>)

        //add right arrow if needed
        if(props.page < lastPage - halfAvailableButtons && props.pageButtonNo < lastPage)
            pageButtons.push(
                <th className="page-arrow-button-cell" key={'page-right-arrow'} onClick={() => setPage(lastPage)}>
                    <button className="page-arrow-button" style={{backgroundImage: `url("${rightArrow}")`}} />
                </th>
            )
        return (
            <Pagination
                firstItemNo={firstItemNo}
                lastItemNo={lastItemNo}
                pageButtons={pageButtons}
                rowAmount={props.rowAmount}
            />
        )
    }

}

export default PaginationContainer;