import React from 'react';

/**
 * @param props
 *      tabNo [number]: When tabs number is equal to tabNo, this tabs activates. (Higher z-index and Dark Color)
 *      tabs [number]: the currently selected tabs number.
 *      setTab [function]: sets state for tabs to this tabs's tabNo.
 *      top [CSS]: Css property for top (Tab is absolutely positioned.
 *      right [CSS]: Css property for right (Tab is absolutely positioned.
 *      bottom [CSS]: Css property for bottom (Tab is absolutely positioned.
 *      left [CSS]: Css property for left (Tab is absolutely positioned.
 *
 * @returns {JSX.Element}
 */
const Tab = (props) => {

    const d1 = "M0,200H133V0h-3c-3.575,4.921-9.108,10.07-10.951,16.94V38.607c-9.866,6.522-17.6,17.6-25" +
            ".9,25.9L37.356,120.3C25.535,132.12,8.232,143.782,1.491,160.15-0.04,169.334-.034,186.693,0,200Z",
            d2 = "M0,0H133V267h-3c-3.575-4.921-9.108-10.07-10.951-16.94V161.393c-9.866-6.521-17.6-17.6-25.9-25" +
            ".9L37.356,79.7C25.535,67.88,8.232,56.218,1.491,39.85-0.04,30.666-.034,13.307,0,0Z"
    const onMouseDown = () => props.setTab(props.tabNo);
    return (
        <div
            className={`tab vertical ${props.tab === props.tabNo? 'tab-active': ''}`}
            onClick={() => props.setTab(props.tabNo)}
            style={props.tabNo > 0? {marginTop: '-50px'}:{}}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="48"
                viewBox="0 0 133 200"
            >
                <path
                    id="Shape_319_1"
                    data-name="Shape 319 1"
                    className={`tab-path ${props.tab === props.tabNo? 'path-active': ''}`}
                    d={d1} />
            </svg>
            <div
                className="tab-content"
                style={{'height': props.height}}
                onMouseDown={onMouseDown}
            >
                <span>{props.children}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="64"
                viewBox="0 0 133 267"
            >
                <path
                    id="Shape_320_1"
                    data-name="Shape 320 1"
                    className={`tab-path ${props.tab === props.tabNo? 'path-active': ''}`}
                    d={d2} />
            </svg>
        </div>

    )
}

export default Tab;