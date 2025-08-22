// ==============================
// Local Hero Lite - app.js
// ==============================

// LocalStorage Helper
const LS = {
  get: (k) => {
    try {
      const item = localStorage.getItem(k);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading localStorage key "${k}":`, error);
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (error) {
      console.error(`Error writing localStorage key "${k}":`, error);
    }
  },
};

// ------------------------------
// Seed Sample Data if Empty
// ------------------------------
(function seedData() {
  try {
    // Check if this is the first time the app is being used
    const isFirstTime = !LS.get("appInitialized");
    
    if (isFirstTime) {
      console.log("First time app initialization - seeding sample data...");
      
    const users = LS.get("users") || [];
    const issues = LS.get("issues") || [];
    const chats = LS.get("chats") || {};

    if (users.length === 0) {
      console.log("Seeding users...");
      LS.set("users", [
        { username: "thandi", password: "1234", role: "community", ward: "12", metro: "eThekwini" },
        { username: "samuel", password: "1234", role: "community", ward: "13", metro: "eThekwini" },
        { username: "c_khumalo", password: "1234", role: "councillor", ward: "12", metro: "eThekwini" },
        { username: "c_moyo", password: "1234", role: "councillor", ward: "13", metro: "eThekwini" },
        { username: "m_staff", password: "1234", role: "municipality", ward: "", metro: "eThekwini" },
      ]);
    }

    if (issues.length === 0) {
      console.log("Seeding issues...");
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
          unreadCount: { community: 0, councillor: 1, municipality: 1 }
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
          unreadCount: { community: 0, councillor: 0, municipality: 1 }
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
          unreadCount: { community: 0, councillor: 1, municipality: 0 }
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
          unreadCount: { community: 0, councillor: 0, municipality: 1 }
        },
        {
          id: now - 1500,
          title: "Broken playground equipment",
          description: "Swings and slides are damaged and unsafe for children.",
          category: "Public Safety",
          status: "Not Started",
          ward: "12",
          metro: "eThekwini",
          createdBy: "thandi",
          councillorUsername: "c_khumalo",
          createdAt: now - 1500,
          unreadCount: { community: 0, councillor: 1, municipality: 1 }
        },
        {
          id: now - 800,
          title: "Traffic light malfunction",
          description: "Traffic light at Main St and Oak Ave intersection not working.",
          category: "Traffic",
          status: "Not Started",
          ward: "13",
          metro: "eThekwini",
          createdBy: "samuel",
          councillorUsername: "c_moyo",
          createdAt: now - 800,
          unreadCount: { community: 0, councillor: 1, municipality: 1 }
        },
        {
          id: now - 400,
          title: "Garbage collection missed",
          description: "Weekly garbage collection was skipped in Ward 12.",
          category: "Waste Management",
          status: "Not Started",
          ward: "12",
          metro: "eThekwini",
          createdBy: "thandi",
          councillorUsername: "c_khumalo",
          createdAt: now - 400,
          unreadCount: { community: 0, councillor: 1, municipality: 0 }
        }
      ];
      LS.set("issues", sampleIssues);

        // Only create sample chats if chats are completely empty
        if (Object.keys(chats).length === 0) {
          console.log("Seeding sample chats...");
      chats[sampleIssues[0].id] = [
        { sender: "thandi", role: "community", text: "Hi Councillor, please help with this pothole.", ts: now - 19000, read: true },
        { sender: "c_khumalo", role: "councillor", text: "Thanks, I'll notify the municipality team.", ts: now - 18500, read: true },
        { sender: "m_staff", role: "municipality", text: "Acknowledged. We will schedule a team this week.", ts: now - 18000, read: false }
      ];
      chats[sampleIssues[1].id] = [
        { sender: "c_khumalo", role: "councillor", text: "Municipality team, please check this streetlight.", ts: now - 9000, read: true },
        { sender: "m_staff", role: "municipality", text: "On it. Parts ordered.", ts: now - 8000, read: false },
        { sender: "thandi", role: "community", text: "Thank you for the update!", ts: now - 7000, read: true }
      ];
      chats[sampleIssues[2].id] = [
        { sender: "thandi", role: "community", text: "Dumping site is getting bigger, very smelly.", ts: now - 4900, read: true },
        { sender: "c_khumalo", role: "councillor", text: "Noted. I'll escalate this to municipality waste management.", ts: now - 4800, read: false }
      ];
      chats[sampleIssues[3].id] = [
        { sender: "samuel", role: "community", text: "Water has been leaking for days, wasting a lot.", ts: now - 2800, read: true },
        { sender: "c_moyo", role: "councillor", text: "Thank you, I will escalate.", ts: now - 2600, read: true },
        { sender: "m_staff", role: "municipality", text: "Repair crew assigned, should be fixed tomorrow.", ts: now - 2500, read: false }
      ];
      chats[sampleIssues[4].id] = [
        { sender: "thandi", role: "community", text: "Playground equipment is broken and dangerous for kids.", ts: now - 1400, read: true },
        { sender: "c_khumalo", role: "councillor", text: "This is serious. I'll contact municipality immediately.", ts: now - 1300, read: false },
        { sender: "m_staff", role: "municipality", text: "Safety team dispatched. Will assess and repair.", ts: now - 1200, read: false }
      ];
      chats[sampleIssues[5].id] = [
        { sender: "samuel", role: "community", text: "Traffic light not working at Main and Oak intersection.", ts: now - 700, read: true },
        { sender: "c_moyo", role: "councillor", text: "This is urgent for traffic safety. Escalating now.", ts: now - 600, read: false },
        { sender: "m_staff", role: "municipality", text: "Traffic department notified. Emergency repair team on way.", ts: now - 500, read: false }
      ];
      chats[sampleIssues[6].id] = [
        { sender: "thandi", role: "community", text: "Garbage collection was missed this week in our area.", ts: now - 300, read: true },
        { sender: "c_khumalo", role: "councillor", text: "I'll contact waste management to arrange pickup.", ts: now - 200, read: false }
      ];
      LS.set("chats", chats);
    }
      }

      // Mark the app as initialized so we don't seed again
      LS.set("appInitialized", true);

      console.log("First-time seeding complete - Final state:", { 
      users: (LS.get("users") || []).length, 
      issues: (LS.get("issues") || []).length, 
      chats: Object.keys(LS.get("chats") || {}).length 
    });
    } else {
      console.log("App already initialized - skipping sample data seeding");
    }
    
    // Ensure chats is properly set even if there was an error
    const finalChats = LS.get("chats");
    if (!finalChats || typeof finalChats !== 'object') {
      LS.set("chats", {});
    }
  } catch (error) {
    console.error("Error during data seeding:", error);
    // Ensure basic data structure exists even if seeding fails
    if (!LS.get("users")) LS.set("users", []);
    if (!LS.get("issues")) LS.set("issues", []);
    if (!LS.get("chats")) LS.set("chats", {});
  }
})();

// ------------------------------
// Auth Handlers
// ------------------------------
function initAuthPage() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const roleSelect = document.getElementById("role");
  const wardRow = document.getElementById("wardRow");
  const councillorRow = document.getElementById("councillorRow");

  // Handle conditional field display
  if (roleSelect && wardRow && councillorRow) {
    function updateFields() {
      const role = roleSelect.value;
      if (role === "community") {
        wardRow.classList.add("show");
        councillorRow.classList.add("show");
      } else if (role === "councillor") {
        wardRow.classList.add("show");
        councillorRow.classList.remove("show");
      } else if (role === "municipality") {
        wardRow.classList.remove("show");
        councillorRow.classList.remove("show");
      }
    }

    roleSelect.addEventListener("change", updateFields);
    updateFields(); // Set initial state
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("loginUser").value;
      const pass = document.getElementById("loginPass").value;

      console.log("Login attempt:", { username: user, password: pass });

      const users = LS.get("users") || [];
      console.log("Available users:", users);
      
      const found = users.find((u) => u.username === user && u.password === pass);
      console.log("User found:", found);
      
      if (found) {
        console.log("Login successful, setting current user:", found);
        LS.set("currentUser", found);
        window.location = "dashboard.html";
      } else {
        console.log("Login failed: Invalid credentials");
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
      const councillorUser = document.getElementById("councillorUser").value;

      // Validation
      if (role === "community" && (!ward || !councillorUser)) {
        return alert("Community members must provide Ward and Councillor Username");
      }
      if ((role === "community" || role === "councillor") && !ward) {
        return alert("Ward is required for Community Members and Councillors");
      }
      if (!metro) {
        return alert("Metro is required for all users");
      }

      const users = LS.get("users") || [];
      if (users.find((x) => x.username === u)) {
        return alert("Username exists");
      }
      
      const newUser = { username: u, password: p, role, ward, metro, councillorUsername: councillorUser };
      users.push(newUser);
      LS.set("users", users);
      
      // Show success message briefly
      const successMsg = document.createElement('div');
      successMsg.className = 'signup-success';
      successMsg.textContent = `Account created successfully! Welcome, ${u}!`;
      document.body.appendChild(successMsg);
      
      // Automatically log in the new user
      LS.set("currentUser", newUser);
      
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        window.location = "dashboard.html";
      }, 1500);
    });
  }
}

// ------------------------------
// Dashboard
// ------------------------------
function initDashboardPage() {
  const user = LS.get("currentUser");
  if (!user) return (window.location = "index.html");

  console.log("Current user:", user);

  const issues = LS.get("issues") || [];
  console.log("All issues:", issues);
  
  // Ensure all issues have proper unread count structure
  ensureUnreadCountStructure(issues);

  // Update user badge
  const userBadge = document.getElementById("userBadge");
  if (userBadge) {
    const totalUnread = issues.reduce((total, issue) => {
      return total + (issue.unreadCount?.[user.role] || 0);
    }, 0);
    
    userBadge.innerHTML = `
      ${user.username} (${user.role})
      ${totalUnread > 0 ? `<span class="unread-badge">${totalUnread}</span>` : ''}
    `;
  }

  // Show/hide report link based on role
  const reportLink = document.getElementById("reportLink");
  if (reportLink) {
    reportLink.style.display = user.role === "community" ? "inline-block" : "none";
  }
  
  let visibleIssues = [];

  if (user.role === "community") {
    visibleIssues = issues.filter((i) => i.createdBy === user.username);
    console.log("Community visible issues:", visibleIssues);
    console.log("Filtering by createdBy:", user.username);
    document.getElementById("dashboardContent").innerHTML = `
      <h3>Welcome ${user.username} (Community Member)</h3>
      <p class="muted">Ward ${user.ward}, ${user.metro}</p>
      <a href="report.html" class="btn">Report New Issue</a>
      <div id="issueList"></div>`;
  } else if (user.role === "councillor") {
    visibleIssues = issues.filter((i) => String(i.ward) === String(user.ward));
    console.log("Councillor visible issues:", visibleIssues);
    console.log("Filtering by ward:", user.ward, "Type:", typeof user.ward);
    console.log("Issue wards:", issues.map(i => ({ id: i.id, ward: i.ward, type: typeof i.ward })));
    document.getElementById("dashboardContent").innerHTML = `
      <h3>Welcome Councillor ${user.username}</h3>
      <p class="muted">Ward ${user.ward}, ${user.metro}</p>
      <h4>Issues in Ward ${user.ward}</h4>
      <div id="issueList"></div>`;
  } else if (user.role === "municipality") {
    visibleIssues = issues.filter((i) => String(i.metro) === String(user.metro));
    console.log("Municipality visible issues:", visibleIssues);
    console.log("Filtering by metro:", user.metro, "Type:", typeof user.metro);
    console.log("Issue metros:", issues.map(i => ({ id: i.id, metro: i.metro, type: typeof i.metro })));
    document.getElementById("dashboardContent").innerHTML = `
      <h3>Welcome Municipality Staff (${user.metro})</h3>
      <h4>All Issues in Metro</h4>
      <div id="issueList"></div>`;
  } else {
    console.error("Unknown user role:", user.role);
    document.getElementById("dashboardContent").innerHTML = `
      <h3>Error: Unknown user role</h3>
      <p>Please contact support.</p>`;
    return;
  }

  const listEl = document.getElementById("issueList");
  if (!listEl) {
    console.error("Issue list element not found!");
    return;
  }

  if (visibleIssues.length === 0) {
    if (user.role === "community") {
      listEl.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px 20px;">
          <h3>Welcome to Local Hero Lite! 🎉</h3>
          <p class="muted">You haven't reported any issues yet.</p>
          <p>Start by reporting your first community issue using the button above.</p>
          <div style="margin-top: 20px;">
            <a href="report.html" class="btn primary">Report Your First Issue</a>
          </div>
        </div>`;
    } else if (user.role === "councillor") {
      listEl.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px 20px;">
          <h3>Welcome Councillor! 🏛️</h3>
          <p class="muted">No issues have been reported in Ward ${user.ward} yet.</p>
          <p>When community members report issues, they will appear here for you to review and coordinate.</p>
        </div>`;
    } else if (user.role === "municipality") {
      listEl.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px 20px;">
          <h3>Welcome Municipality Staff! 🏢</h3>
          <p class="muted">No issues have been reported in ${user.metro} yet.</p>
          <p>When councillors escalate issues, they will appear here for you to manage and resolve.</p>
        </div>`;
    } else {
      listEl.innerHTML = '<p class="muted">No issues found.</p>';
    }
    return;
  }

  listEl.innerHTML = visibleIssues
    .map(
      (it) => {
        const unreadCount = it.unreadCount?.[user.role] || 0;
        const unreadBadge = unreadCount > 0 ? `<span class="unread-badge">${unreadCount}</span>` : '';
        
        return `
        <div class="card">
          <div class="issue-header">
            <h4>${it.title}</h4>
            ${unreadBadge}
          </div>
          <p><b>Category:</b> ${it.category}</p>
          <p><b>Description:</b> ${it.description}</p>
          <p><b>Status:</b> <span class="status-${it.status.toLowerCase().replace(' ', '-')}">${it.status}</span></p>
          <p><b>Ward:</b> ${it.ward} | <b>Metro:</b> ${it.metro}</p>
          <p><b>Reported by:</b> ${it.createdBy}</p>
          <div class="issue-actions">
            <a class="btn ghost" href="chat.html?id=${it.id}">
              Open Chat ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}
            </a>
            ${
              user.role === "municipality"
                ? `<select onchange="updateStatus(${it.id}, this.value)">
                    <option>Not Started</option>
                    <option ${it.status === "In Progress" ? "selected" : ""}>In Progress</option>
                    <option ${it.status === "Resolved" ? "selected" : ""}>Resolved</option>
                  </select>`
                : ""
            }
          </div>
        </div>`;
      }
    )
    .join("");
}

