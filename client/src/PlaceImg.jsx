import React from "react";

const PlaceImg = ({place,index=0,classname}) => {
    if (!place.photos?.length){
        return '';
    }

    if (!classname){
        classname = 'rounded-2xl object-cover aspect-square';
    }
    return(
        
        <img className={classname} src = {'http://localhost:4000/uploads/'+place.photos[index]} alt=''/>   
          
    );
}

export default PlaceImg;