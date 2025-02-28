// -------------------------
// Firebase Initialization
// -------------------------
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

// -------------------------
// Topics Array (Python Concepts)
// -------------------------
const pythonTopics = [
  {
    title: "Hello, Python!",
    explanation:
      "🌟 Welcome to Python! 🌟\n\n" +
      "Python is like a magic wand that lets you tell the computer what to do. 🪄\n\n" +
      "1. **The print() Function:**\n" +
      "   - The print() function outputs text to the screen like a megaphone 🎤.\n" +
      "   - For example, the code below makes the computer say 'Hello, World!'.\n\n" +
      "2. **Comments:**\n" +
      "   - Comments start with a '#' and are ignored by Python. They help you explain your code.\n\n" +
      "Now, look at the example code. Then, in the box below, write your own program that prints exactly:\n\n" +
      "I am learning Python!",
    exampleCode: "# Example Code\nprint('Hello, World!')",
    // The example code is shown separately; the challenge code box is initially empty.
    starterCode: "", 
    expectedOutput: "I am learning Python!",
    challengeInstruction:
      "Write a Python program in the box below that prints exactly:\nI am learning Python!\n\n" +
      "Do not copy the example code. Your code should be your own. Then click 'Run My Code'."
  },
  {
    title: "Variables and Data Types",
    explanation:
      "Variables are like little boxes that hold data. Python has many types: strings (text), integers (numbers), floats (decimals), and booleans (True/False).\n\n" +
      "In this lesson, you'll create a variable and print its value.",
    exampleCode: "# Example Code\nnumber = 42\nprint(number)",
    starterCode: "",
    expectedOutput: "42",
    challengeInstruction:
      "Create a variable with a number (for example, your favorite number) and print it. Your output should be exactly that number."
  },
  {
    title: "Working with Strings",
    explanation:
      "Strings represent text. You can combine strings using the '+' operator and use methods like upper() or lower() to change their case.\n\n" +
      "In this lesson, you will combine two strings.",
    exampleCode: "# Example Code\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
    starterCode: "",
    expectedOutput: "Hello World",
    challengeInstruction:
      "Modify the code to change the message (for example, print your name) and output it exactly."
  },
  {
    title: "Input: Talking to the Computer",
    explanation:
      "🗣️ **Input is like having a conversation with the computer!** 💬\n\n" +
      "1. **What is input()?**\n" +
      "   - The input() function lets you ask the user for information.\n" +
      "   - For example, `name = input('What is your name? ')` asks the user for their name.\n\n" +
      "2. **Using Input:**\n" +
      "   - You can use the input to personalize your program. For example, `print('Hello, ' + name)` greets the user by name.\n\n" +
      "Now, look at the example code. Then, in the box below, write a program that asks for the user's name and prints a greeting.\n" +
      "For simulation, the input will automatically be 'Alice'.",
    exampleCode: "# Example Code\nname = input('Enter your name: ')\nprint('Hello, ' + name)",
    starterCode: "",
    expectedOutput: "Hello, Alice",
    challengeInstruction:
      "Write a Python program that uses input() to ask for a name and prints a greeting. (For this challenge, when your code calls input(), it will automatically return 'Alice'.)\n" +
      "Expected Output:\nHello, Alice\n\n" +
      "Do not copy the example code; write your own solution. Then click 'Run My Code'."
  },
  // Additional topics can follow here...
];

// -------------------------
// Math Topics Array (Basic Arithmetic)
// -------------------------
const mathTopics = [
  {
    title: "Addition",
    explanation:
      "➕ **Addition is like putting things together!**\n\n" +
      "For example, 5 + 3 = 8.\n\n" +
      "Let's practice addition by solving a problem.",
    problem: "What is 7 + 5?",
    answer: 12
  },
  {
    title: "Subtraction",
    explanation:
      "➖ **Subtraction is like taking things away!**\n\n" +
      "For example, 10 - 4 = 6.\n\n" +
      "Let's practice subtraction by solving a problem.",
    problem: "What is 15 - 7?",
    answer: 8
  },
  {
    title: "Multiplication",
    explanation:
      "✖️ **Multiplication is like adding groups of things!**\n\n" +
      "For example, 3 × 4 = 12.\n\n" +
      "Let's practice multiplication by solving a problem.",
    problem: "What is 6 × 7?",
    answer: 42
  },
  {
    title: "Division",
    explanation:
      "➗ **Division is like sharing things equally!**\n\n" +
      "For example, 12 ÷ 3 = 4.\n\n" +
      "Let's practice division by solving a problem.",
    problem: "What is 20 ÷ 5?",
    answer: 4
  }
];

