import React, {Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import NotFound from './components/NotFound'
import FormBuscar from './components/FormBuscar'
import Rater from 'react-rater'
import Result from './components/Result'
import Logins from './components/Logins'
import 'react-rater/lib/react-rater.css'

import {insertLog} from './functions/logs.js'

/* COMPONENTE PARA BUSCAR UN LUGAR CON LA API DE GOOGLE, DEVUELVE IMAGENES, LA DIRECCION DEL LUGAR Y EL MAPA CON EL LUGAR BUSCADO*/
const Appplaces = () => {

    const [direccion, setDireccion] = useState(null);
    const [logged, setLogged] = useState(false);
    const [FBLogon, setFB] = useState(false);
    const [GoogleLogon, setGoogleLogon] = useState(false);
    const [coments, setComents] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState('');
    const [map, setMap] = useState('');
    const [google, setGoogle] = useState(window.google);
    const [busqueda, setBusqueda] = useState(false);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [nearbyPlacesMore, setNearbyPlacesMore] = useState([]);
    const [contenido, setContenido] = useState('');
    const [contenidoName, setContenidoName] = useState('');
    const [horario, setHorario] = useState([]);
    const [rating, setRating] = useState(0);
    const [botones, setBotones] = useState([]);
    const [drater, setDisplayRater] = useState(false);
    const [cambiarDestino, SetCambiarDestino] = useState(false);
    const [invitedLogon, setInvitedLogin] = useState(false);
    const [nombreUser, setNombreUser] = useState('');
    const [modal, setModal] = useState('');
    const [user, setUser] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [whereLoging, setwhereLoging] = useState('')
    const [logInsert, setLogInsert] = useState(false)
    //const {data, error, isLoading} = useFetch("http://localhost:4444/tareas");

    const loginStatus = login => {
        setLogged(login)
    }

    const loginWhere = (where, login) => {
        if(where === "google")
            setGoogleLogon(login)

        if(where === "FB")
           setFB(login)
        
        if(where === "invited")
            setInvitedLogin(login)

        setwhereLoging(where);
    }

    const elegirDestino = event => {
        window.location.href = "#lugar";
        const destino = event.target.id;
        document.getElementById("lugar").value = destino;
        event.key = "Enter";
        SetCambiarDestino(true);
        buscar(event)
    }

    //APENAS SE MONTA EL COMPONENTE, CARGAR LA LIBRERIA PARA SU USO, LLAMO TANTO A LA API DE MAPS COMO LA API DE GOOGLE LOGIN
    //ACTUALIZADO PARA HOOKS
    useEffect(()=>{

        const googlePlaceAPILoad = setInterval(() => {
            if (google && !busqueda){
                clearInterval(googlePlaceAPILoad);
                console.log('Load Place API');
                const mapCenter = new google.maps.LatLng(4.624335,-74.064644);
                setMap(new google.maps.Map(document.getElementById('gmapContainer'), {
                center: mapCenter,
                zoom: 15
                }));
            }else
                setGoogle(window.google);
        },100);

        var buttons = [];

        /*CHEQUEO CONTENIDO PARA MOSTRAR DE LOS ESTADOS*/
        if(busqueda){
            if(contenidoName === "comentarios" ){
                setContenido(<table className='table table-condensed'><tbody>{coments}</tbody></table>);
                buttons.push(<button key='horario' style={{'marginRight':'10px'}} className="btn btn-danger" onClick={(e) => AsignarContenido(<ul key={horario}  className="list-group">{horario}</ul>, 'horario',e)}>Mostrar Horario</button>)
                buttons.push(<button key='nearby' style={{'marginRight':'10px'}} className="btn btn-success" onClick={(e) => AsignarContenido(<table className='table table-condensed'><tbody>{nearbyPlaces}</tbody></table>, 'cercanos',e)} >Mostrar Lugares Cercanos</button>)
            }

            else if(contenidoName === "horario" || contenidoName === ''){
                setContenido(<ul className="list-group">{horario}</ul>);
                buttons.push(<button key='comentarios' style={{'marginRight':'10px'}}  className="btn btn-primary" onClick={(e) => AsignarContenido(<table className='table table-condensed'><tbody>{coments}</tbody></table>, 'comentarios',e)} >Mostrar Comentarios</button> )
                buttons.push(<button  key='nearby2' style={{'marginRight':'10px'}} className="btn btn-success" onClick={(e) => AsignarContenido(<table className='table table-condensed'><tbody>{nearbyPlaces}</tbody></table>, 'cercanos',e)} >Mostrar Lugares Cercanos</button>)
            }

            else if(contenidoName === "cercanos"){
                setContenido(<Fragment><table className='table table-condensed'><tbody>{nearbyPlaces}</tbody></table><button onClick={(e) => (nearbyPlacesMore > nearbyPlaces)?setNearbyPlaces(nearbyPlacesMore):setNearbyPlaces(nearbyPlaces.slice(1,10))} className="btn btn-primary" >{(nearbyPlacesMore > nearbyPlaces)?"Mostrar Mas":"Mostrar Menos"}</button></Fragment>);
                buttons.push(<button  key='comentarios2' style={{'marginRight':'10px'}}  className="btn btn-primary" onClick={(e) => AsignarContenido(<table className='table table-condensed'><tbody>{coments}</tbody></table>, 'comentarios',e)} >Mostrar Comentarios</button> )
                buttons.push(<button  key='horario2' style={{'marginRight':'10px'}} className="btn btn-danger" onClick={(e) => AsignarContenido(<ul key={horario} className="list-group">{horario}</ul>, 'horario',e)}>Mostrar Horario</button>)
            }
        }

        setBotones(buttons);

    }, [google, nearbyPlaces, coments, horario, contenidoName,  busqueda,nearbyPlacesMore, cambiarDestino, name,logged])

    const searchPlace = valor => {
        const request = {
            query: valor ,
            fields: ['photos', 'formatted_address',
            'name','place_id','geometry']
            };

        const service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, findPlaceResult);
    }

    const findPlaceResult = (results, status) => {
        //console.log('PlaceServiceStatus: '+status);
        if (status === 'OK') {
            results.map((place) => {
                findNearbyPlaces(place.geometry.location);
                //console.log(place.geometry.location);
                showMap(place.geometry.location);
                findPlaceDetail(place.place_id);
                return true;
            })
        }
    }

    const findNearbyPlaces = location => {
        const request = {
            location: location,
            radius: '500',
            //type: ['restaurant']
        };
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, foundNearbyPlaces);

    }

    const foundNearbyPlaces = (nearbyPlaces,status) => {
        if (status === 'OK'){
            //console.log(nearbyPlaces);
            const places = []
            nearbyPlaces.forEach((element, index) =>{
                if(element.photos){
                    places.push(
                        <tr key={index}>
                            <td style={{width:"250px", "textAlign":"left"}}>{element.name}</td>
                            <td><button type="button" id={element.name} onClick={(e)=>elegirDestino(e)} className="btn btn-warning">Elegir Destino</button></td>
                            <td><img alt={element.icon} style={{width:"120px", height:"120px"}} src={element.photos[0].getUrl()} ></img></td>
                            <td><Rater total={5} rating={element.rating} interactive={false} /></td>
                        </tr>
                    )
                }
            })

            setNearbyPlaces(places.slice(1,10));
            setNearbyPlacesMore(places);
        }
    }

    const showMap = mapCenter => {
        //SHOWMAP  RECIBNE LATITUD Y LONGITUD, CREA UN MAPA Y COLOCA UN MARCADOR EN LA POSICION INDICADA
        var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: mapCenter});
        new google.maps.Marker({position: mapCenter, map: map});
    }

    const findPlaceDetail = placeIdFound => {
        var request = {
        placeId: placeIdFound,
        fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address',
        'icon', 'id', 'name', 'photo', 'place_id', 'plus_code', 'scope','geometry','rating',
        'type', 'url', 'utc_offset_minutes', 'vicinity','opening_hours','business_status','reviews']
        };
        const service = new google.maps.places.PlacesService(map);
        service.getDetails(request, foundPlaceDatail);
    }

    const foundPlaceDatail = (place, status) => {
        if (status === 'OK'){
            var horario_show
            var placePhotos=[]
            if (place.photos){
                place.photos.map((placePhoto, index) => {
                    if(index < 6){
                        placePhotos[index]=placePhoto.getUrl();
                        return 1;
                    }
                    else
                        return 0;
                })
            }

            /*SETEO ESTADOS*/
            if(place.reviews)
            {
                var coments_new = place.reviews.map((coment, index) => <tr key={index}><td>{coment.author_name}</td><td>{coment.text}</td></tr>);
                setComents(coments_new)
            }

            setPhotos(placePhotos)

            if(place.rating){
                setRating(place.rating)
            }

            setName(place.name)
            setDireccion(<span id="direcion_busq"> {place.formatted_address}</span>)

            if(place.opening_hours)
                horario_show = place.opening_hours.weekday_text.map((element,index) => <li key={index} className="list-group-item" aria-current="true">{element}</li>)
            else{
                horario_show  = <p>No hay horarios disponibles</p>
            }

            setHorario(<ul className="list-group">{horario_show}</ul>)

            setDisplayRater(true);
            setBusqueda(true);
            insertLog((user.mail)?user.mail:nombreUser, 'Destino', whereLoging, place.name)
            setLogInsert(true);
        }
    }

    const AsignarContenido = (contenido, mostrar,e) => {
        e.preventDefault();
        setContenido(contenido);
        setContenidoName(mostrar);
    }

    const buscar = e => {
        const valor = document.getElementById('lugar').value
        if(e.type==="click" || (e.type==="keyup" && e.key === "Enter"))
        {
            setLogInsert(false);
            searchPlace(valor);
            document.getElementById("lugar").value = "";
        }
    }

    var classModal = ''
    if(modal) classModal= "modal-backdrop fade show";

    //if(isLoading) return ("LOADING API...")
    //if(error) return (`HUBO UN ERROR AL CARGAR LA API ${error} `);

    if(logged)
        return (
            <Router>
                <Route exact path="/" render={() => {
                    return (
                        <div className="col-md-12">
                        <Header LoginStatus={loginStatus} Logged={logged} FBLogon={FBLogon} GoogleLogon={GoogleLogon} InvitedLogon={invitedLogon} loginWhere={loginWhere} nombreUser={nombreUser} modal={modal} setModal={setModal} isLoading={isLoading} setLoading={setLoading} user={user} logInsert={logInsert} setUser={setUser}  ></Header>
                        <FormBuscar buscar={buscar} />
                        <Result name={name}
                                busqueda={busqueda}
                                direccion={direccion}
                                photos={photos}
                                botones={botones}
                                drater={drater}
                                contenidoName={contenidoName}
                                contenido={contenido}
                                rating={rating}
                                showMap={showMap}
                                cambiarDestino={cambiarDestino}
                                google={google}
                                user={user}
                                whereLoging={whereLoging}
                                logInsert={logInsert}
                                setLogInsert={setLogInsert}
                                />
                        </div>
                    )
                }}>
                </Route>

                <Route exact path="/posts" render={() => {
                    /*PRUEBA DE ROUTES*/
                    return (
                        <div className="col-md-12">
                            posts
                        </div>
                    )
                }}>
                </Route>

                {/*RUTA PREDEFINIDA PARA NOT FOUND*/}
                <Route Component={NotFound}></Route>

                <div id="modal_fade" className={classModal} ></div>

            </Router>

        );
    else
        return (
                <Router>
                <Switch>
                    <Route exact path="/">
                        <Fragment>
                            <Header LoginStatus={loginStatus} Logged={logged} loginWhere={loginWhere} modal={modal} setModal={setModal} setUser={setUser}  ></Header>
                            <Logins LoginStatus={loginStatus} Logged={logged} loginWhere={loginWhere} setNombreUser={setNombreUser} modal={modal} setModal={setModal} setUser={setUser} isLoading={isLoading} setLoading={setLoading} ></Logins>
                            <div id="modal_fade" className={classModal} ></div>
                        </Fragment>
                    </Route>

                    {/*RUTA PREDEFINIDA PARA NOT FOUND*/}
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </Router>

        )

}

export default Appplaces;