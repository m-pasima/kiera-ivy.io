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
      "🌟 **Welcome to Python!** 🌟\n\n" +
      "Python is like a magic wand that lets you tell the computer what to do. 🪄\n\n" +
      "**1. The print() Function:**\n" +
      "   - The print() function shows text on the screen like a megaphone 🎤.\n" +
      "   - For example, `print('Hello, World!')` makes the computer display 'Hello, World!'.\n\n" +
      "**2. Comments:**\n" +
      "   - Comments start with a `#` and are ignored by Python. They help you explain your code.\n\n" +
      "Now, look at the example code. Then, in the box below, write your own program that prints exactly:\n\n" +
      "I am learning Python!",
    exampleCode: "# Example Code\nprint('Hello, World!')",
    starterCode: "", // Learner's code box starts empty
    expectedOutput: "I am learning Python!",
    challengeInstruction:
      "Write a Python program in the box below that prints exactly:\nI am learning Python!\n\n" +
      "Do not copy the example code. Your code must be your own. Then click 'Run My Code'."
  },
  {
    title: "Variables and Data Types",
    explanation:
      "🗃️ **Variables are like treasure boxes!**\n\n" +
      "Variables store data so you can use it later. You can store different types of data: numbers, words, and more.\n\n" +
      "For example, this code assigns the number 42 to a variable and prints it:\n" +
      "  number = 42\n  print(number)\n\n" +
      "But you can choose any number you like!",
    exampleCode: "# Example Code\nnumber = 42\nprint(number)",
    starterCode: "",
    // Instead of a fixed expected output, we set it to "dynamic" to allow any numeric output.
    expectedOutput: "dynamic",
    challengeInstruction:
      "Create a variable with any number you choose and print it. Your program's output should be exactly that number."
  },
  {
    title: "Working with Strings",
    explanation:
      "🔤 **Strings are like words or sentences!**\n\n" +
      "Strings are text enclosed in quotes. You can combine strings using the '+' operator.\n\n" +
      "For example:\n  first = 'Hello'\n  second = 'World'\n  print(first + ' ' + second)\n\n" +
      "displays: Hello World.\n" +
      "Now, try changing the message to something special to you!",
    exampleCode: "# Example Code\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
    starterCode: "",
    expectedOutput: "Hello World",
    challengeInstruction:
      "Modify the code in the box below to print a different message (for example, your name) exactly."
  },
  {
    title: "Input and Output",
    explanation:
      "🗣️ **Input is like having a conversation with the computer!**\n\n" +
      "The input() function asks the user for information. For example:\n  name = input('Enter your name: ')\n  print('Hello, ' + name)\n\n" +
      "In our simulation, when your code calls input(), it will automatically return 'Alice'.",
    exampleCode: "# Example Code\nname = input('Enter your name: ')\nprint('Hello, ' + name)",
    starterCode: "",
    expectedOutput: "Hello, Alice",
    challengeInstruction:
      "Write a Python program that asks for the user's name using input() and then prints a greeting. (In this simulation, input() returns 'Alice'.)\nExpected Output:\nHello, Alice"
  },
  {
    title: "Operators and Conditionals",
    explanation:
      "➕➖ **Operators and conditionals help your computer make decisions!**\n\n" +
      "Operators let you do math and compare numbers. Conditionals (if, elif, else) let your program decide what to do based on conditions.\n\n" +
      "For example:\n  if 10 > 5:\n    print('Yes')\n\n" +
      "checks if 10 is greater than 5 and prints 'Yes'.\n" +
      "Now, try writing your own if statement with numbers of your choice!",
    exampleCode: "# Example Code\nif 10 > 5:\n    print('Yes')",
    starterCode: "",
    expectedOutput: "Yes",
    challengeInstruction:
      "Write an if statement that prints 'Yes' when a condition you choose is true. Your output should be exactly 'Yes'."
  },
  {
    title: "Loops",
    explanation:
      "🔄 **Loops let you repeat actions without rewriting code!**\n\n" +
      "A for loop repeats an action for every item in a range or list. \n\n" +
      "For example:\n  for i in range(1, 4):\n    print(i)\n\n" +
      "prints:\n1\n2\n3\n" +
      "Now, try modifying the loop to print the numbers from 1 to 5.",
    exampleCode: "# Example Code\nfor i in range(1, 4):\n    print(i)",
    starterCode: "",
    expectedOutput: "1\n2\n3", // Note: For the challenge, learners should adjust it to 1-5.
    challengeInstruction:
      "Modify the loop in the box below so that it prints the numbers 1 through 5, each on a new line."
  },
  {
    title: "Functions",
    explanation:
      "🔧 **Functions are like little machines that do a specific job!**\n\n" +
      "Functions let you write code once and reuse it many times. \n\n" +
      "For example:\n  def greet():\n      print('Hello')\n  greet()\n\n" +
      "will print 'Hello'.\n" +
      "Now, try creating your own function that prints a personalized greeting.",
    exampleCode: "# Example Code\n\ndef greet():\n    print('Hello')\n\ngreet()",
    starterCode: "",
    expectedOutput: "Hello",
    challengeInstruction:
      "Define your own function that prints a personalized greeting (for example, 'Hi, I am [Your Name]!') and then call that function."
  },
  {
    title: "Real-World Application: Tip Calculator",
    explanation:
      "💡 **Tip Calculator Project:**\n\n" +
      "Imagine you go to a restaurant and need to calculate a tip. Your program will take a bill amount and tip percentage, then calculate the tip and total bill.\n\n" +
      "For example, if the bill is $50 and the tip is 20%, the tip is $10 and the total is $60.\n" +
      "This challenge uses variables and math to solve a real-life problem.",
    exampleCode:
      "# Example Code (for reference; do not copy)\n// For a $50 bill with 20% tip:\n// Tip: 10.0\n// Total: 60.0",
    starterCode: "",
    expectedOutput: "Tip: 10.0\nTotal: 60.0",
    challengeInstruction:
      "Write a Python program that calculates the tip and total for a $50 bill with a 20% tip. Your program should output exactly:\nTip: 10.0\nTotal: 60.0"
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

document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.error(err);
  }
});

