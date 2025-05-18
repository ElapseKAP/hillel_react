import axios from "axios";

const API_URI = import.meta.env.VITE_API_URI;

const services = {
    post: function(ep, entity) {
      const config = {
        baseURL: API_URI,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return axios.post(ep, entity, config)
        .then( response => response.status )
        .catch( error => {
          console.error( 'Create new task operation: ', error );
          throw error;
        })
    },
    get: function (ep) {
      return axios.get( ep, {baseURL: API_URI} )
        .then( response => response.data )
        .catch( error => {
          console.error( `Getting data from ${ep}: `, error );
          throw error;
        });
    },
    put: function(ep, statusId) {
      if ( typeof statusId !== 'number' ) {
        return false;
      }

      const data = { status: statusId };
      const config = {
        baseURL: API_URI,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      return axios.put(ep, data, config)
        .then( response => response.status )
        .catch(error => {
          const position = ep.indexOf('/') + 1;
          const id = ep.slice(position);

          console.error(`Update status of task with id: ${id}: `, error);
          throw error;
        });
    }
}

export default services;