function updateStatus(issueId, newStatus) {
  const issues = LS.get("issues") || [];
  const idx = issues.findIndex((i) => i.id === issueId);
  if (idx > -1) {
    const oldStatus = issues[idx].status;
    issues[idx].status = newStatus;
    LS.set("issues", issues);
    
    // Add status update message to chat
    const chats = LS.get("chats") || {};
    if (chats[issueId]) {
      const currentUser = LS.get("currentUser");
      const statusMessage = {
        sender: currentUser.username,
        role: currentUser.role,
        text: `Status updated from "${oldStatus}" to "${newStatus}"`,
        ts: Date.now(),
        read: false,
        isStatusUpdate: true
      };
      chats[issueId].push(statusMessage);
      LS.set("chats", chats);
      
      // Update unread counts for other users
      updateUnreadCount(issueId, currentUser.username);
    }
    
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
      unreadCount: { community: 0, councillor: 1, municipality: 1 }
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

  const chatStream = document.getElementById("chatStream");
  const liveChatMessages = document.getElementById("liveChatMessages");
  
  // Reset unread count for current user when they open the chat
  resetUnreadCountForUser(issueId, user.username);
  
  // Load and display issue metadata
  loadIssueMetadata(issueId);
  
  // Show sample chats and live messages
  showSampleChat(issueId);
  renderLiveMessages();
  

  
  function renderLiveMessages() {
    if (chats[issueId] && chats[issueId].length > 0) {
      liveChatMessages.innerHTML = chats[issueId]
        .map(
          (m) => {
            const isUnread = !m.read && m.sender !== user.username;
            const unreadClass = isUnread ? 'unread' : '';
            const statusUpdateAttr = m.isStatusUpdate ? 'data-status-update="true"' : '';
            const msgClass = m.role === 'community' ? 'community' : m.role === 'councillor' ? 'councillor' : 'municipality';
            
            return `<div class="live-message ${msgClass} ${unreadClass}" ${statusUpdateAttr}>
              <div class="msg-header">
                <span class="sender">${m.sender}</span>
                <span class="role">${m.role}</span>
                <span class="time">${new Date(m.ts).toLocaleString()}</span>
              </div>
              <div class="msg-content">${m.text}</div>
            </div>`;
          }
        )
        .join("");
    } else {
      liveChatMessages.innerHTML = `
        <div style="text-align: center; color: var(--muted); padding: 20px;">
          <p>💬 No live messages yet. Start the conversation!</p>
        </div>
      `;
    }
    
    // Mark messages as read for current user
    markMessagesAsRead(issueId, user.username);
    
    // Scroll to bottom of live messages
    liveChatMessages.scrollTop = liveChatMessages.scrollHeight;
  }
  
  function loadIssueMetadata(issueId) {
    const issues = LS.get("issues") || [];
    const issue = issues.find(i => i.id == issueId);
    
    if (issue) {
      document.getElementById("issueTitle").textContent = issue.title;
      document.getElementById("issueDescription").textContent = issue.description;
      document.getElementById("issueCategory").textContent = issue.category;
      document.getElementById("issueWard").textContent = issue.ward;
      document.getElementById("issueMetro").textContent = issue.metro;
      document.getElementById("issueReporter").textContent = issue.createdBy;
      
      // Set status badge
      const statusBadge = document.getElementById("issueStatus");
      statusBadge.textContent = issue.status;
      statusBadge.className = `status-badge status-${issue.status.toLowerCase().replace(' ', '-')}`;
    }
  }
  
  function showSampleChat(issueId) {
    const issues = LS.get("issues") || [];
    const issue = issues.find(i => i.id == issueId);
    
    if (issue) {
      // Map issue category to sample chat type
      let chatType = 'general';
      if (issue.category.toLowerCase().includes('pothole')) chatType = 'pothole';
      else if (issue.category.toLowerCase().includes('streetlight')) chatType = 'streetlight';
      else if (issue.category.toLowerCase().includes('dumping')) chatType = 'dumping';
      else if (issue.category.toLowerCase().includes('water')) chatType = 'water';
      else if (issue.category.toLowerCase().includes('playground') || issue.category.toLowerCase().includes('safety')) chatType = 'playground';
      else if (issue.category.toLowerCase().includes('traffic')) chatType = 'traffic';
      else if (issue.category.toLowerCase().includes('garbage') || issue.category.toLowerCase().includes('waste')) chatType = 'garbage';
      
      // Show the appropriate sample chat
      const sampleChats = document.querySelectorAll('.sample-chat');
      sampleChats.forEach(chat => {
        chat.classList.remove('active');
        if (chat.dataset.issueType === chatType) {
          chat.classList.add('active');
          chatStream.innerHTML = chat.innerHTML;
        }
      });
      
      // If no specific chat type found, show a general one
      if (!document.querySelector('.sample-chat.active')) {
        chatStream.innerHTML = `
          <div class="chat-placeholder">
            <div class="placeholder-icon">💬</div>
            <p>Sample conversations for this issue type.</p>
            <p class="muted">Below you can send live messages to other users.</p>
          </div>
        `;
      }
    }
  }
  
  function markMessagesAsRead(issueId, username) {
    const issues = LS.get("issues") || [];
    const issue = issues.find(i => i.id == issueId);
    if (issue && issue.unreadCount) {
      // Get the user's role to properly reset the unread count
      const users = LS.get("users") || [];
      const user = users.find(u => u.username === username);
      if (user && user.role) {
        issue.unreadCount[user.role] = 0;
      LS.set("issues", issues);
      }
    }
  }
  
  render();

  document.getElementById("chatForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("chatMessage").value;
    if (!msg.trim()) return;
    
    const newMessage = { 
      sender: user.username, 
      role: user.role, 
      text: msg, 
      ts: Date.now(),
      read: false 
    };
    
    chats[issueId].push(newMessage);
    LS.set("chats", chats);
    
    // Update unread count for other users
    updateUnreadCount(issueId, user.username);
    
    document.getElementById("chatMessage").value = "";
    
    // Re-render live messages
    renderLiveMessages();
  });
}

