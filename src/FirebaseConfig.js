import firebase from 'firebase'

const Config = {
  apiKey: "AIzaSyCRZc-DwVocH_AjseiKNTUtEs4FiXr1h-w",
  authDomain: "products-23ff3.firebaseapp.com",
  databaseURL: "https://products-23ff3.firebaseio.com",
  projectId: "products-23ff3",
  storageBucket: "products-23ff3.appspot.com",
  messagingSenderId: "367016668249"
}

const  firebaseApp = firebase.initializeApp(Config)

export {firebaseApp}