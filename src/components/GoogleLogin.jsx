import React , {useState, useEffect, Fragment} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const GoogleLogin = props => {

    const [gapi,setGapi] = useState(window.gapi)
    const [user] = useState([]);

    useEffect(() => {
        const googleSignAPILoad = setInterval(() => {
            if (gapi){
                clearInterval(googleSignAPILoad);
                gapi.load('auth2',async function(){

                    const clientParam = {client_id:'699321370411-85bme9k73baj09nlt7jqqubvlbj7r9d5.apps.googleusercontent.com'}
                    gapi.auth2.init(clientParam)
                    const auth = await gapi.auth2.getAuthInstance();
                    const success = await auth.currentUser.get()
                    props.setLoading(false)
                    if(success.Rs && !props.logged){
                        const usuario = []
                        usuario['IDLog'] = success.Rs.RR
                        usuario['nombre'] = success.Rs.Te
                        usuario['mail'] = success.Rs.At
                        usuario['accessToken'] = success.tc.access_token
                        usuario['imagen'] = success.Rs.WI
                        props.setUser(usuario);
                        props.loginStatus(true);
                        props.loginWhere("google", true);
                    }
                })
            }else
                setGapi(window.gapi);
        },100);
    })

    const insertLog = async (mail, tipo_busqueda) => {
        try {
            let log = {
                'mail': mail,
                'tipo_busqueda': tipo_busqueda,
                'sitio': 'google',
                'lugar_buscado': ''
            }
            //console.log(log);
            const res = await fetch('https://googleplacesapi-migue.herokuapp.com/logs.php',
            {
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(log),
                mode: 'no-cors'
            });
            await res.json()

        } catch (error) {
            console.log(error);
        }
    };

    const login = () => {
        const clientParam = {client_id:'699321370411-85bme9k73baj09nlt7jqqubvlbj7r9d5.apps.googleusercontent.com'}
        gapi.auth2.init(clientParam)
        const auth = gapi.auth2.getAuthInstance();
        const loggedInGoogle = auth.isSignedIn.get();
        if (!loggedInGoogle){

        auth.signIn()
            .then(
            (success) => {
                user['IDLog'] = success.Rs.RR
                user['nombre'] = success.Rs.Te
                user['mail'] = success.Rs.At
                user['accessToken'] = success.tc.access_token
                props.setUser(user);
                props.loginStatus(true);
                props.loginWhere("google", true);

                insertLog(user['mail'],'Logeo');
            },
            (error) => {
                //alert("error?");
                props.loginStatus(false);
                props.loginWhere("google", false);
            }
            )
        }
        else {
            props.loginStatus(false);
            props.loginWhere("google", false);
        }
    }

    const logout = async () => {

        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut()
        auth2.disconnect();
        insertLog(props.user['mail'], 'deslogueo');
        try {
            window.location.reload();
            //props.loginStatus(false);
            //props.loginWhere("google", false);
        } catch (error) {
            console.log("Error al desconectar.."+error);
        }
    }

    const manejoClick = (e) =>{

        e.preventDefault();

        if (props.logged === false)
            login();
        else
            logout();
    }

    //const btnId = props.logged ? 'salir' : 'ingresar';
    const nombre = props.logged ? `${props.user.mail} | Log Out` : 'Google Log In';

    if(props.isLoading)
        return (<div className="spinner-border text-danger" style={{textAlign:"center", marginLeft:"350px"}} role="status"><span className="sr-only"></span></div>);
    else
        return (
            <Fragment>
                <button id="google-button" style={{"marginRight":"10px", "textAlign":"center"}} className='btn btn-block btn-social btn-google' onClick={manejoClick}>
                    {props.logged? <img style={{width:"37px"}} alt='imagen de perfil' src={props.user.imagen} ></img>:<FontAwesomeIcon style={{marginLeft:"280px", paddingTop:"5px"}} icon={faGoogle} />}
                    {nombre}
                </button>
            </Fragment>
        );

}

export default GoogleLogin;