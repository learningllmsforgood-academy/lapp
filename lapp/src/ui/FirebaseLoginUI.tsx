import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import FirebaseAuthService from '../services/auth'

import { useState, useEffect } from 'react'

function FirebaseLoginUI() {
    const [ authState, setAuthState ] = useState({});
    const [ loaded, setLoaded  ] = useState(false);
    
    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(FirebaseAuthService);

        ui.start("#firebase-auth-container", {
            // doc for config options: https://github.com/firebase/firebaseui-web#configuration
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    setAuthState(() => ({
                        success: true,
                        authResult,
                        redirectUrl,
                    }))
                    
                    // return true;
                    // true will redirect the page. 
                    // will need to have signInSuccessUrl parameter defined

                    // false won't redirect the page anywhere
                    return false;
                },
                signInFailure: (error) => {
                    setAuthState(() => ({
                        success: false,
                        error
                    }))
                },
                uiShown: () => {
                    setLoaded(true);
                },
            },
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                },
                {
                    provider: firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
                },
            ],
            tosUrl: () => {
                alert("TODO")
            },
            privacyPolicyUrl: () => {
                alert("TODO")
            },
        })
    }, [])

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Login Page</h1>
            <code id="loaded">FirebaseUI Loaded: {JSON.stringify(loaded)}</code>

            <div id="firebase-auth-container"></div>
            <div><code>{JSON.stringify(authState, null, 2)}</code></div>
        </>
    )
}

export default FirebaseLoginUI
