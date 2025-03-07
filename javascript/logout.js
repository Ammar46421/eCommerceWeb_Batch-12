import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Select navbar elements
const signInLink = document.getElementById("signInLink");
const userInfoPage = document.getElementById("userInfoPage");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        // signInLink.style.display = "none"; // Hide login
        

        // Fetch user data from Firestore
        const userId = localStorage.getItem("loggedInUserId");
        if (userId) {
            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById("loggedUserFName").innerText = userData.firstName;
                    document.getElementById("loggedUserLName").innerText = userData.lastName;
                    document.getElementById("loggedUserEmail").innerText = userData.email;
                } else {
                    console.log("No document found matching ID");
                }
            } catch (error) {
                console.error("Error getting user document:", error);
            }
        } else {
            console.log("User ID not found in local storage");
        }
    } else {
        // User is signed out
        signInLink.style.display = "block"; // Show login
        userInfoPage.style.display = "none"; // Hide user info
    }
    userInfoPage.style.display = "block"; // Show user info
});

// Logout function
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUserId");
    signOut(auth)
        .then(() => {
            window.location.href = "./../index.html";
        })
        .catch((error) => {
            console.error("Error Signing out:", error);
        });
});
