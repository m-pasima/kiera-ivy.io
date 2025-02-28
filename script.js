// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyDYevS22SYVg52c2xfL_1E-j_djdzhxFPk",
  authDomain: "kikivy-game.firebaseapp.com",
  projectId: "kikivy-game",
  storageBucket: "kikivy-game.appspot.com",
  messagingSenderId: "701248167909",
  appId: "1:701248167909:web:6d77c68e86f60760fc590c",
  measurementId: "G-Z53L2JHJGJ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Topics Array (Python Concepts)
const pythonTopics = [
  {
    title: "Hello, Python!",
    explanation:
      "🌟 Welcome to Python! 🌟\n\n" +
      "Python is like a magic wand that lets you tell the computer what to do. 🪄\n\n" +
      "1. **The print() Function:**\n" +
      "   - The `print()` function is like a megaphone 🎤. It shouts out whatever you tell it to!\n" +
      "   - For example, `print('Hello, World!')` will make the computer say 'Hello, World!'.\n\n" +
      "2. **Comments:**\n" +
      "   - Comments are like secret notes 📝 that only you can see. They start with a `#`.\n" +
      "   - Python ignores comments, so you can use them to explain your code.\n\n" +
      "Now, write your own code to make the computer say 'I am learning Python!'.",
    exampleCode: "# Example Code\nprint('Hello, World!')",
    challengeInstruction:
      "Write a Python program that prints 'I am learning Python!' exactly as shown below.\n" +
      "Expected Output:\nI am learning Python!\n\n" +
      "Do not add extra print statements or spaces. Then click 'Run Code'."
  },
  // Add more Python topics here...
];

// Math Topics Array
const mathTopics = [
  {
    title: "Addition",
    explanation:
      "➕ **Addition is like putting things together!** 🧩\n\n" +
      "1. **What is addition?**\n" +
      "   - Addition is combining two or more numbers to get a total.\n" +
      "   - For example, `5 + 3 = 8`.\n\n" +
      "2. **Let's practice!**\n" +
      "   - Solve the problem below and enter your answer.",
    problem: "What is 7 + 5?",
    answer: 12
  },
  {
    title: "Subtraction",
    explanation:
      "➖ **Subtraction is like taking things away!** 🎈\n\n" +
      "1. **What is subtraction?**\n" +
      "   - Subtraction is taking one number away from another.\n" +
      "   - For example, `10 - 4 = 6`.\n\n" +
      "2. **Let's practice!**\n" +
      "   - Solve the problem below and enter your answer.",
    problem: "What is 15 - 7?",
    answer: 8
  },
  {
    title: "Multiplication",
    explanation:
      "✖️ **Multiplication is like adding groups of things!** 🍎🍎🍎\n\n" +
      "1. **What is multiplication?**\n" +
      "   - Multiplication is adding the same number multiple times.\n" +
      "   - For example, `3 × 4 = 12`.\n\n" +
      "2. **Let's practice!**\n" +
      "   - Solve the problem below and enter your answer.",
    problem: "What is 6 × 7?",
    answer: 42
  },
  {
    title: "Division",
    explanation:
      "➗ **Division is like sharing things equally!** 🍕\n\n" +
      "1. **What is division?**\n" +
      "   - Division is splitting a number into equal parts.\n" +
      "   - For example, `12 ÷ 3 = 4`.\n\n" +
      "2. **Let's practice!**\n" +
      "   - Solve the problem below and enter your answer.",
    problem: "What is 20 ÷ 5?",
    answer: 4
  }
];

