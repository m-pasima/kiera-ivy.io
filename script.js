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
  // Topics Array (18 Topics)
  // -------------------------
  const topics = [
    {
      title: "Basics of Python",
      explanation: "Learn what Python is and how it can be used to create games, websites, and solve puzzles. This section also covers setting up Python and understanding basic syntax like indentation and comments.",
      starterCode: "print('Hello, World!')",
      expectedOutput: "Hello, World!",
      challengeInstruction: "Type the code to print 'Hello, World!' and click 'Run Code'."
    },
    {
      title: "Variables and Data Types",
      explanation: "Variables store data. Learn about different data types such as strings, integers, floats, and booleans, and how to convert between them.",
      starterCode: "x = 42\nprint(x)",
      expectedOutput: "42",
      challengeInstruction: "Create a variable with your favorite number and print it."
    },
    {
      title: "Working with Strings",
      explanation: "Strings represent text. Learn how to create, combine, and manipulate strings using methods like upper(), lower(), and strip().",
      starterCode: "first = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
      expectedOutput: "Hello World",
      challengeInstruction: "Concatenate two strings and print the result."
    },
    {
      title: "Input and Output",
      explanation: "Learn how to get input from the user and display output. This section covers using input() to receive data and print() to show results.",
      starterCode: "name = 'Alice'  # In a real program, you'd use input()\nprint('Hello, ' + name)",
      expectedOutput: "Hello, Alice",
      challengeInstruction: "Simulate user input by assigning a name to a variable and printing a greeting."
    },
    {
      title: "Operators",
      explanation: "Operators allow you to perform calculations and comparisons. Learn arithmetic operators, comparison operators, and logical operators.",
      starterCode: "print(3 + 4)",
      expectedOutput: "7",
      challengeInstruction: "Calculate 3 + 4 and print the result."
    },
    {
      title: "Conditional Statements",
      explanation: "Make decisions in your code using if, elif, and else statements. Learn how conditions control the flow of your program.",
      starterCode: "if 10 > 5:\n    print('Yes')",
      expectedOutput: "Yes",
      challengeInstruction: "Write an if statement that prints 'Yes' when 10 is greater than 5."
    },
    {
      title: "Loops",
      explanation: "Loops allow you to repeat code. Learn how to use for loops and while loops to iterate over sequences.",
      starterCode: "for i in range(1, 4):\n    print(i)",
      expectedOutput: "1\n2\n3",
      challengeInstruction: "Write a loop that prints numbers 1, 2, and 3 on separate lines."
    },
    {
      title: "Lists and Tuples",
      explanation: "Lists and tuples store collections of items. Lists are mutable while tuples are immutable.",
      starterCode: "fruits = ['apple', 'banana']\nprint(fruits[0])",
      expectedOutput: "apple",
      challengeInstruction: "Create a list of fruits and print the first fruit."
    },
    {
      title: "Dictionaries",
      explanation: "Dictionaries store key-value pairs. Learn how to access and update dictionary data.",
      starterCode: "person = { 'name': 'Alice', 'age': 10 }\nprint(person['name'])",
      expectedOutput: "Alice",
      challengeInstruction: "Create a dictionary for a person and print their name."
    },
    {
      title: "Functions",
      explanation: "Functions allow you to reuse code. Learn how to define functions, pass parameters, and return values.",
      starterCode: "def greet():\n    print('Hello')\ngreet()",
      expectedOutput: "Hello",
      challengeInstruction: "Define a function that prints 'Hello' and call it."
    },
    {
      title: "Error Handling",
      explanation: "Learn to handle errors gracefully using try and except blocks.",
      starterCode: "try:\n    print(10/0)\nexcept ZeroDivisionError:\n    print('Error!')",
      expectedOutput: "Error!",
      challengeInstruction: "Write a try-except block that catches a division by zero error and prints 'Error!'."
    },
    {
      title: "File Handling",
      explanation: "Learn the basics of reading from and writing to files.",
      starterCode: "print('File handling example')",
      expectedOutput: "File handling example",
      challengeInstruction: "Simulate file handling by printing a message."
    },
    {
      title: "Modules and Libraries",
      explanation: "Modules let you use code written by others. Learn how to import built-in modules and use them.",
      starterCode: "import math\nprint(math.sqrt(16))",
      expectedOutput: "4.0",
      challengeInstruction: "Import the math module and print the square root of 16."
    },
    {
      title: "Object-Oriented Programming",
      explanation: "Learn the basics of classes and objects, how to define methods, and create instances.",
      starterCode: "class Dog:\n    def bark(self):\n        print('Woof')\nd = Dog()\nd.bark()",
      expectedOutput: "Woof",
      challengeInstruction: "Create a class for a dog that barks and call the bark method."
    },
    {
      title: "Advanced Topics",
      explanation: "Explore advanced Python topics like list comprehensions, generators, and decorators.",
      starterCode: "nums = [i for i in range(3)]\nprint(nums)",
      expectedOutput: "[0, 1, 2]",
      challengeInstruction: "Use a list comprehension to create a list of numbers from 0 to 2 and print it."
    },
    {
      title: "Fun Projects and Applications",
      explanation: "Apply your knowledge by building fun projects such as games or interactive stories.",
      starterCode: "print('Project coming soon')",
      expectedOutput: "Project coming soon",
      challengeInstruction: "Run the code to see a placeholder for a project."
    },
    {
      title: "Debugging and Problem-Solving",
      explanation: "Learn strategies for debugging your code and solving problems step by step.",
      starterCode: "print('Debugging is fun')",
      expectedOutput: "Debugging is fun",
      challengeInstruction: "Print a message that shows debugging can be fun."
    },
    {
      title: "Real-World Applications",
      explanation: "Discover how Python is used in web scraping, automation, and even simple AI projects.",
      starterCode: "print('Python in action!')",
      expectedOutput: "Python in action!",
      challengeInstruction: "Run the code to see an example of Python in real-world use."
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
  const progressIndicator = document.getElementById("progress-indicator");
  const progressCurrent = document.getElementById("progress-current");
  const progressTotal = document.getElementById("progress-total");
  const topicExplanation = document.getElementById("topic-explanation");
  const challengeInstructions = document.getElementById("challenge-instructions");
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
  let authMode = "login"; // or "signup"
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
        // Save user's name and initial progress (topic 0) to Firestore
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
      // Hide authentication, show main content
      authSection.style.display = "none";
      mainContent.style.display = "block";
      logoutBtn.style.display = "inline-block";
      // Retrieve user progress from Firestore
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
      // Show authentication, hide main content
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
      btn.addEventListener("click", () => {
        loadTopic(index);
      });
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
    challengeInstructions.innerText = topic.challengeInstruction;
    codeEditor.value = topic.starterCode;
    codeOutput.innerText = "";
    challengeFeedback.innerText = "";
    updateNavigationButtons();
    updateProgressDisplay();
  }
  
  // Update Previous/Next buttons
  function updateNavigationButtons() {
    // Previous button disabled if on first topic
    prevTopicBtn.disabled = currentTopicIndex === 0;
    // Next button disabled until challenge is passed
    nextTopicBtn.disabled = true;
  }
  
  // Update progress indicator and active nav button
  function updateProgressDisplay() {
    progressCurrent.innerText = currentTopicIndex + 1;
    const navButtons = document.querySelectorAll("#topics-nav button");
    navButtons.forEach((btn, idx) => {
      if (idx === currentTopicIndex) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
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
        output: function(text) {
            codeOutput.innerText += text;
        },
        read: builtinRead
    });
    Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    }).then(function() {
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
    }, function(err) {
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
  
  // Append navigation buttons to the topic-navigation section (if not already present)
  const topicNavContainer = document.getElementById("topic-navigation");
  if (!topicNavContainer) {
    const navContainer = document.createElement("div");
    navContainer.id = "topic-navigation";
    navContainer.appendChild(prevTopicBtn);
    navContainer.appendChild(nextTopicBtn);
    document.getElementById("main-content").appendChild(navContainer);
  }
  