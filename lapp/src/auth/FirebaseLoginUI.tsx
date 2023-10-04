import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import { useState, useEffect } from 'react'
import authService from './service'

import '../App.css' // for now to display correctly

function FirebaseLoginUI() {
    const [ authState, setAuthState ] = useState({});
    const [ loaded, setLoaded  ] = useState(false);
    const [ loadingEvents, setLoadingEvents ] = useState<Date[]>([]);
    

    useEffect(() => {
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(authService)

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
                    setLoaded(prev => !prev);
                    setLoadingEvents(events => ([ ...events, new Date() ]));
                },
            },
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                },
                // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
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
            <div id="firebase-auth-container"></div>

            <div id="loaded">Loaded: {JSON.stringify(loaded)}</div>
            <div><code>Loading events: {JSON.stringify(loadingEvents)}</code></div>

            <div><code>{JSON.stringify(authState, null, 2)}</code></div>
        </>
    )
}

export default FirebaseLoginUI
