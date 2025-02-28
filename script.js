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
      explanation:
        "Welcome to Python!\n\n" +
        "1. **The print() Function:**\n" +
        "   - The print() function outputs text to the screen.\n" +
        "   - The text must be enclosed in quotes (either single or double).\n\n" +
        "2. **Comments:**\n" +
        "   - Anything following a '#' is a comment and is ignored by Python. Use comments to explain your code.\n\n" +
        "3. **Your First Program:**\n" +
        "   - A classic first program prints a message to the screen. In our example, we print 'Hello, World!'\n\n" +
        "Make sure you modify the starter code to write your own version of the program.",
      starterCode: "# Write your code below\nprint('Hello, World!')",
      expectedOutput: "Hello, World!",
      challengeInstruction:
        "Modify the starter code to print 'Hello, World!' exactly as shown below.\n" +
        "Expected Output:\nHello, World!\n\n" +
        "Do not add extra print statements or spaces. Then click 'Run Code'."
    },
    {
      title: "Variables and Data Types",
      explanation:
        "Variables store data. Python supports data types such as strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False).\n\n" +
        "In this lesson, you'll learn how to assign a value to a variable and print it.",
      starterCode: "# Assign a number to a variable\nnumber = 42\nprint(number)",
      expectedOutput: "42",
      challengeInstruction:
        "Change the value assigned to the variable (for example, use your favorite number) and print it."
    },
    {
      title: "Working with Strings",
      explanation:
        "Strings represent text in Python. You can combine strings using the '+' operator and use methods like upper() or lower() to change their case.\n\n" +
        "In this lesson, you will combine two strings.",
      starterCode: "# Combine two strings\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
      expectedOutput: "Hello World",
      challengeInstruction:
        "Modify the code to change the message (for example, use your name) and print the result."
    },
    {
      title: "Input and Output",
      explanation:
        "Input and output allow your program to interact with users. The print() function displays text, and input() gets data from the user.\n\n" +
        "In this lesson, we simulate input by predefining a variable.",
      starterCode: "# Simulate user input\nname = 'Alice'\nprint('Hello, ' + name)",
      expectedOutput: "Hello, Alice",
      challengeInstruction:
        "Change the variable value to your own name and print a greeting."
    },
    {
      title: "Operators and Conditionals",
      explanation:
        "Operators perform calculations and comparisons. Conditionals (if, elif, else) let your program make decisions based on conditions.\n\n" +
        "In this lesson, you'll use an if statement to check a condition.",
      starterCode: "# Use an if statement\nif 10 > 5:\n    print('Yes')",
      expectedOutput: "Yes",
      challengeInstruction:
        "Write an if statement that prints 'Yes' when a number you choose is greater than another number. Modify the starter code accordingly."
    },
    {
      title: "Loops",
      explanation:
        "Loops let you repeat actions without writing the same code multiple times. For loops are used to iterate over a sequence, and while loops repeat code as long as a condition is true.\n\n" +
        "In this lesson, you'll use a for loop to print a sequence of numbers.",
      starterCode: "# For loop example\nfor i in range(1, 4):\n    print(i)",
      expectedOutput: "1\n2\n3",
      challengeInstruction:
        "Modify the loop so that it prints numbers 1 through 5 on separate lines."
    },
    {
      title: "Functions",
      explanation:
        "Functions are reusable blocks of code that perform specific tasks. They help you organize your code by allowing you to write it once and use it many times.\n\n" +
        "In this lesson, you'll define a function that prints a greeting.",
      starterCode: "# Define a function that greets\n\ndef greet():\n    print('Hello')\n\ngreet()",
      expectedOutput: "Hello",
      challengeInstruction:
        "Define your own function that prints a personalized greeting and call that function."
    },
    {
      title: "Real-World Application: Tip Calculator",
      explanation:
        "Now, apply what you've learned by creating a simple tip calculator. The program will calculate a tip based on a bill amount and a tip percentage, then print the tip and the total bill.\n\n" +
        "This project uses variables, arithmetic, and output to solve a real-world problem.",
      starterCode:
        "# Tip Calculator Template\nbill = 50  # Example bill amount\n" +
        "tip_percentage = 20  # Tip percentage\n\n" +
        "# Calculate tip (write your code here)\n\n" +
        "# Calculate total (write your code here)\n\n" +
        "# Expected Output for a $50 bill with 20% tip:\n# Tip: 10.0\n# Total: 60.0",
      expectedOutput: "Tip: 10.0\nTotal: 60.0",
      challengeInstruction:
        "Complete the code to calculate the tip and total bill. For a $50 bill with a 20% tip, your program should output exactly:\nTip: 10.0\nTotal: 60.0"
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
  
  // Set total topics count in progress indicator
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
    nextTopicBtn.disabled = true; // Next button enabled only when challenge passes
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
    // Ensure learner has modified the starter code
    const userCode = codeEditor.value.trim();
    const starterCode = topics[currentTopicIndex].starterCode.trim();
    if (userCode === starterCode) {
      challengeFeedback.innerText = "Please modify the starter code with your own solution before submitting.";
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
  
  // Append navigation buttons to a container if not already present
  const topicNavContainer = document.getElementById("topic-navigation");
  if (!topicNavContainer) {
    const navContainer = document.createElement("div");
    navContainer.id = "topic-navigation";
    navContainer.appendChild(prevTopicBtn);
    navContainer.appendChild(nextTopicBtn);
    document.getElementById("main-content").appendChild(navContainer);
  }
  