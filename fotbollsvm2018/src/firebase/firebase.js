import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyAa_o6H3NFHsEQXDyRlkrpHMkSJX2M4fuk',
    authDomain: 'fotbolls-vm-2018.firebaseapp.com',
    databaseURL: 'https://fotbolls-vm-2018.firebaseio.com',
    projectId: 'fotbolls-vm-2018',
    storageBucket: 'fotbolls-vm-2018.appspot.com',
    messagingSenderId: '713704838131',
};
firebase.initializeApp(config);

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};
