// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBiBlX9zQSBLWErSD_23bk-JlJ-e7JUmf4",
    authDomain: "whatsapp-challenge-1405d.firebaseapp.com",
    projectId: "whatsapp-challenge-1405d",
    storageBucket: "whatsapp-challenge-1405d.appspot.com",
    messagingSenderId: "415991519055",
    appId: "1:415991519055:web:439c83239656efc134973a",
    measurementId: "G-SS9Z7T5TKR"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;