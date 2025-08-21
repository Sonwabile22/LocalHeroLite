// ==============================
// Local Hero Lite - app.js
// ==============================

// LocalStorage Helper
const LS = {
  get: (k) => JSON.parse(localStorage.getItem(k) || "null"),
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
};

// ------------------------------
// Seed Sample Data if Empty
// ------------------------------
(function seedData() {
  const users = LS.get("users") || [];
  const issues = LS.get("issues") || [];
  const chats = LS.get("chats") || {};

  if (users.length === 0) {
    LS.set("users", [
      { username: "thandi", password: "123", role: "community", ward: "12", metro: "eThekwini" },
      { username: "samuel", password: "123", role: "community", ward: "13", metro: "eThekwini" },
      { username: "c_khumalo", password: "123", role: "councillor", ward: "12", metro: "eThekwini" },
      { username: "c_moyo", password: "123", role: "councillor", ward: "13", metro: "eThekwini" },
      { username: "m_staff", password: "123", role: "municipality", ward: "", metro: "eThekwini" },
    ]);
  }

  if (issues.length === 0) {
    const now = Date.now();
    const sampleIssues = [
      {
        id: now - 20000,
        title: "Large pothole near clinic",
        description: "Dangerous pothole on Oak Street, damaging tyres.",
        category: "Pothole",
        status: "Not Started",
        ward: "12",
        metro: "eThekwini",
        createdBy: "thandi",
        councillorUsername: "c_khumalo",
        createdAt: now - 20000,
      },
      {
        id: now - 10000,
        title: "Streetlight out on 3rd Ave",
        description: "Very dark at night; safety risk.",
        category: "Streetlight",
        status: "In Progress",
        ward: "12",
        metro: "eThekwini",
        createdBy: "thandi",
        councillorUsername: "c_khumalo",
        createdAt: now - 10000,
      },
      {
        id: now - 5000,
        title: "Illegal dumping site growing",
        description: "People are dumping rubbish behind the soccer field.",
        category: "Illegal Dumping",
        status: "Not Started",
        ward: "12",
        metro: "eThekwini",
        createdBy: "thandi",
        councillorUsername: "c_khumalo",
        createdAt: now - 5000,
      },
      {
        id: now - 3000,
        title: "Water leak near school",
        description: "Burst pipe leaking continuously.",
        category: "Water Leak",
        status: "In Progress",
        ward: "13",
        metro: "eThekwini",
        createdBy: "samuel",
        councillorUsername: "c_moyo",
        createdAt: now - 3000,
      },
    ];
    LS.set("issues", sampleIssues);

    chats[sampleIssues[0].id] = [
      { sender: "thandi", role: "community", text: "Hi Councillor, please help with this pothole.", ts: now - 19000 },
      { sender: "c_khumalo", role: "councillor", text: "Thanks, I’ll notify the municipality team.", ts: now - 18500 },
      { sender: "m_staff", role: "municipality", text: "Acknowledged. We will schedule a team this week.", ts: now - 18000 },
    ];
    chats[sampleIssues[1].id] = [
      { sender: "c_khumalo", role: "councillor", text: "Municipality team, please check this streetlight.", ts: now - 9000 },
      { sender: "m_staff", role: "municipality", text: "On it. Parts ordered.", ts: now - 8000 },
      { sender: "thandi", role: "community", text: "Thank you for the update!", ts: now - 7000 },
    ];
    chats[sampleIssues[2].id] = [
      { sender: "thandi", role: "community", text: "Dumping site is getting bigger, very smelly.", ts: now - 4900 },
      { sender: "c_khumalo", role: "councillor", text: "Noted. I’ll escalate this to municipality waste management.", ts: now - 4800 },
    ];
    chats[sampleIssues[3].id] = [
      { sender: "samuel", role: "community", text: "Water has been leaking for days, wasting a lot.", ts: now - 2800 },
      { sender: "c_moyo", role: "councillor", text: "Thank you, I will escalate.", ts: now - 2600 },
      { sender: "m_staff", role: "municipality", text: "Repair crew assigned, should be fixed tomorrow.", ts: now - 2500 },
    ];

    LS.set("chats", chats);
  }
})();

// ------------------------------
// Auth Handlers
// ------------------------------
function initAuthPage() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("loginUser").value;
      const pass = document.getElementById("loginPass").value;

      const users = LS.get("users") || [];
      const found = users.find((u) => u.username === user && u.password === pass);
      if (found) {
        LS.set("currentUser", found);
        window.location = "dashboard.html";
      } else {
        alert("Invalid credentials");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("signupUser").value;
      const p = document.getElementById("signupPass").value;
      const role = document.getElementById("role").value;
      const ward = document.getElementById("ward").value;
      const metro = document.getElementById("metro").value;

      const users = LS.get("users") || [];
      if (users.find((x) => x.username === u)) {
        return alert("Username exists");
      }
      const newUser = { username: u, password: p, role, ward, metro };
      users.push(newUser);
      LS.set("users", users);
      alert("Signup success! Please log in.");
    });
  }
}

