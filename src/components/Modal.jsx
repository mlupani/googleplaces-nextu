import React, {Fragment, useState} from 'react'

const Modal = props => {

    const [modalOpen, setModalOpen] = useState('');

    const modalToggle = (e, modo) => {

        if(modo)    {
            props.setModal(true);
            setModalOpen(e.target.id)
        }
        else    {
            props.setModal(false);
            setModalOpen('')
        }

    }

    var width = '500px'
    if(props.widthModal) width=props.widthModal

    return (
        <Fragment>
            <button id={props.id_modal} onClick={(e) =>modalToggle(e,true)} style={props.styleButton} className={props.className}>
                {props.fontAwesome}
                {props.buttonText}
            </button>
            <div style={props.styleModal}>
                <div className={props.modal === true && props.id_modal === modalOpen? "modal d-block":"modal d-none"}  id="boton_modal" tabIndex="-1" aria-labelledby="exampleModalLiveLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog" style={{'maxWidth':width}}>
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLiveLabel">{props.titulo}</h5>
                        <button type="button" className="btn-close" onClick={(e)=> modalToggle(e,false)} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.contentModal}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={modalToggle}  id="cerrar" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Modal;