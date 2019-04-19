import firebase from 'firebase/app'
import { initializeApp } from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBTvt0M0SEf1BvR3h310y5Sk-jIrEZ_ULw",
    authDomain: "funkhaus-eb6db.firebaseapp.com",
    databaseURL: "https://funkhaus-eb6db.firebaseio.com",
    projectId: "funkhaus-eb6db",
    storageBucket: "funkhaus-eb6db.appspot.com"
};

const app = initializeApp(firebaseConfig);

export const fireb = firebase;
export const db = app.database();
export const auth = app.auth();
