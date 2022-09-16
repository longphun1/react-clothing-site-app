import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz6-6wvlwi0tY-Y0gz_7zeT2P6AvKO7cA",
  authDomain: "crwn-clothing-db-a38fb.firebaseapp.com",
  projectId: "crwn-clothing-db-a38fb",
  storageBucket: "crwn-clothing-db-a38fb.appspot.com",
  messagingSenderId: "514201956300",
  appId: "1:514201956300:web:ef095f521bb84cbfe77769"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid )

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password ) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}