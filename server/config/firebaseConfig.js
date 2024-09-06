const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyDS20Rr6h-tw_ADsBWOcml3TtWyirYFGZU",
  authDomain: "recipiemanagement-ca161.firebaseapp.com",
  projectId: "recipiemanagement-ca161",
  storageBucket: "recipiemanagement-ca161.appspot.com",
  messagingSenderId: "791234906224",
  appId: "1:791234906224:web:ab52957bc8af59ca54ccb5",
  measurementId: "G-Y7SRLYHY3H",
};

const app = firebase.initializeApp(firebaseConfig);

module.exports = app;
