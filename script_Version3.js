// Save new user
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const investmentForm = document.getElementById("investmentForm");

  // Registration
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.find(u => u.email === email)) {
        alert("Email already registered.");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful. Please login.");
      window.location.href = "login.html";
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      // Admin account
      if (email === "admin@demo.com" && password === "adminpassword") {
        localStorage.setItem("currentUser", JSON.stringify({ email, role: "admin" }));
        window.location.href = "admin.html";
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];
      let user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify({ email, role: "user" }));
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid login.");
      }
    });
  }

  // Investment
  if (investmentForm) {
    investmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const plan = document.getElementById("plan").value;
      const transaction = document.getElementById("transaction").value;

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) return;

      let investments = JSON.parse(localStorage.getItem("investments")) || [];
      investments.push({
        email: currentUser.email,
        plan,
        transaction,
        status: "Pending"
      });

      localStorage.setItem("investments", JSON.stringify(investments));
      alert("Investment submitted successfully.");
      location.reload();
    });

    // Show user investments
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let investments = JSON.parse(localStorage.getItem("investments")) || [];
    let userInvestments = investments.filter(i => i.email === currentUser.email);

    const list = document.getElementById("userInvestments");
    if (list) {
      list.innerHTML = userInvestments.map(i => `<li>${i.plan} - ${i.transaction} - ${i.status}</li>`).join("");
    }
  }

  // Admin dashboard
  const allInvestments = document.getElementById("allInvestments");
  if (allInvestments) {
    let investments = JSON.parse(localStorage.getItem("investments")) || [];
    allInvestments.innerHTML = investments.map(i => `
      <tr>
        <td>${i.name || "User"}</td>
        <td>${i.email}</td>
        <td>${i.plan}</td>
        <td>${i.transaction}</td>
        <td>${i.status}</td>
      </tr>
    `).join("");
  }
});

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}