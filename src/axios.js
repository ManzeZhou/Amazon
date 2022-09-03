import axios from "axios";

const instance = axios.create(
    {//API
        baseURL:'https://us-central1-app-88a2a.cloudfunctions.net/api'
    });

export default instance;
// 'http://localhost:5001/app-88a2a/us-central1/api'

//deploy 'https://us-central1-app-88a2a.cloudfunctions.net/api'