// -------------------------
// Global Variables & DOM Elements
// -------------------------
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

// Set total topics count for Python
progressTotal.innerText = pythonTopics.length;

// -------------------------
// Authentication: Toggle between Log In and Sign Up
// -------------------------
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

// Handle Logout
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

// -------------------------
// Populate Python Topics Navigation
// -------------------------
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

// -------------------------
// Populate Math Topics Navigation
// -------------------------
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

// -------------------------
// Load Python Topic by Index
// -------------------------
function loadTopic(index) {
  currentTopicIndex = index;
  const topic = pythonTopics[index];
  topicTitle.innerText = topic.title;
  topicExplanation.innerText = topic.explanation;
  // Display example code (editable) in its own box
  if (document.getElementById("example-code")) {
    document.getElementById("example-code").innerText = topic.exampleCode || "";
  }
  if (document.getElementById("example-output")) {
    document.getElementById("example-output").innerText = "";
  }
  challengeInstructionsEl.innerText = topic.challengeInstruction;
  // Clear the user’s challenge code box for original input
  codeEditor.value = "";
  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  nextTopicBtn.disabled = true;
  updateNavigationButtons();
  updateProgressDisplay();
}

// -------------------------
// Load Math Topic by Index
// -------------------------
function loadMathTopic(index) {
  currentMathTopicIndex = index;
  const topic = mathTopics[index];
  mathTopicExplanation.innerText = topic.explanation;
  mathProblem.innerText = topic.problem;
  mathAnswer.value = "";
  mathFeedback.innerText = "";
  resetTimer();
  startTimer();
}

// -------------------------
// Update Navigation Buttons (Python)
// -------------------------
function updateNavigationButtons() {
  prevTopicBtn.disabled = currentTopicIndex === 0;
  nextTopicBtn.disabled = true; // Only enable after successful challenge run
}

// -------------------------
// Update Progress Display (Python)
// -------------------------
function updateProgressDisplay() {
  progressCurrent.innerText = currentTopicIndex + 1;
  const navButtons = document.querySelectorAll("#topics-nav button");
  navButtons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === currentTopicIndex);
  });
}

// -------------------------
// Skulpt Code Runner for Python Challenges
// -------------------------
function builtinRead(x) {
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
      throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

// Run Example Code (for the read-only example area)
if (runExampleBtn) {
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
}

// Run User Code for Python Challenge
runCodeBtn.addEventListener("click", () => {
  const userCode = codeEditor.value.trim();
  
  if (!userCode) {
    challengeFeedback.innerText = "Please write your own code before running.";
    return;
  }
  
  // Do not allow copying the example code
  if (userCode === pythonTopics[currentTopicIndex].exampleCode.trim()) {
    challengeFeedback.innerText = "Please do not copy the example code. Write your own solution.";
    return;
  }
  
  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  
  // Prepare Skulpt configuration; if input() is used, simulate it.
  let skulptConfig = {
    output: (text) => { codeOutput.innerText += text; },
    read: builtinRead
  };
  if (userCode.indexOf("input(") !== -1) {
    skulptConfig.inputfun = function(prompt) { return "Alice"; };
  }
  
  Sk.configure(skulptConfig);
  
  Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, userCode, true))
    .then(() => {
      const userOutput = codeOutput.innerText.trim();
      const expected = pythonTopics[currentTopicIndex].expectedOutput.trim();
      if (userOutput === expected) {
        challengeFeedback.innerText = "Great job! Your output is correct.";
        nextTopicBtn.disabled = false;
        launchConfetti();
        // Update progress in Firestore
        const user = auth.currentUser;
        if (user && currentTopicIndex < pythonTopics.length) {
          db.collection("users").doc(user.uid).update({ stage: currentTopicIndex });
        }
      } else {
        challengeFeedback.innerText = "The output didn't match the expected result. Please try again!";
      }
    })
    .catch((err) => {
      codeOutput.innerText = "Error: " + err.toString();
      challengeFeedback.innerText = "There's an error in your code. Check your syntax.";
    });
});

