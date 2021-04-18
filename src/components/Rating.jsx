import React , {useEffect } from 'react'
import raterJs from 'rater-js'
import '../css/Rating.css'

const Rating = props => {

    useEffect(() => {

       // if(props.busqueda){

            var myRating = raterJs({
                // the number of stars
                max: 5,
                step_size: 0.5,
                // star size
                starSize: 16,
                readOnly: true,
                element:document.querySelector("#rater"),
            })

            myRating.setRating(3)

        //}

    })

    return (
        <div style={{"marginLeft":"10px"}} id="rater"></div>
    );
}

export default Rating;