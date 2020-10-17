import Api from './Api'

export default {

    getUsers() {
        return Api().get('/users')
    },
    addUser(data) {
        return Api().post('/users', data)
    },
    getUserById(id) {
        return Api().get(`/users/${id}`)
    },
    updateUser(id, data) {
        return Api().put(`/users/${id}`, data)
    },
    deleteUser(id) {
        return Api().delete(`/users/${id}`)
    }
}