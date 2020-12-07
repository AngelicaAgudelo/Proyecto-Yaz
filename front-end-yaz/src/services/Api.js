import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3050',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}