// Global Variables & DOM Elements
let currentTopicIndex = 0;
let currentMathTopicIndex = 0;
const authSection = document.getElementById("auth-section");
const mainContent = document.getElementById("main-content");
const pythonSection = document.getElementById("python-section");
const mathSection = document.getElementById("math-section");
const topicsNav = document.getElementById("topics-nav");
const mathTopicsNav = document.getElementById("math-topics-nav");
const topicTitle = document.getElementById("topic-title");
const progressCurrent = document.getElementById("progress-current");
const progressTotal = document.getElementById("progress-total");
const topicExplanation = document.getElementById("topic-explanation");
const exampleCode = document.getElementById("example-code");
const exampleOutput = document.getElementById("example-output");
const runExampleBtn = document.getElementById("run-example-btn");
const challengeInstructionsEl = document.getElementById("challenge-instructions");
const codeEditor = document.getElementById("code-editor");
const runCodeBtn = document.getElementById("run-code-btn");
const codeOutput = document.getElementById("code-output");
const challengeFeedback = document.getElementById("challenge-feedback");
const nextTopicBtn = document.getElementById("next-topic-btn");
const prevTopicBtn = document.getElementById("prev-topic-btn");
const mathTopicExplanation = document.getElementById("math-topic-explanation");
const mathProblem = document.getElementById("math-problem");
const mathAnswer = document.getElementById("math-answer");
const submitMathAnswer = document.getElementById("submit-math-answer");
const mathFeedback = document.getElementById("math-feedback");

// Set total topics count in progress indicator
progressTotal.innerText = pythonTopics.length;

// Authentication Logic
let authMode = "login";
document.getElementById("toggle-auth-mode").addEventListener("click", (e) => {
  e.preventDefault();
  authMode = authMode === "login" ? "signup" : "login";
  document.getElementById("auth-name").style.display = authMode === "signup" ? "block" : "none";
  document.getElementById("auth-btn").innerText = authMode === "signup" ? "Sign Up" : "Log In";
  document.getElementById("toggle-auth-text").innerHTML = authMode === "signup"
    ? 'Already have an account? <a href="#" id="toggle-auth-mode">Log In</a>'
    : 'Don\'t have an account? <a href="#" id="toggle-auth-mode">Sign Up</a>';
  document.getElementById("auth-message").innerText = "";
});

document.getElementById("auth-btn").addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  if (authMode === "signup") {
    const name = document.getElementById("auth-name").value;
    if (!name) {
      document.getElementById("auth-message").innerText = "Please enter your name.";
      return;
    }
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      await db.collection("users").doc(userCredential.user.uid).set({ stage: 0, name: name });
      document.getElementById("auth-message").innerText = "Sign up successful!";
    } catch (err) {
      document.getElementById("auth-message").innerText = "Error: " + err.message;
    }
  } else {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      document.getElementById("auth-message").innerText = "Log in successful!";
    } catch (err) {
      document.getElementById("auth-message").innerText = "Error: " + err.message;
    }
  }
});

// Logout Logic
document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.error(err);
  }
});

// Authentication State Listener
auth.onAuthStateChanged(async (user) => {
  if (user) {
    authSection.style.display = "none";
    mainContent.style.display = "block";
    document.getElementById("logout-btn").style.display = "inline-block";
    const userDoc = await db.collection("users").doc(user.uid).get();
    let stage = 0;
    let name = "";
    if (userDoc.exists) {
      const data = userDoc.data();
      stage = data.stage || 0;
      name = data.name || "";
    }
    document.getElementById("user-name").innerText = name;
    currentTopicIndex = stage < pythonTopics.length ? stage : pythonTopics.length - 1;
    populateTopicsNav();
    loadTopic(currentTopicIndex);
  } else {
    authSection.style.display = "block";
    mainContent.style.display = "none";
    document.getElementById("logout-btn").style.display = "none";
  }
});

// Populate Python Topics Navigation
function populateTopicsNav() {
  topicsNav.innerHTML = "";
  pythonTopics.forEach((topic, index) => {
    const btn = document.createElement("button");
    btn.innerText = topic.title;
    btn.classList.add("topic-btn");
    if (index === currentTopicIndex) btn.classList.add("active");
    btn.addEventListener("click", () => loadTopic(index));
    topicsNav.appendChild(btn);
  });
}

// Populate Math Topics Navigation
function populateMathTopicsNav() {
  mathTopicsNav.innerHTML = "";
  mathTopics.forEach((topic, index) => {
    const btn = document.createElement("button");
    btn.innerText = topic.title;
    btn.classList.add("topic-btn");
    if (index === currentMathTopicIndex) btn.classList.add("active");
    btn.addEventListener("click", () => loadMathTopic(index));
    mathTopicsNav.appendChild(btn);
  });
}

