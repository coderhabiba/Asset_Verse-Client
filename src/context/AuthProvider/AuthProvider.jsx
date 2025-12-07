import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './../../firebase/firebase.config';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './../../firebase/firebase.config';
import { AuthContext } from './../AuthContext/AuthContext';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // register with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with email/password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google signin
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // update profile
  const updateUserProfile = profile => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, profile);
    }
    return Promise.reject('No user logged in');
  };

  // observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const roleData = userDoc.exists() ? userDoc.data().role : null;

          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: roleData,
          });
        } catch (err) {
          console.error('Error fetching user role:', err);
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: null,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
