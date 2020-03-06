import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import { FaStar, FaRegStar } from 'react-icons/fa';

import { updateStar, token$ } from "../components/Store";


export default function StarFileOrFolder({ fileId, onClickStar }) {
    const [color, setColor] = useState();
    const [opacity, setOpacity] = useState(0);
    const [star, setStar] = useState(true);
    const [hover, setHover] = useState(false);


    var dbx = new Dropbox ({ accesstoken: token$.value, fetch })

    const clickStar = () => {
        setStar( true )
        if (star) {
            console.log('clickStar');            
            setOpacity(1);
            setColor('black')
            setStar( false )
        } else {
            setOpacity(0);
        }

        

        //{ star === false ? setOpacity(1) : setOpacity (0)}
        //{ color === 'black' ? setOpacity(1) : setOpacity (0) }
        //{ color === 'black' ? setColor( 'yellow' ) : setColor( 'black' ) }
        onClickStar(fileId);
    }

    //  Skicka upp state till home!
    
    return (
        <>
            <div>
                <FaStar onClick={clickStar} style={{ color, opacity, hover }} />
            </div>
        </> 
    )
}