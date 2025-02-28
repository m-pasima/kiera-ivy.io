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
      "   - The `print()` function outputs text to the screen like a megaphone 🎤.\n" +
      "   - For example, `print('Hello, World!')` makes the computer say 'Hello, World!'.\n\n" +
      "2. **Comments:**\n" +
      "   - Comments start with a `#` and are ignored by Python. They are your secret notes 📝.\n\n" +
      "Now, modify the example code so that it prints **I am learning Python!** exactly.",
    exampleCode: "# Example Code\nprint('Hello, World!')",
    starterCode: "# Write your code below\nprint('Hello, World!')",
    expectedOutput: "I am learning Python!",
    challengeInstruction:
      "Write a Python program that prints **I am learning Python!** exactly as shown below.\n" +
      "Expected Output:\nI am learning Python!\n\n" +
      "Do not add extra print statements or spaces. Then click 'Run My Code'."
  },
  {
    title: "Variables and Data Types",
    explanation:
      "Variables store data. Python supports data types such as strings, integers, floats, and booleans.\n\n" +
      "In this lesson, you'll assign a value to a variable and print it.",
    starterCode: "# Assign a number to a variable\nnumber = 42\nprint(number)",
    expectedOutput: "42",
    challengeInstruction:
      "Change the value assigned to the variable (e.g., use your favorite number) and print it."
  },
  {
    title: "Working with Strings",
    explanation:
      "Strings represent text. You can combine strings using the '+' operator and use methods like upper() or lower() to change case.\n\n" +
      "In this lesson, you will combine two strings.",
    starterCode: "# Combine two strings\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
    expectedOutput: "Hello World",
    challengeInstruction:
      "Modify the code to change the message (for example, print your name) and output it."
  },
  {
    title: "Input and Output",
    explanation:
      "Input and output let your program interact with users. `print()` displays text, and `input()` gets user data.\n\n" +
      "Here, we simulate input by predefining a variable.",
    starterCode: "# Simulate user input\nname = 'Alice'\nprint('Hello, ' + name)",
    expectedOutput: "Hello, Alice",
    challengeInstruction:
      "Change the variable value to your own name and print a greeting."
  },
  {
    title: "Operators and Conditionals",
    explanation:
      "Operators perform calculations and comparisons. Conditionals (if, elif, else) let your program decide what to do based on conditions.\n\n" +
      "In this lesson, you'll write an if statement to check a condition.",
    starterCode: "# Use an if statement\nif 10 > 5:\n    print('Yes')",
    expectedOutput: "Yes",
    challengeInstruction:
      "Write an if statement that prints 'Yes' when a number of your choice is greater than another. Modify the starter code accordingly."
  },
  {
    title: "Loops",
    explanation:
      "Loops let you repeat actions without rewriting code. In this lesson, you'll use a for loop to print a sequence of numbers.",
    starterCode: "# For loop example\nfor i in range(1, 4):\n    print(i)",
    expectedOutput: "1\n2\n3",
    challengeInstruction:
      "Modify the loop so that it prints numbers 1 through 5 on separate lines."
  },
  {
    title: "Functions",
    explanation:
      "Functions are reusable blocks of code that perform specific tasks. They help you organize your code by letting you call the same code multiple times.\n\n" +
      "In this lesson, you'll define a function that prints a greeting.",
    starterCode: "# Define a function that greets\n\ndef greet():\n    print('Hello')\n\ngreet()",
    expectedOutput: "Hello",
    challengeInstruction:
      "Define your own function that prints a personalized greeting and call that function."
  },
  {
    title: "Real-World Application: Tip Calculator",
    explanation:
      "Now, apply what you've learned by creating a simple tip calculator. The program will calculate a tip based on a bill amount and tip percentage, then print the tip and the total bill.\n\n" +
      "This project uses variables, arithmetic, and output to solve a real-world problem.",
    starterCode:
      "# Tip Calculator Template\nbill = 50  # Example bill amount\ntip_percentage = 20  # Tip percentage\n\n" +
      "# Calculate tip (write your code here)\n\n" +
      "# Calculate total (write your code here)\n\n" +
      "# Expected Output for a $50 bill with 20% tip:\n# Tip: 10.0\n# Total: 60.0",
    expectedOutput: "Tip: 10.0\nTotal: 60.0",
    challengeInstruction:
      "Complete the code to calculate the tip and total bill. For a $50 bill with a 20% tip, your program should output exactly:\nTip: 10.0\nTotal: 60.0"
  }
];

// -------------------------
// Math Topics Array (Basic Arithmetic)
// -------------------------
const mathTopics = [
  {
    title: "Addition",
    explanation:
      "➕ **Addition is like putting things together!**\n\n" +
      "For example, `5 + 3 = 8`.\n\n" +
      "Let's practice addition by solving a problem.",
    problem: "What is 7 + 5?",
    answer: 12
  },
  {
    title: "Subtraction",
    explanation:
      "➖ **Subtraction is like taking things away!**\n\n" +
      "For example, `10 - 4 = 6`.\n\n" +
      "Let's practice subtraction by solving a problem.",
    problem: "What is 15 - 7?",
    answer: 8
  },
  {
    title: "Multiplication",
    explanation:
      "✖️ **Multiplication is like adding groups of things!**\n\n" +
      "For example, `3 × 4 = 12`.\n\n" +
      "Let's practice multiplication by solving a problem.",
    problem: "What is 6 × 7?",
    answer: 42
  },
  {
    title: "Division",
    explanation:
      "➗ **Division is like sharing things equally!**\n\n" +
      "For example, `12 ÷ 3 = 4`.\n\n" +
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

// Set total topics count in progress indicator for Python
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
  // Show example code if available
  if (document.getElementById("example-code")) {
    document.getElementById("example-code").innerText = topic.exampleCode || "";
  }
  if (document.getElementById("example-output")) {
    document.getElementById("example-output").innerText = "";
  }
  challengeInstructionsEl.innerText = topic.challengeInstruction;
  // Start with an empty code editor to encourage writing original code
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
  nextTopicBtn.disabled = true; // Next button enabled only when challenge passes
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
  
  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  Sk.configure({
    output: (text) => { codeOutput.innerText += text; },
    read: builtinRead
  });
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
  const topicTitle = mathTopics[currentMathTopicIndex].title;
  let problem = "";
  let answer = 0;
  if (topicTitle === "Addition") {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    problem = `${num1} + ${num2}`;
    answer = num1 + num2;
  } else if (topicTitle === "Subtraction") {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * num1);
    problem = `${num1} - ${num2}`;
    answer = num1 - num2;
  } else if (topicTitle === "Multiplication") {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    problem = `${num1} × ${num2}`;
    answer = num1 * num2;
  } else if (topicTitle === "Division") {
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
