import Api from './Api'

export default {

    getUsers() {
        return Api().get('/users')
    },
    addUser(data) {
        return Api().post('/users', data)
    },
    getUserById(id) {
        return Api().get(`/users/id=${id}`)
    },
    getUserByEmail(email) {
        return Api().get(`/users/email=${email}`)
    },
    updateUser(id, data) {
        return Api().put(`/users/id=${id}`, data)
    },
    deleteUser(id) {
        return Api().delete(`/users/id=${id}`)
    },
    getClients() {
        return Api().get(`/users/type=2`)
    },
    getWorkers() {
        return Api().get(`/users/type=1`)
    },getUserByName(name) {
        return Api().get(`/users/name=${name}`)
    }
}