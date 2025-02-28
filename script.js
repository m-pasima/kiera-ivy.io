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

// Topics Array (All Python Concepts)
const topics = [
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
  {
    title: "Variables: Your Data Containers",
    explanation:
      "📦 **Variables are like boxes** where you can store things! 🎁\n\n" +
      "1. **What are variables?**\n" +
      "   - Variables are like labeled boxes. You can put something inside and give it a name.\n" +
      "   - For example, `name = 'Alice'` stores the name 'Alice' in a box called `name`.\n\n" +
      "2. **Data Types:**\n" +
      "   - **Strings**: Text like 'Hello' or 'Python'. Use quotes (`' '` or `\" \"`).\n" +
      "   - **Integers**: Whole numbers like 5 or 42.\n" +
      "   - **Floats**: Decimal numbers like 3.14 or 9.99.\n" +
      "   - **Booleans**: True or False (like a light switch 🎚️).\n\n" +
      "Now, create a variable to store your favorite number and print it!",
    exampleCode: "# Example Code\nnumber = 42\nprint(number)",
    challengeInstruction:
      "Write a Python program that assigns your favorite number to a variable and prints it."
  },
  {
    title: "Strings: Playing with Text",
    explanation:
      "🎨 **Strings are like colorful crayons** for writing text! 🖍️\n\n" +
      "1. **What are strings?**\n" +
      "   - Strings are pieces of text. They can be words, sentences, or even single letters.\n" +
      "   - For example, `greeting = 'Hello'` stores the word 'Hello' in a variable.\n\n" +
      "2. **Combining Strings:**\n" +
      "   - You can combine strings using the `+` operator. It's like gluing two pieces of paper together! 🖇️\n" +
      "   - For example, `'Hello' + ' World'` becomes 'Hello World'.\n\n" +
      "Now, write a program that combines your first and last name and prints the result!",
    exampleCode: "# Example Code\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
    challengeInstruction:
      "Write a Python program that combines two strings (for example, your first and last name) and prints the result."
  },
  {
    title: "Input: Talking to the Computer",
    explanation:
      "🗣️ **Input is like having a conversation with the computer!** 💬\n\n" +
      "1. **What is input?**\n" +
      "   - The `input()` function lets you ask the user for information.\n" +
      "   - For example, `name = input('What is your name? ')` asks the user for their name.\n\n" +
      "2. **Using Input:**\n" +
      "   - You can use the input to personalize your program. For example, `print('Hello, ' + name)` greets the user by name.\n\n" +
      "Now, write a program that asks the user for their name and prints a greeting!",
    exampleCode: "# Example Code\nname = input('Enter your name: ')\nprint('Hello, ' + name)",
    challengeInstruction:
      "Write a Python program that asks the user for their name and prints a greeting."
  },
  {
    title: "Operators: Math Magic",
    explanation:
      "🧮 **Operators are like magic spells** for doing math! ✨\n\n" +
      "1. **What are operators?**\n" +
      "   - Operators let you add (`+`), subtract (`-`), multiply (`*`), and divide (`/`) numbers.\n" +
      "   - For example, `5 + 3` gives you 8.\n\n" +
      "2. **Comparison Operators:**\n" +
      "   - These let you compare things. For example, `10 > 5` checks if 10 is greater than 5 (it is!).\n\n" +
      "Now, write a program that adds two numbers and prints the result!",
    exampleCode: "# Example Code\nresult = 5 + 3\nprint(result)",
    challengeInstruction:
      "Write a Python program that adds two numbers and prints the result."
  },
  {
    title: "Conditionals: Making Decisions",
    explanation:
      "🤔 **Conditionals are like asking questions** and making decisions! ❓\n\n" +
      "1. **What are conditionals?**\n" +
      "   - Conditionals let your program make decisions using `if`, `elif`, and `else`.\n" +
      "   - For example, `if 10 > 5: print('Yes')` will print 'Yes' because 10 is greater than 5.\n\n" +
      "2. **How it works:**\n" +
      "   - The program checks if a condition is `True`. If it is, it runs the code inside the `if` block.\n\n" +
      "Now, write a program that checks if a number is greater than 10 and prints a message!",
    exampleCode: "# Example Code\nif 10 > 5:\n    print('Yes')",
    challengeInstruction:
      "Write a Python program that checks if a number is greater than 10 and prints a message."
  },
  {
    title: "Loops: Repeating Actions",
    explanation:
      "🔁 **Loops are like a merry-go-round** that keeps going around! 🎠\n\n" +
      "1. **What are loops?**\n" +
      "   - Loops let you repeat actions without writing the same code over and over.\n" +
      "   - For example, `for i in range(3): print(i)` will print 0, 1, and 2.\n\n" +
      "2. **Types of Loops:**\n" +
      "   - **For loops**: Repeat a set number of times.\n" +
      "   - **While loops**: Repeat as long as a condition is true.\n\n" +
      "Now, write a program that prints numbers 1 through 5 using a loop!",
    exampleCode: "# Example Code\nfor i in range(3):\n    print(i)",
    challengeInstruction:
      "Write a Python program that prints numbers 1 through 5 using a loop."
  },
  {
    title: "Functions: Reusable Code Blocks",
    explanation:
      "🧩 **Functions are like building blocks** for your code! 🏗️\n\n" +
      "1. **What are functions?**\n" +
      "   - Functions are reusable blocks of code that perform a specific task.\n" +
      "   - For example, `def greet(): print('Hello')` creates a function called `greet`.\n\n" +
      "2. **Using Functions:**\n" +
      "   - You can call a function by typing its name followed by `()`. For example, `greet()` will print 'Hello'.\n\n" +
      "Now, write a function that prints a personalized greeting and call it!",
    exampleCode: "# Example Code\ndef greet():\n    print('Hello')\n\ngreet()",
    challengeInstruction:
      "Write a Python function that prints a personalized greeting and call it."
  },
  {
    title: "Lists: Storing Multiple Items",
    explanation:
      "📚 **Lists are like backpacks** that can hold many things! 🎒\n\n" +
      "1. **What are lists?**\n" +
      "   - Lists let you store multiple items in a single variable.\n" +
      "   - For example, `fruits = ['apple', 'banana', 'cherry']` stores three fruits.\n\n" +
      "2. **Using Lists:**\n" +
      "   - You can access items in a list using their index. For example, `fruits[0]` gives you 'apple'.\n\n" +
      "Now, write a program that stores your favorite fruits in a list and prints them!",
    exampleCode: "# Example Code\nfruits = ['apple', 'banana', 'cherry']\nprint(fruits)",
    challengeInstruction:
      "Write a Python program that stores your favorite fruits in a list and prints them."
  },
  {
    title: "Dictionaries: Key-Value Pairs",
    explanation:
      "🗝️ **Dictionaries are like treasure chests** where each key opens a specific value! 🏴‍☠️\n\n" +
      "1. **What are dictionaries?**\n" +
      "   - Dictionaries store data in key-value pairs. For example, `person = {'name': 'Alice', 'age': 10}`.\n\n" +
      "2. **Using Dictionaries:**\n" +
      "   - You can access values using their keys. For example, `person['name']` gives you 'Alice'.\n\n" +
      "Now, write a program that stores your name and age in a dictionary and prints them!",
    exampleCode: "# Example Code\nperson = {'name': 'Alice', 'age': 10}\nprint(person['name'])",
    challengeInstruction:
      "Write a Python program that stores your name and age in a dictionary and prints them."
  },
  {
    title: "Real-World Project: Tip Calculator",
    explanation:
      "💰 **Let's build a tip calculator!** 🧮\n\n" +
      "1. **What does it do?**\n" +
      "   - The program calculates a tip based on a bill amount and tip percentage.\n" +
      "   - For example, for a $50 bill with a 20% tip, the tip is $10, and the total is $60.\n\n" +
      "2. **How it works:**\n" +
      "   - Use variables to store the bill amount and tip percentage.\n" +
      "   - Calculate the tip and total bill using arithmetic operators.\n\n" +
      "Now, write a program that calculates the tip and total bill!",
    exampleCode:
      "# Example Code\nbill = 50\ntip_percentage = 20\ntip = bill * (tip_percentage / 100)\ntotal = bill + tip\nprint('Tip:', tip)\nprint('Total:', total)",
    challengeInstruction:
      "Write a Python program that calculates the tip and total bill for a $50 bill with a 20% tip."
  }
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
