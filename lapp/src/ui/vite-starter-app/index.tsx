import { useEffect, useState } from 'react'
import logos from './logos';
import './index.css'

import FirebaseAuthService from '../../services/auth/index.js';
import { User } from '../../types';

import FirebaseLoginUI from '../FirebaseLoginUI.js';

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    FirebaseAuthService.onAuthStateChanged((user) => {
      if (user) {
        const _user: User = {
          id: user.uid,
        };
        setUser(_user);
      }
    });
  }, []);

  return (
    <>
      {user?
        <StarterApp />:
        <FirebaseLoginUI />
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
