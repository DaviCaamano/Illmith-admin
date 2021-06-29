import React  from 'react';

//Components
import NavAlert from './NavAlert';

const NavAlertContainer = (props) => {

    /** Visibility and Content Tester */
    // useEffect(() => {
    //     setTimeout(() => {
    //
    //         props.setContent(<b>Heeeyyyooooo</b>)
    //         props.setVisible(prev => !prev)
    //     }, 500)
    //
    //     setTimeout(() => {
    //
    //         props.setVisible(prev => !prev)
    //     }, 3000)
    //
    // // eslint-disable-next-line
    // }, []);

    return(
        <NavAlert
            visible={props.visible}
            setVisible={props.setVisible}
            content={props.content}
            setContent={props.setContent}
        />)
}

export default NavAlertContainer;