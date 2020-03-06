import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import { FaStar } from 'react-icons/fa';

import { updateStar, token$ } from "../components/Store";


export default function StarFileOrFolder({ fileId, onClickStar }) {
    const [opacity, setOpacity] = useState(0);
    const [star, setStar] = useState(true);
    var dbx = new Dropbox ({ accesstoken: token$.value, fetch })

    const clickStar = () => {
        setStar({ star: !star })
        { star ? setOpacity(1) : setOpacity(0.2) }
        onClickStar(fileId);
    }

    //  Skicka upp state till home!
    
    return (
        <>
            <div>
                <FaStar onClick={clickStar} style={{ opacity }} />
            </div>
        </> 
    )
}