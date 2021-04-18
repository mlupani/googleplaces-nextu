import React, {useEffect} from 'react';
import useFetch from '../hooks/useFetch'

const Logs = ({logInsert}) => {

    const {data, error, isLoading} = useFetch('https://googleplacesapi-migue.herokuapp.com/logs.php?page=1', logInsert);

    if(isLoading)
        return (<div className="spinner-border text-danger" style={{textAlign:"center", marginLeft:"350px"}} role="status"><span className="sr-only"></span></div>);

    if(!data.length)
        return (<p>No hay elementos</p>)

    return (
        <div>
            <table className='table table-condensed table-bordered'>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Accion</th>
                        <th>Sitio</th>
                        <th>Lugar buscado</th>
                        <th>Fecha y hora</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(element=><tr key={element.ID}><td>{element.mail}</td><td>{element.tipo_busqueda}</td><td>{element.sitio}</td><td>{element.lugar_buscado}</td><td>{element.fecha_hora}</td></tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default Logs;
