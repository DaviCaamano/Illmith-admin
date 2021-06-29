import axios from "axios";

const getArticle = (path) => {
    return axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URL + '/articles/',
        params: { path }
    })
}
export default getArticle;
