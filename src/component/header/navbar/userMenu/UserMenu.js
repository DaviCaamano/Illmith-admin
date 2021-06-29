import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = (props) => {

    let keyIndex = 0;
    return (
        <div
            style={{display: props.visible ? 'block' : 'none'}}
            className={'user-menu dropdown-menu'}
        >
            {
                props.items? props.items.map((item) =>
                    <UserMenuItem
                        key={keyIndex++}
                        to={item.to}
                        mouseLeave={props.mouseLeave}
                        onClick={item.onClick}
                        text={item.text}
                    />
                ): null
            }
        </div>
    )
}


const UserMenuItem = (props) =>{

    const onClick = (...args) => { props.onClick(...args) }
    return <Link className={'user-menu-item-link'} to={props.to} onClick={onClick}>
        <div className={'user-menu-item dropdown-item'} >
            {props.text}
        </div>
    </Link>;
}


export default UserMenu;