// -------------------------
// Confetti Celebration Function
// -------------------------
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// -------------------------
// Navigation Buttons for Python Topics
// -------------------------
nextTopicBtn.addEventListener("click", () => {
  if (currentTopicIndex < pythonTopics.length - 1) {
    loadTopic(currentTopicIndex + 1);
    const user = auth.currentUser;
    if (user) {
      db.collection("users").doc(user.uid).update({ stage: currentTopicIndex });
    }
  } else {
    topicTitle.innerText = "Congratulations!";
    topicExplanation.innerText = "You've completed all the Python topics! Now try building your own Python project.";
    document.getElementById("challenge-section").style.display = "none";
    nextTopicBtn.style.display = "none";
  }
});

prevTopicBtn.addEventListener("click", () => {
  if (currentTopicIndex > 0) {
    loadTopic(currentTopicIndex - 1);
  }
});

// -------------------------
// Math Section: Timer, Problem Generator, and Submission
// -------------------------
let timer;
let timeLeft = 120; // 2 minutes
let correctAnswers = 0;
let totalQuestions = 0;

function generateRandomProblem() {
  const topicName = mathTopics[currentMathTopicIndex].title;
  let problem = "";
  let answer = 0;
  if (topicName === "Addition") {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    problem = `${num1} + ${num2}`;
    answer = num1 + num2;
  } else if (topicName === "Subtraction") {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * num1);
    problem = `${num1} - ${num2}`;
    answer = num1 - num2;
  } else if (topicName === "Multiplication") {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    problem = `${num1} × ${num2}`;
    answer = num1 * num2;
  } else if (topicName === "Division") {
    const num2 = Math.floor(Math.random() * 12) + 1;
    const answerNum = Math.floor(Math.random() * 12) + 1;
    const num1 = num2 * answerNum;
    problem = `${num1} ÷ ${num2}`;
    answer = answerNum;
  }
  return { problem, answer };
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      mathFeedback.innerText = `Time's up! You answered ${correctAnswers} out of ${totalQuestions} correctly.`;
      submitMathAnswer.disabled = true;
      mathAnswer.disabled = true;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 120;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft} seconds`;
}

function generateNewMathProblem() {
  const { problem, answer } = generateRandomProblem();
  mathProblem.innerText = problem;
  mathAnswer.value = "";
  mathAnswer.dataset.correctAnswer = answer;
}

submitMathAnswer.addEventListener("click", () => {
  const userAnswer = parseInt(mathAnswer.value.trim());
  const correctAnswer = parseInt(mathAnswer.dataset.correctAnswer);
  if (userAnswer === correctAnswer) {
    mathFeedback.innerText = "Great job! Your answer is correct.";
    correctAnswers++;
    launchConfetti();
  } else {
    mathFeedback.innerText = `Oops! The correct answer is ${correctAnswer}.`;
  }
  totalQuestions++;
  document.getElementById("score").innerText = `Correct Answers: ${correctAnswers}`;
  generateNewMathProblem();
});

// -------------------------
// Switch Between Python and Math Sections
// -------------------------
document.getElementById("python-section-btn").addEventListener("click", () => {
  pythonSection.style.display = "block";
  mathSection.style.display = "none";
  document.getElementById("python-section-btn").classList.add("active");
  document.getElementById("math-section-btn").classList.remove("active");
  clearInterval(timer);
});

document.getElementById("math-section-btn").addEventListener("click", () => {
  pythonSection.style.display = "none";
  mathSection.style.display = "block";
  document.getElementById("math-section-btn").classList.add("active");
  document.getElementById("python-section-btn").classList.remove("active");
  populateMathTopicsNav();
  loadMathTopic(currentMathTopicIndex);
});
