import React from 'react';

const UserMenuBox = (props) => {

    return (
        <div
            id='logged-user'
            onClick={props.toggleVisible}
        >
            <span className={'logged-user-welcome-text'} style={{marginTop: '3px'}}>
                Welcome,
            </span>
            <span
                className={'logged-user-welcome-text'}
                style={{marginTop: '-8px'}}
            >
                &nbsp; &nbsp; {props.name}
            </span>

        </div>
    )
}

export default UserMenuBox