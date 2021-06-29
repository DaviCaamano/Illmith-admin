import React from 'react';

//css
import './Tabs.css';

//Component
import Tab from "./tab/Tab";

/**
 * @param props
 *      tabs [number]: The number of the tabs that should be active.
 *      setTab [function]: Function to set the tabs number to the tabs's number.
 * @returns {JSX.Element}
 */
const tabs = (props) => {

    const tabsElements = [];

    if(props.tabInfo){

        for(let i = 0; i < props.tabInfo.length; i++)
            tabsElements.push(<Tab
                key={`tab${props.tag? '-' + props.tag: ''}-${i}`}
                tabNo={i}
                tab={props.tab}
                setTab={props.setTab}
                height={props.tabInfo[i].height}
            >
                {props.tabInfo[i].tab}
            </Tab>)
    }

    return (
        <div className="tab-position-container" style={props.style}>
            <div className="tab-container">
                {tabsElements}
            </div>
        </div>
    )
}

export default tabs;
