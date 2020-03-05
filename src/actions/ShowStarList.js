import React from "react";

export default function ShowStarList(){

    function clickShowStarred(){
        console.log("clicked starred")
    }


    return(

        <>
        <p onClick={clickShowStarred}>Show starred</p>
        </>

    )
}