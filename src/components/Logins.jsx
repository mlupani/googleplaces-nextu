import React from 'react';
import GoogleLogin from './GoogleLogin'
import FBLogin from './FacebookLogin'
import InvitadoLogin from './InvitadoLogin'

const Logins = props => {

    return (
        <div className="row">
            <div className="d-grid gap-2 col-8 container"  style={{marginTop:"200px"}}>
                <GoogleLogin loginStatus={props.LoginStatus} loginWhere={props.loginWhere} logged={props.Logged} setUser={props.setUser} isLoading={props.isLoading} setLoading={props.setLoading} />
                <br></br>
                <FBLogin loginStatus={props.LoginStatus} loginWhere={props.loginWhere} logged={props.Logged} isLoading={props.isLoading} setLoading={props.setLoading} setUser={props.setUser}/>
                <br></br>
                <InvitadoLogin
                    loginStatus={props.LoginStatus}
                    loginWhere={props.loginWhere}
                    logged={props.Logged}
                    setNombreUser={props.setNombreUser}
                    modal={props.modal}
                    setModal={props.setModal}
                    isLoading={props.isLoading}
                    setLoading={props.setLoading}
                    />
            </div>
        </div>
    );
}

export default Logins;
