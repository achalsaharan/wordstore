import firebase from 'firebase/app';

//these extend the firebase imported above ES6 syntax
import 'firebase/auth';
import 'firebase/firestore';

//firebase config files, this file is not added in the repository for security purposes
import firebaseConfig from '../config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
