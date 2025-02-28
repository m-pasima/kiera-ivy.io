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

// Topics Array (Example with 8 topics)
const topics = [
  {
    title: "Basics of Python",
    explanation:
      "Welcome to Python!\n\n" +
      "1. **The print() Function:**\n" +
      "   - The print() function outputs text to the screen.\n" +
      "   - The text must be enclosed in quotes (either single ('') or double (\"\") quotes).\n\n" +
      "2. **Comments:**\n" +
      "   - Anything following a '#' is a comment and is ignored by Python. Use comments to explain your code.\n\n" +
      "3. **Your First Program:**\n" +
      "   - A classic first program prints a message. The example below prints 'Hello, World!'.\n\n" +
      "Now, write your own code to print 'I am learning Python!'.",
    exampleCode: "# Example Code\nprint('Hello, World!')",
    challengeInstruction:
      "Write a Python program that prints 'I am learning Python!' exactly as shown below.\n" +
      "Expected Output:\nI am learning Python!\n\n" +
      "Do not add extra print statements or spaces. Then click 'Run Code'."
  },
  {
    title: "Variables and Data Types",
    explanation:
      "Variables store data. Python supports data types such as strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False).\n\n" +
      "In this lesson, you'll learn how to assign a value to a variable and print it.",
    exampleCode: "# Example Code\nnumber = 42\nprint(number)",
    challengeInstruction:
      "Write a Python program that assigns your favorite number to a variable and prints it."
  },
  {
    title: "Working with Strings",
    explanation:
      "Strings represent text in Python. You can combine strings using the '+' operator and use methods like upper() or lower() to change their case.\n\n" +
      "In this lesson, you will combine two strings.",
    exampleCode: "# Example Code\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
    challengeInstruction:
      "Write a Python program that combines two strings (for example, your first and last name) and prints the result."
  },
  {
    title: "Input and Output",
    explanation:
      "Input and output allow your program to interact with users. The print() function displays text, and input() gets data from the user.\n\n" +
      "In this lesson, you will write a program that greets the user by name.",
    exampleCode: "# Example Code\nname = input('Enter your name: ')\nprint('Hello, ' + name)",
    challengeInstruction:
      "Write a Python program that asks the user for their name and prints a greeting."
  },
  // Add more topics here...
];

// Global Variables & DOM Elements
let currentTopicIndex = 0;
const authSection = document.getElementById("auth-section");
const mainContent = document.getElementById("main-content");
const topicsNav = document.getElementById("topics-nav");
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

// Set total topics count in progress indicator
progressTotal.innerText = topics.length;

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
    currentTopicIndex = stage < topics.length ? stage : topics.length - 1;
    populateTopicsNav();
    loadTopic(currentTopicIndex);
  } else {
    authSection.style.display = "block";
    mainContent.style.display = "none";
    document.getElementById("logout-btn").style.display = "none";
  }
});

// Populate Topics Navigation
function populateTopicsNav() {
  topicsNav.innerHTML = "";
  topics.forEach((topic, index) => {
    const btn = document.createElement("button");
    btn.innerText = topic.title;
    btn.classList.add("topic-btn");
    if (index === currentTopicIndex) btn.classList.add("active");
    btn.addEventListener("click", () => loadTopic(index));
    topicsNav.appendChild(btn);
  });
}

// Load Topic by Index
function loadTopic(index) {
  currentTopicIndex = index;
  const topic = topics[index];
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
  const exampleCodeText = topics[currentTopicIndex].exampleCode;
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
      if (user && currentTopicIndex < topics.length) {
        db.collection("users").doc(user.uid).update({ stage: currentTopicIndex });
      }
    })
    .catch((err) => {
      codeOutput.innerText = "Error: " + err.toString();
      challengeFeedback.innerText = "There's an error in your code. Check your syntax.";
    });
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
  if (currentTopicIndex < topics.length - 1) {
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