// -------------------------
// Authentication State Listener
// -------------------------
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
  // Display example code in its own box (learners can run it)
  if (document.getElementById("example-code")) {
    document.getElementById("example-code").innerText = topic.exampleCode || "";
  }
  if (document.getElementById("example-output")) {
    document.getElementById("example-output").innerText = "";
  }
  challengeInstructionsEl.innerText = topic.challengeInstruction;
  // Clear the user's challenge code box for original input
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
  nextTopicBtn.disabled = true;
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

// Run Example Code for the Example Box
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

// Run User Code for the Challenge
runCodeBtn.addEventListener("click", () => {
  const userCode = codeEditor.value.trim();
  
  if (!userCode) {
    challengeFeedback.innerText = "Please write your own code before running.";
    return;
  }
  // Ensure the learner doesn't simply copy the example code
  if (userCode === pythonTopics[currentTopicIndex].exampleCode.trim()) {
    challengeFeedback.innerText = "Please do not copy the example code. Write your own solution.";
    return;
  }
  
  codeOutput.innerText = "";
  challengeFeedback.innerText = "";
  
  // Configure Skulpt; if input() is used, simulate it by returning "Alice"
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
      // For dynamic challenges (like Variables), check if expected is "dynamic"
      if (expected === "dynamic") {
        if (userOutput !== "" && !isNaN(userOutput)) {
          challengeFeedback.innerText = `Great job! You printed the number ${userOutput}.`;
          nextTopicBtn.disabled = false;
          launchConfetti();
          const user = auth.currentUser;
          if (user && currentTopicIndex < pythonTopics.length) {
            db.collection("users").doc(user.uid).update({ stage: currentTopicIndex });
          }
        } else {
          challengeFeedback.innerText = "The output is not a valid number. Please try again!";
        }
      } else {
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
