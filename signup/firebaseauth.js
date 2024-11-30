// firebaseauth.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { 
  getFirestore, 
  setDoc, 
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

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
const storage = getStorage(app);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (messageDiv) {
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
      messageDiv.style.opacity = 0;
    }, 5000);
  } else {
    console.error(`Message div with id ${divId} not found`);
  }
}

async function initializeAuth() {
  const signUp = document.getElementById('submitSignUp');
  const signIn = document.getElementById('submitSignIn');

  if (signUp) {
    signUp.addEventListener('click', handleSignUp);
  }

  if (signIn) {
    signIn.addEventListener('click', handleSignIn);
  }

  onAuthStateChanged(auth, handleAuthStateChange);
}

async function handleSignUp(event) {
  event.preventDefault();
  const email = document.getElementById('rEmail')?.value;
  const password = document.getElementById('rPassword')?.value;
  const name = document.getElementById('name')?.value;

  if (!email || !password || !name) {
    showMessage('Please fill in all fields', 'signUpMessage');
    return;
  }

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
    console.error('Sign up error:', error);
    const errorCode = error.code;
    if (errorCode === 'auth/email-already-in-use') {
      showMessage('Email Address Already Exists!', 'signUpMessage');
    } else {
      showMessage(`Unable to create User: ${error.message}`, 'signUpMessage');
    }
  }
}

async function handleSignIn(event) {
  event.preventDefault();
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;

  if (!email || !password) {
    showMessage('Please enter both email and password', 'signInMessage');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const isAdmin = await checkAdminStatus(user);
    
    localStorage.setItem('loggedInUserId', user.uid);
    
    if (isAdmin) {
      showMessage('Admin login successful', 'signInMessage');
      window.location.href = '/admin/adminDashboard.html';
    } else {
      showMessage('Login successful', 'signInMessage');
      window.location.href = '/user/dashboard.html';
    }
  } catch (error) {
    console.error('Sign in error:', error);
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-credential') {
      showMessage('Incorrect Email or Password', 'signInMessage');
    } else {
      showMessage(`Login failed: ${error.message}`, 'signInMessage');
    }
  }
}

async function checkAdminStatus(user) {
  if (!user) return false;
  try {
    const adminDoc = await getDoc(doc(db, "admins", user.uid));
    return adminDoc.exists();
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

async function handleAuthStateChange(user) {
  if (user) {
    const isAdmin = await checkAdminStatus(user);
    if (isAdmin) {
      console.log("Admin user logged in");
      // You can add more admin-specific logic here if needed
    } else {
      console.log("Regular user logged in");
      // You can add more user-specific logic here if needed
    }
  } else {
    console.log("User is signed out");
    // You can add sign-out specific logic here if needed
  }
}

// Initialize authentication listeners
initializeAuth();

// Export the initialized Firebase instances and functions
export { app, auth, db, storage, showMessage, checkAdminStatus };