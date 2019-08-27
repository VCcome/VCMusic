import axios from 'axios';

export function get(url, config) {
  return new Promise((resolve, reject) => {
    axios.get(url, config)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error.response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export function post(url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config)
      .then(response => {
        resolve(response.data);
      }, error => {
        reject(error.response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};