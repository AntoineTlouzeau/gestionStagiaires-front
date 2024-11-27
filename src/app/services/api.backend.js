import axios from "axios";


const apiBackEnd = axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

export default apiBackEnd;

/**
 * Interceptor of request to automatically put the JWTToken in the header
 *
 * @author Peter Mollet
 */
// apiBackEnd.interceptors.request.use((request) => {
//     const storage = localStorage.getItem('persist:auth');
//     let token;
//     if (storage) token = JSON.parse(JSON.parse(storage).token);
//     if (token) request.headers['Authorization'] = `Bearer ${token}`;
//     return request;
// });
// apiBackEnd.interceptors.request.use((request) => {
//     const storage = localStorage.getItem('persist:auth');
//     let token;
//     if (storage) token = JSON.parse(JSON.parse(storage).token);
//     if (token) request.headers['Authorization'] = `Bearer ${token}`;
//     return request;
// });

/**
 * Interceptor of response, to see status code in the console and to handle the error
 *
 * @author Peter Mollet
 */
// apiBackEnd.interceptors.response.use(
//     (response) => {
//         console.log(response.status);
//         return response;
//     },
//     (error) => {
//         console.error(error);
//         return error;
//     },
// );