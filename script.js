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
let authMode = "login";  // "login" or "signup"

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

// Load user progress and display a personalized welcome message
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
  if (name === "Kiera" || name === "Ivy") {
    welcomeMessage.innerText = `Welcome, ${name}! Let's have some fun learning Python!`;
  } else if (name) {
    welcomeMessage.innerText = `Welcome, ${name}! Ready to level up?`;
  } else {
    welcomeMessage.innerText = `Welcome to Learn Python!`;
  }
  updateStageUI(stage);
}

// Update stage list and current stage details
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
  // Disable the Complete Stage button until the challenge is met
  completeStageBtn.disabled = true;
  // Load the interactive game for the current stage
  loadGameForStage(currentStage);
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
    1: "Learn what Python is and see a simple example.",
    2: "Discover how to print text and use variables.",
    3: "Practice basic arithmetic operations.",
    4: "Learn to make decisions using if-else statements.",
    5: "Understand loops to repeat tasks.",
    6: "Explore how functions let you reuse code.",
    7: "Manage groups of data with lists and tuples.",
    8: "Use dictionaries to store key-value pairs.",
    9: "Manipulate text with string operations.",
    10: "Dive into modules and libraries.",
    11: "Learn how to handle files.",
    12: "Master error handling techniques.",
    13: "Work with data in exciting ways.",
    14: "Get introduced to Object-Oriented Programming.",
    15: "Deepen your understanding of functions.",
    16: "Tackle advanced loop challenges.",
    17: "Solve problems with recursion.",
    18: "Practice debugging to fix errors.",
    19: "Start building your own projects.",
    20: "Take on the final challenge and show your skills!"
  };
  return descriptions[stage] || "Keep exploring and mastering Python!";
}

// -------------------------
// Interactive Game for Each Stage
// -------------------------
// This simple game uses a canvas where falling objects appear.
// Kids must click on the objects ("catch" them) until they reach a threshold.
// Once the threshold is met, the challenge is complete and the Complete Stage button is enabled.

let gameCanvas, gameCtx;
let fallingObjects = [];
let gameScore = 0;
let gameThreshold = 5; // will be set based on stage
let gameAnimationFrame;

// Initialize and load the game for the given stage
function loadGameForStage(stage) {
  gameThreshold = 4 + stage; // Increase challenge with stage number
  gameScore = 0;
  fallingObjects = [];
  
  gameCanvas = document.getElementById("game-canvas");
  if (!gameCanvas) return;
  gameCtx = gameCanvas.getContext("2d");
  gameCanvas.width = 600;
  gameCanvas.height = 400;
  
  // Start generating falling objects
  generateFallingObject();
  // Start the game loop
  cancelAnimationFrame(gameAnimationFrame);
  gameLoop();
  // Ensure click listener is added (avoid duplicate listeners)
  gameCanvas.removeEventListener("click", onCanvasClick);
  gameCanvas.addEventListener("click", onCanvasClick);
}

// Generate a new falling object with random properties
function generateFallingObject() {
  let obj = {
    x: Math.random() * gameCanvas.width,
    y: -20,
    radius: 15,
    speed: 1 + Math.random() * 2
  };
  fallingObjects.push(obj);
  if (gameScore < gameThreshold) {
    setTimeout(generateFallingObject, 1500);
  }
}

// Main game loop: update positions and draw objects
function gameLoop() {
  gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  
  fallingObjects.forEach((obj) => {
    obj.y += obj.speed;
    gameCtx.beginPath();
    gameCtx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI);
    gameCtx.fillStyle = "#ffea00"; // brilliant neon yellow
    gameCtx.fill();
    gameCtx.strokeStyle = "#ffffff";
    gameCtx.stroke();
  });
  
  // Remove objects that have fallen off-screen
  fallingObjects = fallingObjects.filter(obj => obj.y - obj.radius < gameCanvas.height);
  
  // Draw the score on the canvas
  gameCtx.font = "20px Arial";
  gameCtx.fillStyle = "#ffffff";
  gameCtx.fillText("Caught: " + gameScore + " / " + gameThreshold, 10, 30);
  
  if (gameScore < gameThreshold) {
    gameAnimationFrame = requestAnimationFrame(gameLoop);
  } else {
    gameCanvas.removeEventListener("click", onCanvasClick);
    stageFeedback.innerText = "Challenge completed! Click 'Complete Stage' to proceed.";
    completeStageBtn.disabled = false;
  }
}

// Handle canvas clicks to check if an object was caught
function onCanvasClick(event) {
  const rect = gameCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  for (let i = 0; i < fallingObjects.length; i++) {
    let obj = fallingObjects[i];
    let dist = Math.sqrt((x - obj.x) ** 2 + (y - obj.y) ** 2);
    if (dist <= obj.radius) {
      gameScore++;
      fallingObjects.splice(i, 1);
      break;
    }
  }
}

// -------------------------
// Confetti Celebration on Stage Completion
// -------------------------
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// -------------------------
// Complete Stage Handler
// -------------------------
completeStageBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;
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