function updateUnreadCount(issueId, senderUsername) {
  const issues = LS.get("issues") || [];
  const issue = issues.find(i => i.id == issueId);
  if (issue && issue.unreadCount) {
    // Get the sender's role to properly update unread counts
    const users = LS.get("users") || [];
    const sender = users.find(u => u.username === senderUsername);
    
    if (sender) {
      // Increment unread count for all other users based on their roles
    if (issue.createdBy !== senderUsername) {
      issue.unreadCount.community = (issue.unreadCount.community || 0) + 1;
    }
    if (issue.councillorUsername !== senderUsername) {
      issue.unreadCount.councillor = (issue.unreadCount.councillor || 0) + 1;
    }
      if (sender.role !== "municipality") {
    issue.unreadCount.municipality = (issue.unreadCount.municipality || 0) + 1;
      }
      
      LS.set("issues", issues);
    }
  }
}

function resetUnreadCountForUser(issueId, username) {
  const issues = LS.get("issues") || [];
  const issue = issues.find(i => i.id == issueId);
  if (issue && issue.unreadCount) {
    // Get the user's role to properly reset the unread count
    const users = LS.get("users") || [];
    const user = users.find(u => u.username === username);
    if (user && user.role) {
      issue.unreadCount[user.role] = 0;
      LS.set("issues", issues);
    }
  }
}

