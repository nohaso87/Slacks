// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Login user
const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  }catch(err) {
    throw err
  }
}

// Login user using google authentication
const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const queryDb = query(collection(db, 'users'), where ("uid", "==", user.uid))
    const docs = await getDocs(queryDb)

    if (docs.docs.length === 0 ){
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        authProvider: 'google'
      })
    }
  } catch (err) {
    alert(err)
  }
}

// Signup user
const registerUserWithEmailAndPassword = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      username: firstLetterUpper(username), 
      email: email.toLowerCase(),
      imgpath: "",
      authProvider: 'local',
      starred: [],
      active: 0
    })

  } catch (err) {
    throw err
  }
}


const firstLetterUpper = (name) => {
  let x = name.toLowerCase();
  const firstLetter = x[0].toUpperCase()
  const remainder = x.slice(1);
  const justified = firstLetter+remainder;
  return justified;
}

// Password reset
const resetPassword  = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (err) {
    alert(err)
  }
}

// Signout user
const logout =  () => {
  signOut(auth)
}

// CHANNEL REF
const channelRef = collection(db, "channels")

// Create New Channel 
const createNewChannel = async (data, user) => {
  try {
    await setDoc(doc(channelRef, data.name), {
      starred: false,
      createdBy: user,
      description: data.description,
      createdAt: serverTimestamp()
    })
  }catch(err){
    throw err
  }
}

export {
  auth,
  db,
  storage,
  logout,
  resetPassword,
  loginUserWithEmailAndPassword, 
  registerUserWithEmailAndPassword,
  signInWithGoogle,
  createNewChannel
}


