import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAYai12ElU9K5E0kQKX7BNz45Spj2j8sII",
    authDomain: "e-commerce-4e9d6.firebaseapp.com",
    projectId: "e-commerce-4e9d6",
    storageBucket: "e-commerce-4e9d6.firebasestorage.app",
    messagingSenderId: "148778708550",
    appId: "1:148778708550:web:e0570bfaf8c7691b162447",
    measurementId: "G-DNEEL4FEK4"
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
    // userInfoPage.style.display = "block"; // Show user info
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
