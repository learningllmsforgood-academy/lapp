// using firebase for auth

import FirebaseApp from "../firebase";

const FirebaseAuthService = FirebaseApp.auth();

FirebaseAuthService.onAuthStateChanged((user) => {
    if (user) {
        const userID = user.uid;
        console.log(`user (UID = ${userID}) logged in. user => `, user);
    } else {
        console.log("no user signed in");
    }
});

export default FirebaseAuthService;
