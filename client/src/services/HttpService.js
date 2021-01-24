import axios from 'axios';

class HttpService {

    constructor() {
        this.baseUrl = process.env.REACT_APP_NODE_HOST + ':' + process.env.REACT_APP_NODE_PORT;
    }

    get = url => {
        return axios.get(this.baseUrl + url);
    };

    post = (url, body) => {
        return axios.post(this.baseUrl + url, body);
    };

    graphql = (body, variables) => {
        if (variables) {
            const bodyVars = {
                query: body,
                variables
            };
            return axios.post(this.baseUrl + '/graphql', bodyVars);
        } else {
            return axios.post(this.baseUrl + '/graphql', body);
        }
    };

    getPokeApi = url => {
        return axios.get(url);
    };

}

export default new HttpService();