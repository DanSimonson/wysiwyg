import firebase from 'firebase'

const Config = {
    apiKey: "AIzaSyC7AnbiZol5oYL_olPmknKza_g-oKTtojI",
    authDomain: "all-purpose-238011.firebaseapp.com",
    databaseURL: "https://all-purpose-238011.firebaseio.com",
    projectId: "all-purpose-238011",
    storageBucket: "all-purpose-238011.appspot.com",
    messagingSenderId: "19979990333"
}

const  firebaseApp = firebase.initializeApp(Config)

export {firebaseApp}