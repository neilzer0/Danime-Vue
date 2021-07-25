import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase'

import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/fontawesome-free-5.15.2-web/css/all.css'


import axios from 'axios'
import VueAxios from 'vue-axios'



const firebaseConfig = {
    apiKey: "AIzaSyDUpQ3pYhAZQDdEb6QJtFxxvh_nFkd-xAU",
    authDomain: "danime-17bf1.firebaseapp.com",
    databaseURL: "https://danime-17bf1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "danime-17bf1",
    storageBucket: "danime-17bf1.appspot.com",
    messagingSenderId: "311776070974",
    appId: "1:311776070974:web:2ab55041b1c5947e75f06f"
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')