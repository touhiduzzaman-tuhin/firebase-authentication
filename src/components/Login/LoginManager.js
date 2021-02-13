import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFirebase = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

//Google Login API

export const googleLoginWithPopUp = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            // console.log(result);
            const { displayName, email } = result.user;

            const signInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                error: '',
                success: true
            }
            return signInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

//Log out with Google

export const signOutFromSite = () => {
    return firebase.auth().signOut()
        .then(result => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                error: '',
                success: true
            }
            return signOutUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

//Facebook Login

export const facebookLogin = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(facebookProvider)
        .then(result => {
            // console.log(result);
            const { displayName, email } = result.user;
            const facebookUser = {
                name: displayName,
                email: email,
                isSignedIn: true,
                error: '',
                success: true
            }
            return facebookUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

// Github Login
export const loginWithGithub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();

    return firebase.auth().signInWithPopup(githubProvider)
        .then(result => {

            // const { email} = result.email;
            // const githubUser = {
            //     name : '',
            //     email : email,
            //     isSignedIn : true,
            //     error: '',
            //     success: true
            // }
            // return githubUser;
            return result;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

//Create User

export const createUser = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            console.log(result.user);
            const newUserInfo = result.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            verifyUser();
            updateUserName(name);
            return newUserInfo;
        })
        .catch(err => {

        })
}


//Sign in User

export const signInUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(result => {
            const newUserInfo = result.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(err => {

        })
}

//Update User Name

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(function () {
        })
        .catch(function (error) {
        });
}

//Verify User

const verifyUser = () => {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}

//Password Reset

export const resetPassword = (email) => {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
    .then( () => {
        alert('Check Your Email For Password Reset.')
        // Email sent.
    }).catch( error => {
        // An error happened.
    });
}

//Delete Account 

export const deleteAccount = () => {
    const user = firebase.auth().currentUser;
    user.delete()
    .then( () => {
        alert('Your Account has been deleted successfully');
    // User deleted.
    }).catch(function(error) {
    // An error happened.
    });
}