function ensureUnreadCountStructure(issues) {
  let needsUpdate = false;
  
  issues.forEach(issue => {
    if (!issue.unreadCount || typeof issue.unreadCount !== 'object') {
      issue.unreadCount = { community: 0, councillor: 0, municipality: 0 };
      needsUpdate = true;
    } else {
      // Ensure all required properties exist
      if (typeof issue.unreadCount.community !== 'number') issue.unreadCount.community = 0;
      if (typeof issue.unreadCount.councillor !== 'number') issue.unreadCount.councillor = 0;
      if (typeof issue.unreadCount.municipality !== 'number') issue.unreadCount.municipality = 0;
    }
  });
  
  if (needsUpdate) {
    LS.set("issues", issues);
    console.log("Fixed unread count structure for issues");
  }
}

// ------------------------------
// Global
// ------------------------------
function logout() {
  localStorage.removeItem("currentUser");
  window.location = "index.html";
}

function resetSampleData() {
  try {
    localStorage.clear();
    alert("Sample data reset! Please refresh the page.");
    window.location.reload();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    alert("Error clearing data. Please try refreshing the page manually.");
  }
}

function clearCorruptedData() {
  try {
    // Clear only the specific keys that might be corrupted
    localStorage.removeItem("users");
    localStorage.removeItem("issues");
    localStorage.removeItem("chats");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("appInitialized");
    alert("Corrupted data cleared! Please refresh the page.");
    window.location.reload();
  } catch (error) {
    console.error("Error clearing corrupted data:", error);
    alert("Error clearing data. Please try refreshing the page manually.");
  }
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
