import React, { useState, useEffect } from "react";
import moment from 'moment';

import * as api from "./api/listUrl";

export default function App() {
    const [url, setUrl] = useState('')
    const [listData, setListData] = useState([])
    const [details, setDetails] = useState({})
    const [token, setToken] = useState('')
    const [session, setSession] = useState('')
    
    // get all data
    const list = async () => {
        try {
            const response = await api.fetchAll()
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        const getList = async () => {
            const allDetails = await list();
            if(allDetails) setListData(allDetails)
        }
        getList()
    }, [listData])
    
    // get session, token
    const infoReceive = async () => {
        try {
            const response = await api.auth()
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const getToken = async () => {
            const infoDetails = await infoReceive();
            if(infoDetails) setDetails(infoDetails)
            setToken(details.token)
            setSession(details.session_id)
        }
        getToken()
    }, [])
 
    
    // handle submit url 

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newTime = new Date()
        
        const exist = listData.find(data => data.url === url)
        if(exist) {
            setDetails(exist)
            const handleUpdateTime = () => {
                api.updateTime(exist.id, {...exist, 
                    date:  moment(newTime).format('MMMM Do YYYY, h:mm:ss a') })
            }
            handleUpdateTime()
        } else if(!exist){
            // create new url details ...
            const handleCreateUrl = () => {
                const request = {
                    id: listData.length +1,
                    name: '',
                    date: moment(newTime).format('MMMM Do YYYY, h:mm:ss a'),
                    url: url,
                    location: ''
                }
                const response = api.createUrl(request);
                setListData([...listData,response.data])
            } 
            handleCreateUrl()
        }
    }
    
    return(
    <>
        <form onSubmit={handleSubmit}>
            <label>URL: </label>
            <input 
                type='text' 
                name="name" 
                placeholder='add url' 
                onChange={(e) => setUrl(e.target.value)}
            />
            <button>Get Link</button>
        </form>
        <p>File: {details.name}</p>
        <p>Last access: {details.date}</p>
        <div style={{ border: '1px black solid', width: '300px', height: '20px' }}>{details.location}</div>
        <form method="get" action={details.location}>
            <button type="submit">Download!</button>
        </form>
    </>
    );
}