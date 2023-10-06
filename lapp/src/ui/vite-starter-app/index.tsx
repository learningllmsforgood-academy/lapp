import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'


import { useState } from 'react'
import logos from './logos';
import './index.css'

import FirebaseLoginUI from '../FirebaseLoginUI.js';
import { TypeUser, TypeLoginError } from '../../types';

const getFirebaseUILoadedCallback = (setLoaded: (loaded: boolean) => void) => () => {
  setLoaded(true);
};

const getFirebaseUISignInFailureCallback = (setError: (error: TypeLoginError) => void) => (firebaseUIError: firebaseui.auth.AuthUIError) => {
  const error: TypeLoginError = {
    code: firebaseUIError.code,
    message: firebaseUIError.message,
  }
  setError(error);
}

const getFirebaseUISignInSuccessCallback = (setUser: (user: TypeUser) => void) => (authResult: firebase.auth.UserCredential, redirectUrl: string) => {
  // firebaseUI login success callback
  // doc: https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
  console.log("==> firebase login success! => ", { authResult, redirectUrl });
  if (authResult.user) {
      const fbUser = authResult.user;
      const user: TypeUser = {
          id: fbUser.uid,
      };
      setUser(user);
  } else {
      // as per docs should not happen
      // most likely a bug in firebaseui
      console.error("unexpected error while logging in. sign in sucess. no user.")
  }
  
  // return true;
  // true will redirect the page. 
  // will need to have signInSuccessUrl parameter defined

  // false won't redirect the page anywhere
  return false;
};

function App() {
  // should I make the app a functional component?
  const [isFirebaseLoginUILoaded, setFirebaseLoginUILoaded] = useState(false);
  const [loginError, setLoginError] = useState<TypeLoginError>();
  const [user, setUser] = useState<TypeUser>();
  
  const onFirebaseUILoaded = getFirebaseUILoadedCallback(setFirebaseLoginUILoaded);
  const onFirebaseUISignInError = getFirebaseUISignInFailureCallback(setLoginError);
  const onFirebaseUISignInSuccess = getFirebaseUISignInSuccessCallback(setUser);
  const loginUI = (<FirebaseLoginUI 
    isUILoaded={isFirebaseLoginUILoaded}
    loginError={loginError}
    user={user}
    onLoaded={onFirebaseUILoaded}
    onError={onFirebaseUISignInError}
    onSuccess={onFirebaseUISignInSuccess}
  />);


  const shouldShowLoginPage = !user;

  return (
    <>
      {shouldShowLoginPage?
        loginUI:
        <StarterApp />
      }
    </>
  );
}

function StarterApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="logo-section">
        {/* TODO: add LFG! app SVG logo here */}
        <a href="https://vitejs.dev" target="_blank">
          <img src={logos.viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={logos.reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="app-name">LFG! App</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          LFG! App Development - In Progress - 🧑‍🔧 🚧 📋
        </p>
      </div>

      <p className="read-the-docs">
        Docs and more details coming up soon.
      </p>
    </>
  )
}

export default App;
