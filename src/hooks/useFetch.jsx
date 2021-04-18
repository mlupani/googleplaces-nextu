import {useState, useEffect} from 'react';

const useFetch = (url, dependencia) => {

    const[data, setData] = useState([])
    const[error, setError] = useState(false)
    const[isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const fetchResource = async () => {

            try {

                const res = await fetch(url)
                if(!res.ok) throw new Error(res.status + ' ' + res.statusText)
                const data = await res.json()
                console.log("hago fetch");
                setData(data)
                console.log(data);

            } catch (error) {
                console.log(`error: ${error}`);
                setError(error);
            }

            setisLoading(false)
        }

        fetchResource()

    }, [url, dependencia]);

    return {data, error, isLoading}
}

export default useFetch;
