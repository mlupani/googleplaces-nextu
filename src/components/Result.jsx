import React, {Fragment,useState, useEffect} from 'react';
import Photos from './Photos'
import FormViajar from './FormViajar'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

const Result = ({name, busqueda, direccion, photos, botones, drater, contenidoName, contenido, rating, showMap,cambiarDestino,google, user, whereLoging, logInsert, setLogInsert}) => {

    const [formviajar, setformviajar] = useState('')
    

    useEffect(() => {

       if(busqueda || cambiarDestino) setformviajar(<FormViajar busqueda={busqueda} showMap={showMap} name={name} google={google} />)
    }, [busqueda, cambiarDestino,name, google, showMap, contenidoName, user.mail, whereLoging, logInsert, setLogInsert]);

    

    return (
        <Fragment>
            <br></br><br></br>
            <div className="col-12">
                <div className="row" style={{"textAlign":"center"}}>
                    <h3>{name}</h3>
                    <Photos busqueda={busqueda} photos={photos} fila={1} tamano={2} />
                        <div className="col-6">
                        {direccion}
                        <div id="map"></div>
                    </div>
                </div>
                <div className="row" style={{"textAlign":"center"}}>
                    <div className="col-6" style={{"textAlign":"left"}}>
                    <div className="row" style={{"textAlign":"center"}}>
                        <Photos busqueda={busqueda} photos={photos} fila={2} tamano={4} />
                    </div>
                    <div className="row" style={{"textAlign":"left"}}>
                        <div className="col-12">
                            {formviajar}
                        </div>
                    </div>
                    </div>
                    <div className="col-6" style={{"textAlign":"left"}}>
                        <br></br>
                        <Fragment>{botones}<Rater style={(!drater)?{'display':'none'}:{'display':'inline-block'}} total={5} rating={rating} interactive={false} /></Fragment>
                        <br></br>
                        <br></br>
                        <div className="col-12" style={{"textAlign":"center"}}>
                        <h4 style={{"textTransform": "capitalize"}} >{contenidoName}</h4>
                        </div>
                        <Fragment>{contenido}</Fragment>
                    </div>
                </div>
            </div>
            <br></br>
        </Fragment>
    );
}

export default Result;
