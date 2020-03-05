import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import { FaStar, FaRegStar } from 'react-icons/fa';

import { updateStar, token$ } from "../components/Store";


export default function StarFileOrFolder({ fileId, onClickStar }) {
    const [opacity, setOpacity] = useState(0.2);
    const [star, setStar] = useState(false);

    var dbx = new Dropbox ({ accesstoken: token$.value, fetch })

    const clickStar = () => {
        setStar(true)
        if (star) {
            setOpacity(0.2);
            setStar(false)
        } else {
            setOpacity(1);
        }
        
        onClickStar(fileId);
    }


    //  Skicka upp state till home!
    
    return (
        <>
            <div>
                <FaStar className="star" onClick={clickStar} style={{ opacity }} />
            </div>

        </> 
    )
}
