import axios from 'axios'

const requestApi = (endpoint, method = 'GET', body = null, responseType = 'json') => {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  // Tạo instance axios
  const instance = axios.create({ headers });

  // Tạo đối tượng config cho request
  const config = {
    method,
    url: `${process.env.REACT_APP_API_URL}${endpoint}`,
    headers,
    responseType,
  };
  // Nếu có body (đối với post, put, patch), thêm vào config
  if (body) {
    config.data = body;
  }
  // Gửi request với config đã tạo
  return instance(config);
}

// Thêm các phương thức HTTP như post, get, put, delete
requestApi.postRequest = (endpoint, body) => requestApi(endpoint, 'POST', body);
requestApi.getRequest = (endpoint) => requestApi(endpoint, 'GET');
requestApi.putRequest = (endpoint, body) => requestApi(endpoint, 'PUT', body);
requestApi.deleteRequest = (endpoint) => requestApi(endpoint, 'DELETE');

export default requestApi;
