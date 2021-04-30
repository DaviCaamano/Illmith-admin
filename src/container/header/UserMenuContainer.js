import React, {useState, useEffect, useRef} from 'react';

//Redux
import store from '../../redux'

//data
import getItems from '../../data/userMenuItems';

//components
import UserMenu from '../../component/header/UserMenu';
import UserMenuBox from '../../component/header/UserMenuBox'

const UserMenuContainer = (props) => {

    const menuRef = useRef(null);
    const menuItems = getItems(props.handleLogout, store.getState().user && store.getState().user.admin)
    const [visible, setVisible] = useState(false);

    console.log('menuItems.current')
    console.log(menuItems.current)
    console.log(store.getState().user)
    console.log(store.getState().user.admin)
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setVisible(false);
        }
    }

    // eslint-disable-next-line
    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);
        return () => { document.removeEventListener("mousedown", handleClickOutside); };
    }, [menuRef]);

    const toggleVisible = () => { setVisible(prevState => !prevState) }

    return (
        <div
            id={'user-menu-container'}
            className={' cursor-pointer'}
            ref={menuRef}
        >
            <UserMenuBox
                name={capitalize(props.name)}
                toggleVisible={toggleVisible}
            />
            <UserMenu
                visible={visible}
                items={menuItems}
            />
        </div>
    )
}

export default UserMenuContainer;

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}