import React from 'react';

//css
import './Tabs.css';

//Component
import Tab from "./Tab";

/**
 * @param props
 *      tab [number]: The number of the tab that should be active.
 *      setTab [function]: Function to set the tab number to the tab's number.
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
