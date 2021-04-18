import React, {useState, useEffect, Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

import {insertLog} from '../functions/logs.js'

const FBLogin = props => {

    const [fbLogon, setFBLogon] = useState(false);

    const manejoOnClick = (e) => {

        e.preventDefault();
        console.log("manejoclick");
        //if (FB){
            if (e.target.id==='autenticar'){
                if (!fbLogon)
                   window.FB.login(fbLoginStatus, {scope: 'public_profile,email',auth_type: 'reauthorize' })
                else
                    window.FB.logout(fbLoginStatus)
            }
            else
                window.FB.logout(fbLoginStatus)
        //}
    }


    useEffect(()=>{
        iniciarFB();
    })

    const iniciarFB = () =>{

            window.fbAsyncInit = function() {
                window.FB.init({
                    appId      : '881524756026260',
                    cookie     : true,
                    xfbml      : true,
                    status     : true,
                    version    : 'v10.0'
                });
                window.FB.AppEvents.logPageView();
                var fbListo = new Event('FBListo');
                document.dispatchEvent(fbListo);
            };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v10.0&appId=881524756026260';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
       //document.addEventListener('FBListo', fbLoginStatus);
       

    }

    const fbLoginStatus = () => {
        var logged='';
        window.FB.getLoginStatus((response) => {
            const loginStatus = response.status;
            switch (loginStatus) {
                case 'connected':
                    logged=true;

                        window.FB.api('/me', {fields: 'id,name,email,picture'}, function(response) {
                            const fbinfo = []
                            fbinfo["ID"] = response.id;
                            fbinfo["name"] = response.name;
                            fbinfo["mail"] = response.email;
                            fbinfo["imagen"] = response.picture.data.url;

                            /*
                            setFBLogon(logged)
                            props.loginStatus(logged);
                            props.loginWhere("FB", logged);
                            */
                            props.setUser(fbinfo);

                            insertLog(fbinfo["mail"], (logged)?'Logeo':'Deslogueo',  "Facebook", '')

                        });

                    break;
                default:
                    logged=false;

                    break;
            }

            setFBLogon(logged)
            props.loginStatus(logged);
            props.loginWhere("FB", logged);
            if(props.user && !logged)  insertLog(props.user['mail'], 'Deslogueo',  "Facebook", '')
        });
        
    }

    const btnId = props.logged ? 'salir' : 'autenticar';
    const nombre =props.logged ? `${props.user['mail']} | Logout`  : 'Facebook Log In';

    if(props.isLoading)
        return ''
    else
        if(props.logged)
            return (
                <Fragment>
                    <button id={btnId} style={{"marginRight":"10px", "textAlign":"center"}} className='btn btn-block btn-social btn-facebook' onClick={manejoOnClick}>
                        {(props.user)? <img  alt="perfil" src={props.user["imagen"]}></img>:''}
                        {nombre}
                        </button>
                </Fragment>
            );
    else
        return (
            <Fragment>
                <button id={btnId} style={{"marginRight":"10px", "textAlign":"center"}} className='btn btn-block btn-social btn-facebook' onClick={manejoOnClick}>
                    {(props.user)? <img  alt="perfil" src={props.user["imagen"]}></img>:''}
                    <FontAwesomeIcon style={{marginLeft:"280px", paddingTop:"5px"}} icon={faFacebook} />
                    {nombre}
                    </button>
            </Fragment>
        );
}

export default FBLogin;