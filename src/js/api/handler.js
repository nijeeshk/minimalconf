import axios from 'axios';
import Promise from 'bluebird';
import {API_ROOT} from '../config';

Promise.config({
  // Enable cancellation
  cancellation: true,
  warnings: false,
});

export default function(options) {
  return new Promise((resolve, reject, onCancel) => {
    let h = {};
    const token = window.localStorage.getItem('token');
    if (options.needAuth) {
      h.Authorization = `Bearer ${token}`;
    }

    if (options.isFormData) {
      h['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    h = {...h, ...options.headers};
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    onCancel(() => {
      source.cancel('Operation canceled by the user.');
    });

    axios({
      method: options.method,
      headers: h,
      url: API_ROOT + options.url,
      params: options.params,
      data: (() => {
        if (options.body) {
          if (options.isFormData) {
            return options.body;
          }
          return JSON.stringify(options.body);
        }
        return null;
      })(),
      cancelToken: source.token,
    }).then((response) => {
      resolve(response.data);
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log(e.message);
      } else {
        if (e.response) {
          if (e.response.status === 403 &&
            e.response.data &&
            e.response.data.code === 'token_expired') {
            const currentLocation =
              JSON.parse(JSON.stringify(window.location.hash));
            console.log('token expired! redirecting to login', currentLocation);
            localStorage.removeItem('token');
            window.location.hash = 'login';
          }
        }
        reject(e);
      }
    });
  });
}
