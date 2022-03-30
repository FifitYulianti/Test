import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetchData (url){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() =>{
        setLoading(true)
        axios({
            url: `http://localhost:3000/${url}`,
            method: 'GET',
        })
            .then(({ data }) => {
                setData(data)
            })
            .catch(err => {
                setError(err)
            })
            .finally(_=> setLoading(false))
    }, [])

    return [data, setData, loading, error]
}