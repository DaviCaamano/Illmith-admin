import axios from "axios";

const queryFiles = (token) => {
    return axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URL + '/articles/images',
        headers: {auth: token}
    })
}
export default queryFiles;
