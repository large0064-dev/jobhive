let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// ADD JOB (Admin)
function addJob() {
  let title = document.getElementById("title").value;
  let company = document.getElementById("company").value;
  let desc = document.getElementById("desc").value;

  let newJob = {
    id: Date.now(),
    title: title,
    company: company,
    desc: desc
  };

  jobs.push(newJob);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job Added Successfully!");
}

// SHOW JOB LIST
function displayJobs() {
  let container = document.getElementById("jobList");
  if (!container) return;

  container.innerHTML = "";

  jobs.forEach(job => {
    container.innerHTML += `
      <div class="card" onclick="openJob(${job.id})">
        <h3>${job.title}</h3>
        <p>${job.company}</p>
      </div>
    `;
  });
}

// OPEN SINGLE JOB
function openJob(id) {
  localStorage.setItem("selectedJob", id);
  window.location.href = "job.html";
}

// SHOW SINGLE JOB DETAILS
function showJobDetails() {
  let container = document.getElementById("jobDetails");
  if (!container) return;

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

displayJobs();
showJobDetails();
