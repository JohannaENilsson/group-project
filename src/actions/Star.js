import React, { useState } from 'react';

export default function StarFileOrFolder() {
    const [color, setColor] = useState('black');
    
    const clickStar = () => {
        console.log('Star clicked');
        { color === 'black' ? setColor( 'yellow' ) : setColor( 'black' ) }
    }

    

    return <i className='fa fa-star star' onClick={clickStar} style={{ color: color }}></i>
}