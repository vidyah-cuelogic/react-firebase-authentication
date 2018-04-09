import * as firebase from 'firebase';

// var config = { apiKey: "AIzaSyCmrOCUjPI3IVRdygMcbG6erW6QuQNgxNg", 
// authDomain: "ganesh-test-83821.firebaseapp.com", 
// databaseURL: "https://ganesh-test-83821.firebaseio.com", 
// projectId: "ganesh-test-83821", 
// storageBucket: "ganesh-test-83821.appspot.com", 
// messagingSenderId: "117252154332" }; 


var config = {
apiKey: "AIzaSyB46rdsrBHVZnnJZ4RAiwgJbtRo1psWddU",
authDomain: "fir-learn-605f9.firebaseapp.com",
databaseURL: "https://fir-learn-605f9.firebaseio.com",
projectId: "fir-learn-605f9",
storageBucket: "fir-learn-605f9.appspot.com",
messagingSenderId: "146762772833"
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
var facebookAuth = new firebase.auth.FacebookAuthProvider();
var emailAuth = new firebase.auth.EmailAuthProvider();
export {
  auth,
  facebookAuth,
  emailAuth
};


