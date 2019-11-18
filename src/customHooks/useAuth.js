import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react';
import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext({
  authUser: null,
  signin: null,
  signup: null,
  signout: null,
  sendEmailVerification: null
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const cleanup = firebase.auth.onAuthStateChange(user => {
      if (user) setAuthUser(user);
      else setAuthUser(null);
    });
    return () => {
      cleanup();
    };
  }, [firebase]);

  const signin = useCallback(
    (email, password) => {
      return firebase.auth
        .signInWithEmailandPassword(email, password)
        .then(response => response.user);
    },
    [firebase]
  );

  const signup = useCallback(
    (email, password) => {
      return firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then(response => response.user);
    },
    [firebase]
  );

  const signout = useCallback(() => {
    return firebase.auth.signout();
  }, []);

  const sendEmailVerification = useCallback(() => {
    return firebase.auth.currentUser.sendEmailVerification();
  }, [firebase]);

  return {
    authUser,
    signin,
    signup,
    signout,
    sendEmailVerification
  };
};
