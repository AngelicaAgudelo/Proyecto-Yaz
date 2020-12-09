import firebase from 'firebase/app'
import 'firebase/storage'

const conf = {
    apiKey: "AIzaSyC158WIpJwHa0HaisMgcTvpRNQRD_hWGEs",
    authDomain: "yaz-85eb7.firebaseapp.com",
    databaseURL: "https://yaz-85eb7.firebaseio.com",
    projectId: "yaz-85eb7",
    storageBucket: "yaz-85eb7.appspot.com",
    messagingSenderId: "971635048254",
    appId: "1:971635048254:web:8048face491eb08da5766f",
    measurementId: "G-BCQS1H12DC"
}

firebase.initializeApp(conf)

const storage = firebase.storage()

export {
    storage
}