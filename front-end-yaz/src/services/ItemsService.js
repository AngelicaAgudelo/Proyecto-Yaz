import Api from './Api'

export default {

    getItems() {
        return Api().get('/item')
    },
    addItem(data) {
        return Api().post('/item', data)
    },
    getItemById(id) {
        return Api().get(`/item/${id}`)
    },
    updateItem(id, data) {
        return Api().put(`/item/id=${id}`, data)
    },
    deleteItem(id) {
        return Api().delete(`/item/${id}`)
    }
}