import axios from "axios";

const API_URI = import.meta.env.VITE_API_URI;

const services = {
    post: function(ep, entity) {
        const config = {
            baseURL: API_URI,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post(ep, entity, config)
            .then( response => {
                return response.status;
            })
            .catch( error => {
                console.error( 'Create new task operation: ', error );
            })
    },
    get: function (ep) {
        return axios.get( ep, {baseURL: API_URI} )
            .then( response => response.data )
            .catch( error => {
                console.error( `Getting data from ${ep}: `, error );
            });
    },
}

export default services;
