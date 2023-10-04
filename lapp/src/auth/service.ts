// fix this
// maybe try importing "firebase/compat/auth"

import firebaseApp from './firebase'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth"

const authService = getAuth(firebaseApp);


// this will actually anonymous sign in the user.
// so shouldn't actually do this.
// signInAnonymously(authService)
//     .then(userCredential => {
//         console.log("Anonymous user sign in: ", userCredential);
//     })
//     .catch(error => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error('Error while anonymous user sign in: ', errorCode, errorMessage);
//     });


// onAuthStateChanged(authService, (user) => {
//     if (user) {
//         const userID = user.uid;
//         console.log(`User logged in. UID = ${userID}. user => `, user);
//     } else {
//         console.log("user signed out");
//     }
// });

export default authService
