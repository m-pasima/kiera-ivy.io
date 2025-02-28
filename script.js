// Firebase Initialization
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Topics Array (Example with 8 topics)
  const topics = [
    {
      title: "Basics of Python",
      explanation: "Welcome to Python! Learn the basics of the print() function and comments.",
      starterCode: "# Write your code below\nprint('Hello, World!')",
      expectedOutput: "I am learning Python!",
      challengeInstruction: "Modify the starter code so that it prints 'I am learning Python!'."
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