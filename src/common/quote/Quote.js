import React from 'react';

//css
import './Quote.css'
const Quote = ({children}) => {

    return (
        <div className='quote'>
            {children}
        </div>
    )
}

export default Quote;