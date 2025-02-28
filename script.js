// Import Firebase modules (modular SDK v11.4.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Your Firebase configuration (provided)
const firebaseConfig = {
  apiKey: "AIzaSyDYevS22SYVg52c2xfL_1E-j_djdzhxFPk",
  authDomain: "kikivy-game.firebaseapp.com",
  projectId: "kikivy-game",
  storageBucket: "kikivy-game.firebasestorage.app",
  messagingSenderId: "701248167909",
  appId: "1:701248167909:web:6d77c68e86f60760fc590c",
  measurementId: "G-Z53L2JHJGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// -------------------------
// Unified Authentication Form
// -------------------------
let authMode = "login";  // can be "login" or "signup"

// DOM Elements for Auth
const authSection = document.getElementById("auth-section");
const authNameInput = document.getElementById("auth-name");
const authEmailInput = document.getElementById("auth-email");
const authPasswordInput = document.getElementById("auth-password");
const authBtn = document.getElementById("auth-btn");
const toggleAuthModeLink = document.getElementById("toggle-auth-mode");
const toggleAuthText = document.getElementById("toggle-auth-text");
const authMessage = document.getElementById("auth-message");

// Toggle between Login and Sign Up modes
toggleAuthModeLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (authMode === "login") {
    authMode = "signup";
    authNameInput.style.display = "block";
    authBtn.innerText = "Sign Up";
    toggleAuthText.innerHTML = 'Already have an account? <a href="#" id="toggle-auth-mode">Login</a>';
  } else {
    authMode = "login";
    authNameInput.style.display = "none";
    authBtn.innerText = "Login";
    toggleAuthText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-auth-mode">Sign Up</a>';
  }
  authMessage.innerText = "";
});

// Authentication button handler
authBtn.addEventListener("click", async () => {
  const email = authEmailInput.value;
  const password = authPasswordInput.value;

  if (authMode === "signup") {
    const name = authNameInput.value;
    if (!name) {
      authMessage.innerText = "Please enter your name.";
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      authMessage.innerText = "Sign up successful! You are logged in.";
      // Save user's name and default stage to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), { stage: 1, name: name });
    } catch (err) {
      authMessage.innerText = "Error: " + err.message;
    }
  } else {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      authMessage.innerText = "Login successful!";
    } catch (err) {
      authMessage.innerText = "Error: " + err.message;
    }
  }
});

// Logout Handler
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    authSection.style.display = "block";
    stageSection.style.display = "none";
    logoutBtn.style.display = "none";
    authMessage.innerText = "You have logged out.";
  } catch (err) {
    authMessage.innerText = "Error: " + err.message;
  }
});

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Hide auth section and show stage progression
    authSection.style.display = "none";
    stageSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
    await loadUserProgress(user);
  } else {
    authSection.style.display = "block";
    stageSection.style.display = "none";
    logoutBtn.style.display = "none";
  }
});

// -------------------------
// Stage Progression and Personalization
// -------------------------
const stageSection = document.getElementById("stage-section");
const stageList = document.getElementById("stage-list");
const stageTitle = document.getElementById("stage-title");
const stageDescription = document.getElementById("stage-description");
const completeStageBtn = document.getElementById("complete-stage-btn");
const stageFeedback = document.getElementById("stage-feedback");
const welcomeMessage = document.getElementById("welcome-message");

// Load user progress and welcome message from Firestore
async function loadUserProgress(user) {
  const userDocRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDocRef);
  let stage = 1;
  let name = "";
  if (docSnap.exists()) {
    const data = docSnap.data();
    stage = data.stage || 1;
    name = data.name || "";
  } else {
    await setDoc(userDocRef, { stage: 1 });
  }
  // Personalize welcome message
  if (name === "Kiera" || name === "Ivy") {
    welcomeMessage.innerText = `Welcome, ${name}! Let's have some fun learning Python!`;
  } else if (name) {
    welcomeMessage.innerText = `Welcome, ${name}! Ready to level up?`;
  } else {
    welcomeMessage.innerText = `Welcome to Learn Python!`;
  }
  updateStageUI(stage);
}

// Update stage list and current stage display
function updateStageUI(currentStage) {
  stageList.innerHTML = "";
  for (let i = 1; i <= 20; i++) {
    const li = document.createElement("li");
    li.innerText = "Stage " + i;
    if (i < currentStage) {
      li.classList.add("completed");
      li.innerText += " (Badge Earned)";
    } else if (i === currentStage) {
      li.classList.add("current");
      li.innerText += " (Current)";
    }
    stageList.appendChild(li);
  }
  stageTitle.innerText = "Stage " + currentStage + ": " + getStageTitle(currentStage);
  stageDescription.innerText = getStageDescription(currentStage);
}

// Stage titles (customize as needed)
function getStageTitle(stage) {
  const titles = {
    1: "Introduction to Python",
    2: "Printing & Variables",
    3: "Basic Arithmetic",
    4: "Conditionals",
    5: "Loops",
    6: "Functions",
    7: "Lists & Tuples",
    8: "Dictionaries",
    9: "Working with Strings",
    10: "Modules & Libraries",
    11: "File Handling",
    12: "Error Handling",
    13: "Working with Data",
    14: "Introduction to OOP",
    15: "More on Functions",
    16: "Advanced Loops",
    17: "Recursion",
    18: "Debugging Techniques",
    19: "Building Projects",
    20: "Final Challenge"
  };
  return titles[stage] || "Python Mastery";
}

// Stage descriptions (customize as needed)
function getStageDescription(stage) {
  const descriptions = {
    1: "Welcome to Stage 1! Learn what Python is and see a simple example.",
    2: "Explore printing text and using variables to store data.",
    3: "Learn about numbers and simple arithmetic operations.",
    4: "Discover how to make decisions using if-else statements.",
    5: "Loops help you repeat tasks – let’s dive in!",
    6: "Understand how functions let you reuse code.",
    7: "Learn to store multiple items with lists and tuples.",
    8: "Dictionaries use key-value pairs – like a mini database!",
    9: "Play with strings and text manipulation.",
    10: "Explore useful modules and libraries in Python.",
    11: "Learn how to read and write files.",
    12: "Master error handling to keep your programs running.",
    13: "Work with data using Python’s powerful tools.",
    14: "Get introduced to Object-Oriented Programming (OOP).",
    15: "Dive deeper into the world of functions.",
    16: "Learn advanced techniques for looping.",
    17: "Understand recursion – a fun way to solve problems.",
    18: "Practice debugging to fix errors in your code.",
    19: "Start building small projects to apply what you’ve learned.",
    20: "Take on the final challenge and showcase your Python skills!"
  };
  return descriptions[stage] || "Keep exploring and mastering Python!";
}

// Confetti function using canvas-confetti
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// When "Complete Stage" is clicked, advance to the next stage and trigger confetti
completeStageBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;
  // Get current stage number from stage title text
  const currentStageText = stageTitle.innerText;
  let currentStage = parseInt(currentStageText.split(" ")[1]);
  if (currentStage < 20) {
    currentStage++;
    try {
      await updateDoc(doc(db, "users", user.uid), { stage: currentStage });
      stageFeedback.innerText =
        "Great job! You earned a badge for Stage " +
        (currentStage - 1) +
        ". Now move on to Stage " +
        currentStage +
        "!";
      updateStageUI(currentStage);
      launchConfetti();
    } catch (err) {
      stageFeedback.innerText = "Error: " + err.message;
    }
  } else {
    stageFeedback.innerText = "Congratulations! You've completed all 20 stages!";
    launchConfetti();
  }
});


