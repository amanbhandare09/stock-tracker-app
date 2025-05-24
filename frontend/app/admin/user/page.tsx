"use client"
import Userpage from './Userpage'
import React,{useEffect,useState} from 'react';
// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function checkAccessToken() {
        if (typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                return accessToken;
            } else {
                window.location.href = '/admin';
                return null;
            }
        }
        return null;
    }

    useEffect(() => {
        const token = checkAccessToken();
        if (token) {
            setIsAuthenticated(true);
            // console.log(token);
        }
    }, []);
    return(
        <Userpage/>
    );
}