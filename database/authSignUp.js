import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
    txtEmail,
    txtPassword,
    btnReg
} from 'screens\reg\RegisterScreen.js'

const auth = getAuth();

const createAccount = async () => {
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

btnReg.addEventListener("click", createAccount);
