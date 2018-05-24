import * as firebase from 'firebase';
  // Initialize Firebase
  const prodConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_PROD_API_KEY,
    authDomain: "fotbolls-vm-2018.firebaseapp.com",
    databaseURL: "https://fotbolls-vm-2018.firebaseio.com",
    projectId: "fotbolls-vm-2018",
    storageBucket: "fotbolls-vm-2018.appspot.com",
    messagingSenderId: "713704838131"
  };
  
  const devConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_DEV_API_KEY,
      authDomain: "fotbolls-vm-2018-dev.firebaseapp.com",
      databaseURL: "https://fotbolls-vm-2018-dev.firebaseio.com",
      projectId: "fotbolls-vm-2018-dev",
      storageBucket: "fotbolls-vm-2018-dev.appspot.com",
      messagingSenderId: "550387333850"
    };
    
    const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
    
    if(!firebase.apps.length){
        firebase.initializeApp(config);
    }
  
  const auth = firebase.auth();

  export {
      auth,
  };



