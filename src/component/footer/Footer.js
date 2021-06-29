import React from 'react';
import {Link} from 'react-router-dom';
//css
import './Footer.css';

//img
import {ReactComponent as Twitter} from "../../resources/img/twitter.svg";
import {ReactComponent as Reddit} from "../../resources/img/reddit.svg";
import {ReactComponent as Facebook} from "../../resources/img/facebook.svg";
const Footer = () => {

    return (
        <div id='footer'>
            <div id='footer-content'>
                <table id='footer-table'>
                    <tbody>
                    <tr>
                        <td id='footer-left'>
                            <span style={{marginRight: '10px', fontSize: '14px'}}>&copy;2021 Illmith</span>
                        </td>
                        <td id='footer-center'>
                            <Link
                                className='clean-link'
                                to={{pathname: 'https://www.Kickstarter.com'}}
                                target='_blank'>
                                        <span style={{textDecoration: 'underline'}}>
                                            Want to see more of Illmith? Support our Kickstarter!
                                        </span>
                            </Link>
                        </td>
                        <td id='footer-right'>
                            <Link className='clean-link' to={{pathname: ''}} target='_blank' style={{marginRight: '15px'}}>
                                        <span>
                                            Contact Us
                                        </span>
                            </Link>
                            <Link to={{pathname: 'https://www.twitter.com'}} target='_blank'>
                                <Twitter className='footer-socials-img' alt={'twitter'} />
                            </Link>
                            <Link to={{pathname: 'https://www.reddit.com'}} target='_blank'>
                                <Reddit className='footer-socials-img' alt={'reddit'} />
                            </Link>
                            <Link to={{pathname: 'https://www.facebook.com'}} target='_blank'>
                                <Facebook className='footer-socials-img' alt={'facebook'} />
                            </Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Footer;