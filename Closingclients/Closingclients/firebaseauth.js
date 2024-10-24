// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,  // Fixed typo
  signInWithEmailAndPassword      // Fixed typo
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { 
  getFirestore, 
  setDoc, 
  doc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaNzDsBYR5W3ilBn5WjpkL3JkXU-toNss",
  authDomain: "closingclients-6afd9.firebaseapp.com",
  projectId: "closingclients-6afd9",
  storageBucket: "closingclients-6afd9.appspot.com",
  messagingSenderId: "172719805662",
  appId: "1:172719805662:web:00f3153c44758dade75e4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const name = document.getElementById('name').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = {
      email: email,
      name: name
    };
    
    showMessage('Account created successfully', 'signUpMessage');
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);
    window.location.href = 'indexSignUp.html';
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/email-already-in-use') {
      showMessage('Email Address Already Exists!', 'signUpMessage');
    } else {
      showMessage('Unable to create User', 'signUpMessage');
      console.error(error);
    }
  }
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    showMessage('Login successful', 'signInMessage');
    const user = userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href = 'dashboard.html';
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-credential') {
      showMessage('Incorrect Email or Password', 'signInMessage');
    } else {
      showMessage('Account does not Exist', 'signInMessage');
      console.error(error);
    }
  }
});