// Load Python Topic by Index
function loadTopic(index) {
  currentTopicIndex = index;
  const topic = pythonTopics[index];
  topicTitle.innerText = topic.title;
  topicExplanation.innerText = topic.explanation;
  exampleCode.innerText = topic.exampleCode;
  exampleOutput.innerText = "";
  challengeInstructionsEl.innerText = topic.challengeInstruction;
  codeEditor.value = ""; // Start with an empty editor
  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  nextTopicBtn.disabled = true; // Disable Next button by default
  updateNavigationButtons();
  updateProgressDisplay();
}

// Load Math Topic by Index
function loadMathTopic(index) {
  currentMathTopicIndex = index;
  const topic = mathTopics[index];
  mathTopicExplanation.innerText = topic.explanation;
  mathProblem.innerText = topic.problem;
  mathAnswer.value = "";
  mathFeedback.innerText = "";
}

// Update Navigation Buttons
function updateNavigationButtons() {
  prevTopicBtn.disabled = currentTopicIndex === 0;
}

// Update Progress Display
function updateProgressDisplay() {
  progressCurrent.innerText = currentTopicIndex + 1;
  const navButtons = document.querySelectorAll("#topics-nav button");
  navButtons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === currentTopicIndex);
  });
}

// Skulpt Code Runner
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

// Run Example Code
runExampleBtn.addEventListener("click", () => {
  const exampleCodeText = pythonTopics[currentTopicIndex].exampleCode;
  exampleOutput.innerText = "";
  Sk.configure({
    output: (text) => { exampleOutput.innerText += text; },
    read: builtinRead
  });
  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, exampleCodeText, true))
    .then(() => {
      exampleOutput.innerText = exampleOutput.innerText.trim();
    })
    .catch((err) => {
      exampleOutput.innerText = "Error: " + err.toString();
    });
});

// Run User Code
runCodeBtn.addEventListener("click", () => {
  const userCode = codeEditor.value.trim();

  // Check if the user has written any code
  if (!userCode) {
    challengeFeedback.innerText = "Please write your own code before running.";
    return;
  }

  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  Sk.configure({
    output: (text) => { codeOutput.innerText += text; },
    read: builtinRead
  });
  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, userCode, true))
    .then(() => {
      codeOutput.innerText = codeOutput.innerText.trim();
      challengeFeedback.innerText = "Great job! Your code ran successfully.";
      nextTopicBtn.disabled = false; // Enable Next button only after successful code execution
      launchConfetti();
      const user = auth.currentUser;
      if (user && currentTopicIndex < pythonTopics.length) {
        db.collection("users").doc(user.uid).update({ stage: currentTopicIndex });
      }
    })
    .catch((err) => {
      codeOutput.innerText = "Error: " + err.toString();
      challengeFeedback.innerText = "There's an error in your code. Check your syntax.";
    });
});

// Submit Math Answer
submitMathAnswer.addEventListener("click", () => {
  const userAnswer = parseInt(mathAnswer.value.trim());
  const correctAnswer = mathTopics[currentMathTopicIndex].answer;

  if (userAnswer === correctAnswer) {
    mathFeedback.innerText = "Great job! Your answer is correct.";
    launchConfetti();
  } else {
    mathFeedback.innerText = "Oops! Try again.";
  }
});

// Confetti Celebration
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Topic Navigation Buttons
nextTopicBtn.addEventListener("click", () => {
  if (currentTopicIndex < pythonTopics.length - 1) {
    loadTopic(currentTopicIndex + 1);
    const user = auth.currentUser;
    if (user) {
      db.collection("users").doc(user.uid).update({ stage: currentTopicIndex });
    }
  } else {
    topicTitle.innerText = "Congratulations!";
    topicExplanation.innerText = "You've completed all the topics! Now try building your own Python project.";
    document.getElementById("challenge-section").style.display = "none";
    nextTopicBtn.style.display = "none";
  }
});

prevTopicBtn.addEventListener("click", () => {
  if (currentTopicIndex > 0) {
    loadTopic(currentTopicIndex - 1);
  }
});

// Switch Between Python and Math Sections
document.getElementById("python-section-btn").addEventListener("click", () => {
  pythonSection.style.display = "block";
  mathSection.style.display = "none";
});

document.getElementById("math-section-btn").addEventListener("click", () => {
  pythonSection.style.display = "none";
  mathSection.style.display = "block";
  populateMathTopicsNav();
  loadMathTopic(currentMathTopicIndex);
});
