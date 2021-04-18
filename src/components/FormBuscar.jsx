import React, {Fragment} from 'react';

const FormBuscar = (props) => {
    return (
        <Fragment>
            <br></br><br></br><br></br>
            <input style={{"marginTop":"20px"}} type="text" onKeyUp={props.buscar} className="form-control" id="lugar" placeholder="Indica un Lugar"  />
            <br></br>
            <button className="btn btn-primary" onClick={props.buscar} >Buscar lugar</button>
        </Fragment>
    );
}

export default FormBuscar;