// ------------------------------
// Dashboard
// ------------------------------
function initDashboardPage() {
  const user = LS.get("currentUser");
  if (!user) return (window.location = "index.html");

  const issues = LS.get("issues") || [];
  let visibleIssues = [];

  if (user.role === "community") {
    visibleIssues = issues.filter((i) => i.createdBy === user.username);
    document.getElementById("dashboardContent").innerHTML = `
      <h3>Welcome ${user.username} (Community Member)</h3>
      <a href="report.html" class="btn">Report New Issue</a>
      <div id="issueList"></div>`;
  }

  if (user.role === "councillor") {
    visibleIssues = issues.filter((i) => i.ward === user.ward);
    document.getElementById("dashboardContent").innerHTML = `
      <h3>Welcome Councillor ${user.username}</h3>
      <h4>Issues in Ward ${user.ward}</h4>
      <div id="issueList"></div>`;
  }

  if (user.role === "municipality") {
    visibleIssues = issues.filter((i) => i.metro === user.metro);
    document.getElementById("dashboardContent").innerHTML = `
      <h3>Welcome Municipality Staff (${user.metro})</h3>
      <h4>All Issues in Metro</h4>
      <div id="issueList"></div>`;
  }

  const listEl = document.getElementById("issueList");
  if (!listEl) return;

  listEl.innerHTML = visibleIssues
    .map(
      (it) => `
      <div class="card">
        <h4>${it.title}</h4>
        <p><b>Category:</b> ${it.category}</p>
        <p><b>Description:</b> ${it.description}</p>
        <p><b>Status:</b> ${it.status}</p>
        <p><b>Ward:</b> ${it.ward} | <b>Metro:</b> ${it.metro}</p>
        <a class="btn ghost" href="chat.html?id=${it.id}">Open Chat</a>
        ${
          user.role === "municipality"
            ? `<select onchange="updateStatus(${it.id}, this.value)">
                <option>Not Started</option>
                <option ${it.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option ${it.status === "Resolved" ? "selected" : ""}>Resolved</option>
              </select>`
            : ""
        }
      </div>`
    )
    .join("");
}

function updateStatus(issueId, newStatus) {
  const issues = LS.get("issues") || [];
  const idx = issues.findIndex((i) => i.id === issueId);
  if (idx > -1) {
    issues[idx].status = newStatus;
    LS.set("issues", issues);
    alert("Status updated!");
    window.location.reload();
  }
}

// ------------------------------
// Report Issue
// ------------------------------
function initReportPage() {
  const user = LS.get("currentUser");
  if (!user || user.role !== "community") return (window.location = "index.html");

  const form = document.getElementById("reportForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const desc = document.getElementById("description").value;
    const cat = document.getElementById("category").value;

    const issues = LS.get("issues") || [];
    const id = Date.now();
    const newIssue = {
      id,
      title,
      description: desc,
      category: cat,
      status: "Not Started",
      ward: user.ward,
      metro: user.metro,
      createdBy: user.username,
      councillorUsername: LS.get("users").find(
        (u) => u.role === "councillor" && u.ward === user.ward
      )?.username,
      createdAt: id,
    };
    issues.push(newIssue);
    LS.set("issues", issues);
    alert("Issue reported!");
    window.location = "dashboard.html";
  });
}

// ------------------------------
// Chat Page
// ------------------------------
function initChatPage() {
  const user = LS.get("currentUser");
  if (!user) return (window.location = "index.html");

  const params = new URLSearchParams(window.location.search);
  const issueId = params.get("id");
  if (!issueId) return;

  const chats = LS.get("chats") || {};
  if (!chats[issueId]) chats[issueId] = [];

  const chatBox = document.getElementById("chatBox");
  function render() {
    chatBox.innerHTML = chats[issueId]
      .map(
        (m) => `<p><b>${m.sender} (${m.role}):</b> ${m.text}</p>`
      )
      .join("");
  }
  render();

  document.getElementById("chatForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("chatMessage").value;
    chats[issueId].push({ sender: user.username, role: user.role, text: msg, ts: Date.now() });
    LS.set("chats", chats);
    document.getElementById("chatMessage").value = "";
    render();
  });
}

// ------------------------------
// Global
// ------------------------------
function logout() {
  localStorage.removeItem("currentUser");
  window.location = "index.html";
}

// ------------------------------
// Init depending on page
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("loginForm")) initAuthPage();
  if (document.getElementById("dashboardContent")) initDashboardPage();
  if (document.getElementById("reportForm")) initReportPage();
  if (document.getElementById("chatBox")) initChatPage();
});
