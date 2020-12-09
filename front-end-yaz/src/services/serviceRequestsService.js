import Api from './Api'

export default{
    addEvent(id, data) {
        return Api().post(`/service_requests/worker_id=${id}`, data)
    }
}