// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAxe_Qkpr7TUCydAeyC2UVWNyGEja20iXQ',
  authDomain: 'kosmos-45d48.firebaseapp.com',
  databaseURL: 'https://kosmos-45d48-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'kosmos-45d48',
  storageBucket: 'kosmos-45d48.appspot.com',
  messagingSenderId: '321821914454',
  appId: '1:321821914454:web:5905bba0cee4d3060592f7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const piecesRef = ref(getDatabase(app), 'pieces');

export const addPiece = (piece: IPiece) => {
  const newPieceRef = push(piecesRef);
  set(newPieceRef, piece);
};
