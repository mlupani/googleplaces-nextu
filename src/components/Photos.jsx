import React from 'react'
import Photo from './Photo'

const Photos = ({busqueda, photos, fila, tamano}) => {

        var photos_array = []
        if(fila === 1)  photos_array = photos.slice(0,3);
        if(fila === 2)  photos_array = photos.slice(3,6);

        if(photos_array.length<3)
            while (photos_array.length < 3) {
                photos_array.push([''])
            }

        if(photos.length && busqueda)
            return(
                photos_array.map((photo, index) => {
                    return (
                        <Photo key={index} photo={photo} tamano={tamano} />
                    )
                })
            )
        else if(!photos.length && busqueda)    
            return(
                <p>No hay imagenes del lugar para mostrar</p>
            )
        else
            return(
               ''
            )

}

export default Photos;