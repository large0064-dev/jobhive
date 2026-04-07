// ================= JOB STORAGE =================
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// ================= SIGNUP =================
function signup() {
  let username = document.getElementById("username").value;
  let number = document.getElementById("number").value;
  let password = document.getElementById("password").value;

  if (!username || !number || !password) {
    alert("Please fill all fields");
    return;
  }

  let user = { username, number, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Account created successfully!");
  window.location.href = "login.html";
}

// ================= LOGIN =================
function login() {
  let loginUser = document.getElementById("loginUser").value;
  let loginPass = document.getElementById("loginPass").value;

  let savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found. Please signup first.");
    return;
  }

  if (
    loginUser === savedUser.username &&
    loginPass === savedUser.password
  ) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password");
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// ================= ADD JOB =================
function addJob() {
  let title = document.getElementById("title").value;
  let company = document.getElementById("company").value;
  let desc = document.getElementById("desc").value;

  if (!title || !company || !desc) {
    alert("Fill all fields");
    return;
  }

  let newJob = {
    id: Date.now(),
    title: title,
    company: company,
    desc: desc
  };

  jobs.push(newJob);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job added successfully!");
}

// ================= DISPLAY JOBS =================
function displayJobs() {
  let container = document.getElementById("jobList");
  if (!container) return;

  container.innerHTML = "";

  jobs.forEach(job => {
    container.innerHTML += `
      <div class="card" onclick="openJob(${job.id})">
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <p>🔒 Unlock to view details</p>
      </div>
    `;
  });
}

// ================= OPEN JOB =================
function openJob(id) {
  // Check login first
  if (localStorage.getItem("loggedIn") !== "true") {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  localStorage.setItem("selectedJob", id);
  window.location.href = "job.html";
}

// ================= SHOW JOB DETAILS =================
function showJobDetails() {
  let container = document.getElementById("jobDetails");
  if (!container) return;

  // Check login
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  let id = localStorage.getItem("selectedJob");
  let job = jobs.find(j => j.id == id);

  if (job) {
    container.innerHTML = `
      <div class="card">
        <h2>${job.title}</h2>
        <h4>${job.company}</h4>
        <p>${job.desc}</p>
        <button>Apply Now</button>
      </div>
    `;
  }
}

// ================= INIT =================
displayJobs();
showJobDetails();
