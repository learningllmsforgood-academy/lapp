import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import { useEffect } from 'react'

import FirebaseAuthService from '../services/auth'
import { TypeUser, TypeLoginError } from '../types'

type TypeOnLoaded = () => void;
type TypeOnError = (error: firebaseui.auth.AuthUIError) => void;
type TypeOnSuccess = (authResult: firebase.auth.UserCredential, redirectUrl: string) => boolean;

type Props = {
    isUILoaded: boolean,
    loginError: TypeLoginError | undefined,
    user: TypeUser | undefined,

    onLoaded: TypeOnLoaded,
    onError: TypeOnError,
    onSuccess: TypeOnSuccess,

    // setUILoaded: (isLoaded: boolean) => void,
    // setLoginError: (error: TypeLoginError) => void, 
    // setUser: (user: TypeUser) => void,
};


const FirebaseLoginUI: React.FC<Props> = ({ isUILoaded, loginError, user, 
    // setUILoaded, setLoginError, setUser 
    onLoaded, onError, onSuccess

}) => {
    useEffect(() => {
        console.log("-> useEffect fired");
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (ui) {
            console.log("==> previous ui found = ", {
                p: ui.isPendingRedirect(),
            })
            // ui.reset();
        } else {
            console.log("==> no previous ui found");
            ui = new firebaseui.auth.AuthUI(FirebaseAuthService);
            ui.start("#firebase-auth-container", 
            {
                // doc for config options: https://github.com/firebase/firebaseui-web#configuration
                callbacks: {
                    // uiShown: () => {
                    //     setUILoaded(true);
                    // },
                    uiShown: onLoaded,

                    // signInFailure: (fbError) => {
                    //     // unrecoverable error during login
                    //     // doc: https://github.com/firebase/firebaseui-web#signinfailureerror
                    //     const error: TypeLoginError = {
                    //         message: fbError.message,
                    //         _upstreamError: fbError.toJSON()
                    //     }
                    //     setLoginError(error);
                    // },

                    signInFailure: onError,
            
                    // signInSuccessWithAuthResult: (authResult: firebase.auth.UserCredential, redirectUrl: string) => {
                    //     // login success!
                    //     // doc: https://github.com/firebase/firebaseui-web#signinsuccesswithauthresultauthresult-redirecturl
                    //     console.log("==> firebase login success! => ", { authResult, redirectUrl });
                    //     if (authResult.user) {
                    //         const fbUser = authResult.user;
                    //         const user: TypeUser = {
                    //             id: fbUser.uid,
                    //         };
                    //         setUser(user);
                    //     } else {
                    //         // as per docs should not happen
                    //         // most likely a bug in firebaseui
                    //         console.error("unexpected error while logging in. sign in sucess. no user.")
                    //     }
                        
                    //     // return true;
                    //     // true will redirect the page. 
                    //     // will need to have signInSuccessUrl parameter defined
            
                    //     // false won't redirect the page anywhere
                    //     return false;
                    // },

                    signInSuccessWithAuthResult: onSuccess,
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
            }
            );
        } 
    }, [ onLoaded, onError, onSuccess ]);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Login Page</h1>
            
            <div className='debugInfo'>
                <code>FirebaseUI Loaded: {JSON.stringify(isUILoaded)}</code><br />
                <code>FirebaseUI Error: {JSON.stringify({error: loginError})}</code><br />
                <code>FirebaseUI user: {JSON.stringify({user: user})}</code><br />
            </div>

            <div id="firebase-auth-container"></div>
        </>
    )
}

export default FirebaseLoginUI
