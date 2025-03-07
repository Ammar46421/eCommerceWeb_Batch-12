import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCGevvJoJoStRPr5Xn_qYjkfc3FLH1dCu4",
    authDomain: "auth-d6793.firebaseapp.com",
    projectId: "auth-d6793",
    storageBucket: "auth-d6793.appspot.com",
    messagingSenderId: "20536156957",
    appId: "1:20536156957:web:c3db6dee14eecc759337f4",
    measurementId: "G-RHEJ73L24Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // logout.style.display="block";
                    document.getElementById('loggedUserFName').innerText = userData.firstName;
                    document.getElementById('loggedUserLName').innerText = userData.lastName;
                    document.getElementById('loggedUserEmail').innerText = userData.email;



                }
                else {
                    console.log("no document found matching id")
                }
            })
            .catch((error) => {
                userInfoPage.style.display = "block";
                signInLink.style.display = "none";
                console.log("Error getting document");
            })
    }
    else {
        console.log("User Id not Found in Local storage")
    }
})

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            logout.style.display = "none";
            window.location.href = './../index.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})