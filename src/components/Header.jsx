import React, {useState, useEffect} from 'react'
import Modal from './Modal'
import GoogleLogin from './GoogleLogin'
import FBLogin from './FacebookLogin'
import Logs from './Logs.jsx'

const Header = props => {

        const [Btn, setBtn] = useState('');
        const [logs, setLogs] = useState([]);

        useEffect(() => {

            setLogs(<Logs logInsert={props.logInsert} />);

            if(props.FBLogon && props.Logged)
                setBtn(<div className="col-auto">
                        <FBLogin loginStatus={props.LoginStatus} loginWhere={props.loginWhere} logged={true} setUser={props.setUser} user={props.user} />
                        <Modal
                            styleModal={{display:"inline-block", "marginLeft":"10px"}} buttonText="Terminos y condiciones" contentModal={"Contenido de Terminos y condiciones"} titulo={"Terminos y condiciones"} modal={props.modal} setModal={props.setModal} id_modal={"modal_terminos"} >
                        </Modal>
                    </div>)

            if(props.GoogleLogon && props.Logged)
                setBtn(<div className="col-auto">
                            <GoogleLogin loginStatus={props.LoginStatus} loginWhere={props.loginWhere} setUser={props.setUser} logged={true} isLoading={props.isLoading} setLoading={props.setLoading} user={props.user}  />
                            {props.user.mail === "mlupani2@gmail.com"?
                                <Modal
                                    styleModal={{display:"inline-block", "marginLeft":"10px"}}
                                    contentModal={logs}
                                    buttonText="Log"
                                    titulo={"Ultimos movimientos de la web"}
                                    modal={props.modal}
                                    setModal={props.setModal}
                                    id_modal={"modal_log"}
                                    widthModal={'1000px'}   >
                                </Modal>:
                                ''
                            }
                            <Modal
                                styleModal={{display:"inline-block", "marginLeft":"10px"}} contentModal="Contenido de Terminos y condiciones" buttonText="Terminos y condiciones" titulo={"Terminos y condiciones"} modal={props.modal} setModal={props.setModal} id_modal={"modal_terminos"}   >
                            </Modal>
                        </div>)

             if(props.InvitedLogon && props.Logged)
                setBtn(<div className="col-auto">
                            Logueado como {props.nombreUser}&nbsp;&nbsp;&nbsp;
                            <button onClick={() => props.LoginStatus(false)} >Logout</button> &nbsp;
                            <Modal
                                styleModal={{display:"inline-block", "marginLeft":"10px"}} contentModal="Contenido de Terminos y condiciones" buttonText="Terminos y condiciones" titulo={"Terminos y condiciones"} modal={props.modal} setModal={props.setModal} id_modal={"modal_terminos"}  >
                            </Modal>
                        </div>)

            if(!props.Logged)
                setBtn(<div className="col-auto">
                            <Modal
                                styleModal={{display:"inline-block", "marginLeft":"10px"}} buttonText="Terminos y condiciones" contentModal={"Contenido de Terminos y condiciones"} titulo={"Terminos y condiciones"} modal={props.modal} setModal={props.setModal} id_modal={"modal_terminos"} >
                            </Modal>
                        </div>)

        },[props.FBLogon, props.Logged, props.GoogleLogon, props.LoginStatus, props.loginWhere, props.nombreUser, props.InvitedLogon, props.modal, props.setModal,props, logs])

        

        return (
            <div style={{float: "right", "marginTop": "10px"}} className="row">
                {Btn}
            </div>
        );
}

export default Header;