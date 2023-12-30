import axios from "axios";
import jsonBig from 'json-bigint';

axios.defaults.transformResponse = (response) => {
    return jsonBig.parse(response)
}

export default axios