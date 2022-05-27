// Import the functions you need from the SDKs you need
import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyAKtSI-wMFb3KAStp3XlS1ap0uOct65vtk',
   authDomain: 'crwn-clothing-db-e4834.firebaseapp.com',
   projectId: 'crwn-clothing-db-e4834',
   storageBucket: 'crwn-clothing-db-e4834.appspot.com',
   messagingSenderId: '154818857825',
   appId: '1:154818857825:web:95f66a10f1000259179320',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid);

   const userSnapshot = await getDoc(userDocRef);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
         });
      } catch (error) {
         console.log('error createing user', error.message);
      }

      return userDocRef;
   }

   //if user data does not exists
   //create / set the document with the daya from userAuth in my collection

   //if user data exists

   //return userDocRef
};
