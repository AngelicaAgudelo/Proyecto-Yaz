import Api from './Api'

export default {

    getItems() {
        return Api().get('/items')
    },
    addItem(data) {
        return Api().post('/items', data)
    },
    getItemById(id) {
        return Api().get(`/items/${id}`)
    },
    updateItem(id, data) {
        return Api().put(`/items/id=${id}`, data)
    },
    deleteItem(id) {
        return Api().delete(`/items/${id}`)
    }
}