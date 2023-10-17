import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
    txtEmail,
    txtPassword,
    btnLog,
} from 'screens\reg\LoginScreen.js'

const auth = getAuth();

const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

btnLog.addEventListener("click", loginEmailPassword)