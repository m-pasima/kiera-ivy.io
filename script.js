// -------------------------
// Firebase Initialization
// -------------------------
const firebaseConfig = {
    apiKey: "AIzaSyDYevS22SYVg52c2xfL_1E-j_djdzhxFPk",
    authDomain: "kikivy-game.firebaseapp.com",
    projectId: "kikivy-game",
    storageBucket: "kikivy-game.firebasestorage.app",
    messagingSenderId: "701248167909",
    appId: "1:701248167909:web:6d77c68e86f60760fc590c",
    measurementId: "G-Z53L2JHJGJ"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // -------------------------
  // Topics Array (Example with 8 topics)
  // -------------------------
  const topics = [
    {
      title: "Basics of Python",
      explanation: "What is Python? Python is a high-level, interpreted language known for its clear syntax and readability. In this lesson, you'll learn its basic structure, the importance of indentation and comments, and how to write your first program. Example: printing a message.",
      starterCode: "print('Hello, World!')",
      expectedOutput: "Hello, World!",
      challengeInstruction: "Type the code to print 'Hello, World!' and click 'Run Code'."
    },
    {
      title: "Variables and Data Types",
      explanation: "Variables store data, and Python supports several data types like strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False). You'll learn how to assign values to variables and perform type conversion.",
      starterCode: "num = 42\nprint(num)",
      expectedOutput: "42",
      challengeInstruction: "Create a variable with your favorite number and print it."
    },
    {
      title: "Working with Strings",
      explanation: "Strings represent text. In this lesson, learn how to create strings, combine them, and use basic methods such as upper(), lower(), and strip(). This is essential for handling text in your programs.",
      starterCode: "first = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
      expectedOutput: "Hello World",
      challengeInstruction: "Concatenate two strings and print the result."
    },
    {
      title: "Input and Output",
      explanation: "Input and output are how your program interacts with users. You use print() to show messages and input() to get data. (For this challenge, we simulate input by predefining a variable.)",
      starterCode: "name = 'Alice'  # Imagine this came from input()\nprint('Hello, ' + name)",
      expectedOutput: "Hello, Alice",
      challengeInstruction: "Set a variable to your name and print a greeting."
    },
    {
      title: "Operators and Conditionals",
      explanation: "Operators allow you to perform calculations and comparisons. Conditionals let you run code based on conditions (if, elif, else). They help your program make decisions.",
      starterCode: "if 10 > 5:\n    print('Yes')",
      expectedOutput: "Yes",
      challengeInstruction: "Write an if statement that prints 'Yes' when 10 is greater than 5."
    },
    {
      title: "Loops",
      explanation: "Loops allow you to repeat actions without writing code over and over. Learn how to use for loops to iterate over a sequence and while loops to repeat code as long as a condition is true.",
      starterCode: "for i in range(1, 4):\n    print(i)",
      expectedOutput: "1\n2\n3",
      challengeInstruction: "Write a loop to print numbers 1, 2, and 3 on separate lines."
    },
    {
      title: "Functions",
      explanation: "Functions are reusable blocks of code that perform a specific task. Learn how to define functions, pass parameters, and return values. They help you organize your code.",
      starterCode: "def greet():\n    print('Hello')\ngreet()",
      expectedOutput: "Hello",
      challengeInstruction: "Define a function that prints 'Hello' and call it."
    },
    {
      title: "Real-World Application: Tip Calculator",
      explanation: "In this real-world challenge, you'll create a simple tip calculator. The program should compute a tip based on a bill amount and tip percentage. This applies what you've learned about variables, arithmetic, and output.",
      starterCode: "// Note: Since interactive input isn’t supported in Skulpt, use variables\nbill = 50  # Assume a $50 bill\ntip_percentage = 20  # 20% tip\n# Calculate tip and total amount\n",
      expectedOutput: "Tip: 10.0\nTotal: 60.0",
      challengeInstruction: "Modify the code to calculate the tip and total bill. For a $50 bill and 20% tip, print:\nTip: 10.0\nTotal: 60.0"
    }
  ];
  
  // -------------------------
  // Global Variables & DOM Elements
  // -------------------------
  let currentTopicIndex = 0;
  
  const authSection = document.getElementById("auth-section");
  const authNameInput = document.getElementById("auth-name");
  const authEmailInput = document.getElementById("auth-email");
  const authPasswordInput = document.getElementById("auth-password");
  const authBtn = document.getElementById("auth-btn");
  const toggleAuthModeLink = document.getElementById("toggle-auth-mode");
  const toggleAuthText = document.getElementById("toggle-auth-text");
  const authMessage = document.getElementById("auth-message");
  const logoutBtn = document.getElementById("logout-btn");
  const userNameDisplay = document.getElementById("user-name");
  
  const mainContent = document.getElementById("main-content");
  const topicsNav = document.getElementById("topics-nav");
  const topicTitle = document.getElementById("topic-title");
  const progressCurrent = document.getElementById("progress-current");
  const progressTotal = document.getElementById("progress-total");
  const topicExplanation = document.getElementById("topic-explanation");
  const challengeInstructionsEl = document.getElementById("challenge-instructions");
  const codeEditor = document.getElementById("code-editor");
  const runCodeBtn = document.getElementById("run-code-btn");
  const codeOutput = document.getElementById("code-output");
  const challengeFeedback = document.getElementById("challenge-feedback");
  const nextTopicBtn = document.getElementById("next-topic-btn");
  const prevTopicBtn = document.getElementById("prev-topic-btn");
  
  // Set total topics count
  progressTotal.innerText = topics.length;
  
  // -------------------------
  // Authentication: Toggle between Log In and Sign Up
  // -------------------------
  let authMode = "login";
  toggleAuthModeLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (authMode === "login") {
      authMode = "signup";
      authNameInput.style.display = "block";
      authBtn.innerText = "Sign Up";
      toggleAuthText.innerHTML = 'Already have an account? <a href="#" id="toggle-auth-mode">Log In</a>';
    } else {
      authMode = "login";
      authNameInput.style.display = "none";
      authBtn.innerText = "Log In";
      toggleAuthText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-auth-mode">Sign Up</a>';
    }
    authMessage.innerText = "";
  });
  
  // Handle authentication button click
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
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        authMessage.innerText = "Sign up successful! You are now logged in.";
        await db.collection("users").doc(userCredential.user.uid).set({ stage: 0, name: name });
      } catch (err) {
        authMessage.innerText = "Error: " + err.message;
      }
    } else {
      try {
        await auth.signInWithEmailAndPassword(email, password);
        authMessage.innerText = "Log in successful!";
      } catch (err) {
        authMessage.innerText = "Error: " + err.message;
      }
    }
  });
  
  // Handle logout
  logoutBtn.addEventListener("click", async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  });
  
  // Listen for authentication state changes
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      authSection.style.display = "none";
      mainContent.style.display = "block";
      logoutBtn.style.display = "inline-block";
      const userDoc = await db.collection("users").doc(user.uid).get();
      let stage = 0;
      let name = "";
      if (userDoc.exists) {
        const data = userDoc.data();
        stage = data.stage || 0;
        name = data.name || "";
      }
      userNameDisplay.innerText = name;
      currentTopicIndex = stage < topics.length ? stage : topics.length - 1;
      populateTopicsNav();
      loadTopic(currentTopicIndex);
    } else {
      authSection.style.display = "block";
      mainContent.style.display = "none";
      logoutBtn.style.display = "none";
    }
  });
  
  // -------------------------
  // Populate Topics Navigation Buttons
  // -------------------------
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
  
  // -------------------------
  // Load a Topic by Index
  // -------------------------
  function loadTopic(index) {
    currentTopicIndex = index;
    const topic = topics[index];
    topicTitle.innerText = topic.title;
    topicExplanation.innerText = topic.explanation;
    challengeInstructionsEl.innerText = topic.challengeInstruction;
    codeEditor.value = topic.starterCode;
    codeOutput.innerText = "";
    challengeFeedback.innerText = "";
    updateNavigationButtons();
    updateProgressDisplay();
  }
  
  // Update Previous/Next buttons
  function updateNavigationButtons() {
    prevTopicBtn.disabled = currentTopicIndex === 0;
    nextTopicBtn.disabled = true; // Only enable when challenge passed
  }
  
  // Update progress indicator and active nav button
  function updateProgressDisplay() {
    progressCurrent.innerText = currentTopicIndex + 1;
    const navButtons = document.querySelectorAll("#topics-nav button");
    navButtons.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === currentTopicIndex);
    });
  }
  
  // -------------------------
  // Skulpt Code Runner for Challenges
  // -------------------------
  function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }
  
  runCodeBtn.addEventListener("click", () => {
    const prog = codeEditor.value;
    codeOutput.innerText = "";
    challengeFeedback.innerText = "";
    Sk.configure({
        output: (text) => { codeOutput.innerText += text; },
        read: builtinRead
    });
    Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, prog, true))
      .then(() => {
        const userOutput = codeOutput.innerText.trim();
        const expected = topics[currentTopicIndex].expectedOutput.trim();
        if (userOutput === expected || expected === "") {
            challengeFeedback.innerText = "Great job! Your output is correct.";
            nextTopicBtn.disabled = false;
            launchConfetti();
            // Update progress in Firestore
            const user = auth.currentUser;
            if (user && currentTopicIndex < topics.length) {
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
  // Navigation Buttons for Topics
  // -------------------------
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
  
  // Append navigation buttons to the topic-navigation section if not present
  const topicNavContainer = document.getElementById("topic-navigation");
  if (!topicNavContainer) {
    const navContainer = document.createElement("div");
    navContainer.id = "topic-navigation";
    navContainer.appendChild(prevTopicBtn);
    navContainer.appendChild(nextTopicBtn);
    document.getElementById("main-content").appendChild(navContainer);
  }
  