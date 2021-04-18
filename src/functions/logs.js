export const insertLog = async (mail, tipo_busqueda, whereLoging, name) => {
    try {
        let log = {
            'mail': mail,
            'tipo_busqueda': tipo_busqueda,
            'sitio': whereLoging,
            'lugar_buscado': name
        }
        //console.log(log);
        const res = await fetch('https://googleplacesapi-migue.herokuapp.com/logs.php',
        {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(log),
            mode: 'no-cors'
        });
        const data = await res.json()
        //alert(data);

    } catch (error) {
        //alert(error);
    }
};