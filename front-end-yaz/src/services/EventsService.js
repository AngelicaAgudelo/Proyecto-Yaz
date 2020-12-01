import Api from './Api'

export default {

    getEvents() {
        return Api().get('/services')
    },
    addEvent(data) {
        return Api().post('/services', data)
    },
    getEventById(id) {
        return Api().get(`/services/${id}`)
    },
    updateEvent(id, data) {
        return Api().put(`/services/id=${id}`, data)
    },
    deleteEvent(id) {
        return Api().delete(`/services/id=${id}`)
    }
}