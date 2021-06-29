import React from 'react';
import {Link, useLocation  } from 'react-router-dom';

const Navbar = (props) => {

    const location = useLocation ();
    return (
        <div id="navbar-links">
            {
                props.navElements.map(
                    (item) => {
                        if(item.external || item.external_same_page)
                            return (
                                <a
                                    key={item.name}
                                    href={item.to}
                                    className={`header-element ${
                                        item.to === location.pathname 
                                        ? 'header-element-current-page' 
                                        : ''
                                    }`}
                                    target={item.external ? 'blank' : item.external_same_page ? '_self' : ''}
                                >{item.name}</a>
                            )
                        else return (
                            <Link
                                key={item.name}
                                to={item.to}
                                className={
                                    `header-element ${item.to === location.pathname 
                                    ? 'header-element-current-page' 
                                    : ''}`
                                }
                            >
                                {item.name}
                            </Link>
                        )
                    }
                )
            }
        </div>

    )
}

export default Navbar;