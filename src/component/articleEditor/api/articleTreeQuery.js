import axios from "axios";

const queryArticlesTree = (token) => {
    return axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URL + '/articles/tree',
        headers: {auth: token}
    })
}
export default queryArticlesTree;
