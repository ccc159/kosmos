const { initializeApp } = require('firebase/app');
const { getDatabase, onValue, push, ref, set } = require('firebase/database');

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

const piecesRef = ref(getDatabase(app), 'pieces');

function popComments() {
  const commenttemps = [
    'Tthe use of color in Dream City is really amazing. Klee was able to create a sense of vibrancy and energy through the colors he chose.',
    "I don't really see what all the fuss is about. The colors are too bright and the composition is too chaotic. I much prefer Klee's more subdued works.",
    "The bold and bright colors are part of the composition's unique charm.",
    'I love the whimsical nature of Dream City, it reminds me of a fairytale world!',
    'Dream City feels like a place straight out of a storybook. I love the playful use of color and shapes.',
    'I see what you mean, but I feel like Dream City is a bit too chaotic and overwhelming for my taste. It almost feels like Klee threw everything but the kitchen sink into this painting.',
    'I love the use of black in this piece. It creates a feeling of depth and mystery.',
    "I don't think the black is the only thing that makes this piece interesting. The abstract shapes and patterns are also fascinating.",
    'It creates a sense of depth and mystery.',
    "The black is too dark and the composition is too chaotic. I much prefer Klee's more subdued works.",
  ];
  onValue(piecesRef, (snapshot) => {
    const pieces = Object.values(snapshot.val());

    // choose random 7 comments for each piece
    let i = 0;
    for (const piece of pieces) {
      console.log(i);
      i += 1;
      // remove(ref(getDatabase(), `/pieces/${piece.id}/comments`));
      for (const comment of commenttemps) {
        push(ref(getDatabase(), `/pieces/${piece.id}/comments`), comment);
      }
    }

    console.log('done');
  });
}

popComments();
