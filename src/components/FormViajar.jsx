import React, {Fragment, useState, useEffect} from 'react';

const FormViajar = ({busqueda, showMap, name, googleState}) => {

    const [botonActual, setActual] = useState("d-none");
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState(name);
    const [viaje, setViaje] = useState('');
    const [duracion, setDuracion] = useState('');
    const [google, setGoogle] = useState(googleState);

    useEffect(()=> {

        const calcularRuta = () =>{

            const google = window.google;
            var directionsService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer();
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 15,
                center: { lat: 41.85, lng: -87.65 },
            });
            directionsRenderer.setMap(map);

            var start = document.getElementById("origen").value;
            var end = destino;

            var request = {
                origin: start,
                destination: end,
                travelMode: viaje
            };
            directionsService.route(request, function(result, status) {
                if (status === 'OK') {
                    //console.log(result.routes);
                    setDuracion(<span>Duracion del viaje: {result.routes[0].legs[0].duration.text} </span>);
                    directionsRenderer.setDirections(result);
                }
            });
        }

        if(destino !== name)    setDestino(name)
        if(!google) setGoogle(window.google);
        if(origen)  document.getElementById("origen").value = origen
        if(origen && destino && viaje) calcularRuta();

    },[origen,viaje, name, google, destino])

    const handleViaje = e => {
        setViaje(e.target.value)
    }

    const searchPlace = () => {

        setViaje(document.getElementById("viaje").value)
        const request = {
            query: document.getElementById("origen").value,
            fields: ['photos', 'formatted_address',
            'name','place_id','geometry']
            };

        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: { lat: 41.85, lng: -87.65 },
        });
        const service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, findPlaceResult);
    }

    const findPlaceResult = (results, status) => {
        //console.log('PlaceServiceStatus: '+status);
        if (status === 'OK') {
            results.map((place) => {
                setOrigen(place.name)
                //calcularRuta();
                return true;
            })
        }
    }

    const getLocation = e => {

        e.preventDefault();
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = pos => {
            setActual("d-none")
            var crd = pos.coords;
            const mapCenter = new google.maps.LatLng(crd.latitude,crd.longitude);
            //console.log(mapCenter);
            //showMap(mapCenter);
            const request = {
                query: document.getElementById("origen").value,
                fields: ['photos', 'formatted_address',
                'name','place_id','geometry']
            };

            const service = new google.maps.places.PlacesService(mapCenter);
            service.findPlaceFromQuery(request, findPlaceResult);
        }

        const error = err => {
            alert("Indique un lugar de origen correcto: "+err);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    
    }

    

    if(busqueda)
        return (
            <Fragment>
                <br></br>
                <h5>Viajar</h5>
                <div className="form-inline">
                    <div className="form-group">
                        <input type="text" autoComplete="off" id="origen" placeholder={"Indicar Origen"} style={{width:"350px", display:"inline-block", "marginRight":"15px"}} className={"form-control"} />
                        <button style={{"marginTop":"-2px"}} id="ubicacion_actual" className={`btn btn-primary ${botonActual}`} onClick={getLocation}>Ubicacion actual</button>
                        </div>
                        <br></br>
                        <input type="text" value={destino} id="destino" readOnly style={{width:"350px", display:"inline-block", "marginRight":"15px"}} className={"form-control"} />
                        <select onChange={(e)=> handleViaje(e)} style={{width:"150px", display:"inline-block", "marginRight":"15px"}} id="viaje" className={"form-control"}>
                            <option value="DRIVING">Vehiculo</option>
                            <option value="TRANSIT">Transporte Publico</option>
                            <option value="BICYCLING">Bicileta</option>
                            <option value="WALKING">Caminando</option>
                        </select>
                        <button onClick={searchPlace} className={"btn btn-primary"}>Ir a destino</button>
                </div>
                {duracion}
            </Fragment>
        );
    else
        return ('')
}

export default FormViajar;
