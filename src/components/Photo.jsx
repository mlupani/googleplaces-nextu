import React from 'react'

const Photo = ({photo,tamano}) => {

    if(photo[0] !== '')
        return (
            <div className={`col-${tamano}`}>
                <img src={photo} style={{width:"200px", height:"200px"}}  className="card-img-top" alt={photo} />
            </div>
        );
    else
     return (
             <div className="col-2"></div>
        );    
}

export default Photo;