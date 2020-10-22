import Api from './Api'

export default {

    getEvents() {
        return Api().get('/service')
    },
    addEvent(data) {
        return Api().post('/service', data)
    },
    getEventById(id) {
        return Api().get(`/service/${id}`)
    },
    updateEvent(id, data) {
        return Api().put(`/service/${id}`, data)
    },
    deleteEvent(id) {
        return Api().delete(`/service/${id}`)
    }
}