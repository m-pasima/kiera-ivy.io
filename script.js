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
        "Now, modify the code so that it prints 'I am learning Python!' exactly.",
      exampleCode: "# Example Code\nprint('Hello, World!')",
      suggestedOutput: "Hello, World!",
      starterCode: "# Write your code below\nprint('Hello, World!')",
      expectedOutput: "I am learning Python!",
      challengeInstruction:
        "Modify the starter code so that it prints 'I am learning Python!' exactly as shown below.\n" +
        "Expected Output:\nI am learning Python!\n\n" +
        "Do not add extra print statements or spaces. Then click 'Run Code'."
    },
    {
      title: "Variables and Data Types",
      explanation:
        "Variables store data. Python supports data types such as strings (text), integers (whole numbers), floats (decimal numbers), and booleans (True/False).\n\n" +
        "In this lesson, you'll learn how to assign a value to a variable and print it.",
      exampleCode: "# Example Code\nnumber = 42\nprint(number)",
      suggestedOutput: "42",
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
      exampleCode: "# Example Code\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
      suggestedOutput: "Hello World",
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
      exampleCode: "# Example Code\nname = 'Alice'\nprint('Hello, ' + name)",
      suggestedOutput: "Hello, Alice",
      starterCode: "# Simulate user input\nname = 'Alice'\nprint('Hello, ' + name)",
      expectedOutput: "Hello, Alice",
      challengeInstruction:
        "Change the variable to your own name and print a greeting."
    },
    {
      title: "Operators and Conditionals",
      explanation:
        "Operators allow you to perform calculations and comparisons. Conditionals (if, elif, else) let your program make decisions based on conditions.\n\n" +
        "In this lesson, you'll use an if statement to check a condition.",
      exampleCode: "# Example Code\nif 10 > 5:\n    print('Yes')",
      suggestedOutput: "Yes",
      starterCode: "# Use an if statement\nif 10 > 5:\n    print('Yes')",
      expectedOutput: "Yes",
      challengeInstruction:
        "Write an if statement that prints 'Yes' when a number of your choice is greater than another number. Modify the starter code accordingly."
    },
    {
      title: "Loops",
      explanation:
        "Loops allow you to repeat actions without writing code over and over. Learn how to use for loops to iterate over a sequence and while loops to repeat code as long as a condition is true.\n\n" +
        "In this lesson, you'll use a for loop to print a sequence of numbers.",
      exampleCode: "# Example Code\nfor i in range(1, 4):\n    print(i)",
      suggestedOutput: "1\n2\n3",
      starterCode: "# For loop example\nfor i in range(1, 4):\n    print(i)",
      expectedOutput: "1\n2\n3",
      challengeInstruction:
        "Modify the loop so that it prints numbers 1 through 5 on separate lines."
    },
    {
      title: "Functions",
      explanation:
        "Functions are reusable blocks of code that perform a specific task. Learn how to define functions, pass parameters, and return values.\n\n" +
        "In this lesson, you'll define a function that prints a greeting.",
      exampleCode: "# Example Code\ndef greet():\n    print('Hello')\n\ngreet()",
      suggestedOutput: "Hello",
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
      exampleCode:
        "# Example Code\nbill = 50\ntip_percentage = 20\ntip = bill * (tip_percentage / 100)\ntotal = bill + tip\nprint('Tip:', tip)\nprint('Total:', total)",
      suggestedOutput: "Tip: 10.0\nTotal: 60.0",
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
  const suggestedOutput = document.getElementById("suggested-output");
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
    suggestedOutput.innerText = topic.suggestedOutput;
    challengeInstructionsEl.innerText = topic.challengeInstruction;
    codeEditor.value = topic.starterCode;
    codeOutput.innerText = "";
    challengeFeedback.innerText = "";
    updateNavigationButtons();
    updateProgressDisplay();
  }
  
  // Update Navigation Buttons
  function updateNavigationButtons() {
    prevTopicBtn.disabled = currentTopicIndex === 0;
    nextTopicBtn.disabled = true;
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
  
  runCodeBtn.addEventListener("click", () => {
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