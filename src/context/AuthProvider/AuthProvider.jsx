import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './../../firebase/firebase.config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext/AuthContext';

const AuthProvider = ({ children }) => {
  const initialUser = (() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return savedUser && token ? JSON.parse(savedUser) : null;
  })();
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  // express backend login
  const loginUserWithExpress = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        'https://asset-verse-server-sigma.vercel.app/login',
        {
          email,
          password,
        }
      );
      const data = res.data;

      if (data?.token && data?.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
      }
      throw new Error(data.message || 'Invalid login response from server');
    } catch (err) {
      console.error('Express login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = profile => {
    return updateProfile(auth.currentUser, profile);
  };

  // restore user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (currentUser && savedUser && token) {
        try {
          const dbUser = JSON.parse(savedUser);
          const combinedUser = {
            ...dbUser,
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || dbUser.name,
            photo:
              currentUser.photoURL || dbUser.profileImage || dbUser.companyLogo,
          };
          setUser(combinedUser);
        } catch (e) {
          console.error('Error parsing saved user', e);
        }
      } else if (!currentUser && savedUser && token) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
        if (savedUser) localStorage.removeItem('user');
        if (token) localStorage.removeItem('token');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signInUser,
    logOut,
    updateUserProfile,
    loginUserWithExpress,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
