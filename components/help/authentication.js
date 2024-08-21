import React, { useEffect, useState } from "react";
import axios from 'axios'
import API_URL from "../../config";

const Authentication = () =>{


    const [ param, getParams]= useState([])

    useEffect(() => {

        const tkn = window.localStorage.getItem("token")
        axios
            .get(API_URL+'/users/me', {
            headers: {
                Authorization: `Bearer ${tkn}`,
            },
            })
            .then(response => {
            // Handle success.
                getParams(response.data)

            //console.log('Data: ', response.data);
            
            })
            .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
            });

    }, ["token"])

    return { param }

}


export default Authentication