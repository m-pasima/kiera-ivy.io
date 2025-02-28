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
  // Topics Array (Add more topics as needed)
  // -------------------------
  const topics = [
    {
      title: "Introduction to Python",
      explanation: "Python is a friendly language that lets you talk to your computer. With Python, you can create games, build websites, and solve puzzles. Let's start by printing a simple message.",
      starterCode: "print('Hello, World!')",
      expectedOutput: "Hello, World!",
      challengeInstruction: "Type the code to print 'Hello, World!' and click 'Run Code'."
    },
    {
      title: "Loops",
      explanation: "Loops help you repeat actions without writing code repeatedly. In this topic, you'll learn how to use a for loop to print numbers.",
      starterCode: "for i in range(1, 4):\n    print(i)",
      expectedOutput: "1\n2\n3",
      challengeInstruction: "Write a loop to print numbers 1, 2, and 3 (each on a new line)."
    },
    {
      title: "Strings",
      explanation: "Strings are used to represent text. They let you store words, sentences, and more. Let's see how to combine two strings.",
      starterCode: "first = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)",
      expectedOutput: "Hello World",
      challengeInstruction: "Concatenate two strings and print the result."
    }
    // Extend with additional topics (Conditionals, Functions, etc.)
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
  const progressText = document.getElementById("progress-text");
  const topicExplanation = document.getElementById("topic-explanation");
  const challengeInstructions = document.getElementById("challenge-instructions");
  const codeEditor = document.getElementById("code-editor");
  const runCodeBtn = document.getElementById("run-code-btn");
  const codeOutput = document.getElementById("code-output");
  const challengeFeedback = document.getElementById("challenge-feedback");
  const nextTopicBtn = document.getElementById("next-topic-btn");
  const prevTopicBtn = document.createElement("button");
  prevTopicBtn.id = "prev-topic-btn";
  prevTopicBtn.innerText = "Previous Topic";
  prevTopicBtn.disabled = true;
  
  const topicNavContainer = document.getElementById("topic-navigation");
  
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
        // Save user's name and progress to Firestore
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
      // Hide auth section and show main content
      authSection.style.display = "none";
      mainContent.style.display = "block";
      logoutBtn.style.display = "inline-block";
      // Retrieve user data from Firestore
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
      // Show auth section, hide main content
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
  
  // Update navigation buttons state (Previous / Next)
  function updateNavigationButtons() {
    // Previous button: disabled if first topic
    if (currentTopicIndex > 0) {
      prevTopicBtn.disabled = false;
    } else {
      prevTopicBtn.disabled = true;
    }
    // Next button: initially disabled until challenge is completed
    nextTopicBtn.disabled = true;
  }
  
  // Update progress indicator (e.g., "2 / 3 Topics Completed")
  function updateProgressDisplay() {
    progressText.innerText = (currentTopicIndex + 1) + " / " + topics.length;
    // Update active state on nav buttons
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
  // Skulpt Code Runner for the Challenge
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
            // Update user's progress in Firestore
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
  
  // Confetti celebration function
  function launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  
  // -------------------------
  // Navigation: Next & Previous Topic Buttons
  // -------------------------
  nextTopicBtn.addEventListener("click", () => {
    if (currentTopicIndex < topics.length - 1) {
      loadTopic(currentTopicIndex + 1);
      // Save progress in Firestore
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
  
  // Append Previous button to the topic navigation section if not already added
  if (!document.getElementById("prev-topic-btn")) {
    const navSection = document.getElementById("topic-navigation");
    navSection.appendChild(prevTopicBtn);
    navSection.appendChild(nextTopicBtn);
  }
  
  // If no explicit container exists, append navigation buttons after the challenge section
  if (!document.getElementById("topic-navigation")) {
    const navContainer = document.createElement("div");
    navContainer.id = "topic-navigation";
    navContainer.appendChild(prevTopicBtn);
    navContainer.appendChild(nextTopicBtn);
    document.getElementById("main-content").appendChild(navContainer);
  }
  