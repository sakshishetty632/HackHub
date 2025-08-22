// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: 'hackhub-vy5ju',
  appId: '1:94464590698:web:22232e963b2678b5799b13',
  storageBucket: 'hackhub-vy5ju.firebasestorage.app',
  apiKey: 'AIzaSyBAvrdRLexuFXTA-rmkfQu4Gh5w4zdabnI',
  authDomain: 'hackhub-vy5ju.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '94464590698',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
