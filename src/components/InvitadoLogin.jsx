import React, {Fragment, useState} from 'react';
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

import {insertLog} from '../functions/logs.js'

const InvitadoLogin = props => {

    const [nombreUser, setNombreUsuario] = useState('');

    const manejoClick = (e) =>{

        //document.getElementById("abrir").className ="";
        //document.getElementById("modal_fade").className = "";

        //e.preventDefault();
        props.loginWhere("invited",true);
        props.loginStatus(true);
        props.setNombreUser(nombreUser);
        props.setModal(false);


        insertLog(nombreUser, 'Logeo',  "invited", '')

    }

    const handleNombre = e => {
        setNombreUsuario(e.target.value)
    }

    const nombre = props.logged ? 'Logout' : 'Log in como invitado';
    const content = <div className="form-group">
                        <label htmlFor="nombre_invitado">Invitado</label>
                        <input type="text" onChange={handleNombre} className="form-control" id="nombre_invitado" placeholder="Nombre"/>
                        <br></br>
                        <button onClick={manejoClick} >Entrar</button>
                    </div>
    const fontawesome = <FontAwesomeIcon style={{marginLeft:"280px",width:"20px",marginTop:"5px"}} icon={faUser} size="xs"  />

    if(props.isLoading)
        return ''
    else
        return (
                <Fragment>
                    <Modal
                        className='btn btn-block btn-social btn-google'
                        styleButton={{"paddingLeft":"65px", "textAlign":"center", "backgroundColor":"green","marginRight":"10px"}}
                        buttonText={nombre}
                        titulo="Ingresar nombre de invitado"
                        contentModal={content}
                        fontAwesome={fontawesome}
                        modal={props.modal}
                        setModal={props.setModal}
                        id_modal="modal_invitado"
                    />
                </Fragment>
            );
}

export default InvitadoLogin;
