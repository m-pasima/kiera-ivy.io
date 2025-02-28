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
// Stage Challenges
// -------------------------
const challenges = [
  {
    title: "Introduction to Python",
    description: "Print 'Hello, World!'",
    starterCode: "print('Hello, World!')",
    expectedOutput: "Hello, World!"
  },
  {
    title: "Variables",
    description: "Write code to print 'I love Python'",
    starterCode: "print('I love Python')",
    expectedOutput: "I love Python"
  },
  {
    title: "Basic Arithmetic",
    description: "Write code to add 2 and 3 and print the result.",
    starterCode: "print(2 + 3)",
    expectedOutput: "5"
  },
  {
    title: "Conditionals",
    description: "Write an if statement that prints 'Yes' if 10 is greater than 5.",
    starterCode: "if 10 > 5:\n    print('Yes')",
    expectedOutput: "Yes"
  },
  {
    title: "Loops",
    description: "Write a for loop that prints numbers 1 to 3 on separate lines.",
    starterCode: "for i in range(1, 4):\n    print(i)",
    expectedOutput: "1\n2\n3"
  }
  // Extend with more challenges up to stage 20
];

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

// Update stage list and current stage details; load challenge for the stage
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
  // Load the corresponding challenge (if defined)
  const challenge = challenges[currentStage - 1];
  if (challenge) {
    stageTitle.innerText = "Stage " + currentStage + ": " + challenge.title;
    stageDescription.innerText = "Complete the coding challenge below:";
    loadChallengeForStage(challenge);
  } else {
    stageTitle.innerText = "Stage " + currentStage + ": Final Challenge";
    stageDescription.innerText = "Build your own project!";
    // You can define a custom challenge for stages beyond the provided list.
    loadChallengeForStage({
      description: "Type your project code here.",
      starterCode: "# Start coding...\n",
      expectedOutput: ""
    });
  }
  completeStageBtn.disabled = true;
  stageFeedback.innerText = "";
}

// -------------------------
// Code Challenge Functions
// -------------------------
const challengeInstructions = document.getElementById("challenge-instructions");
const codeEditor = document.getElementById("code-editor");
const runCodeBtn = document.getElementById("run-code-btn");
const codeOutput = document.getElementById("code-output");
const challengeFeedback = document.getElementById("challenge-feedback");

// Load a challenge into the code editor and instructions area
function loadChallengeForStage(challenge) {
  challengeInstructions.innerText = challenge.description;
  codeEditor.value = challenge.starterCode;
  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  // Save expected output for verification
  codeEditor.dataset.expectedOutput = challenge.expectedOutput;
}

// Built-in read function for Skulpt
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

// Run the code in the editor using Skulpt and check the output
runCodeBtn.addEventListener("click", () => {
  const prog = codeEditor.value;
  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  Sk.configure({
      output: function(text) {
          codeOutput.innerText += text;
      },
      read: builtinRead
  });
  Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, prog, true);
  }).then(function() {
      // Compare output to expected value (trim whitespace)
      const userOutput = codeOutput.innerText.trim();
      const expected = codeEditor.dataset.expectedOutput.trim();
      if (userOutput === expected || expected === "") {
          challengeFeedback.innerText = "Challenge completed! You may complete this stage.";
          completeStageBtn.disabled = false;
          launchConfetti();
      } else {
          challengeFeedback.innerText = "Output did not match the expected result. Try again!";
      }
  }, function(err) {
      codeOutput.innerText = "Error: " + err.toString();
      challengeFeedback.innerText = "There was an error in your code.";
  });
});

// -------------------------
// Confetti Celebration on Challenge Completion
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
