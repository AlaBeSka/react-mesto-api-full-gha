const BASE_URL = 'https://api.alabeska.nomoreparties.sbs';

function makeRequest(url, method, body, token) {
  const headers = {
      "Content-Type": "application/json"
  }
  if (token !== undefined) {
      headers["Authorization"] = `Bearer ${token}`;
  }
  const config = {
      method,
      headers
  }
  if (body !== undefined) {
      config.body = JSON.stringify(body)
  }

  return fetch(`${BASE_URL}${url}`, config)
      .then((res) => {return res.json()});
}

export const register = (email, password) => {
  return makeRequest('/signup', 'POST', {email, password})
  };

export const authorize  = (email, password) => {
  return makeRequest('/signin', 'POST', {email, password}).then((res) => {
      if (res.token) {
          localStorage.setItem("jwt", res.token);
          console.log(res.token)
      }
      return res;
  });
};



export const getToken = (jwt) => {
  return makeRequest('/users/me', 'GET', undefined, jwt)
};