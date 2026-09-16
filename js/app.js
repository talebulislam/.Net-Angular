import {
  changePassword,
  getCurrentUser,
  register,
  signIn,
  signOut,
} from "./auth.js";
import { getCompletedDays, saveCompletedDays } from "./storage.js";
import { renderDays, renderWeeks, updateProgress } from "./components.js";
import { deleteUser, getUsers, setApproval } from "./admin.js";

const plan = window.roadmapPlan;
const elements = {
  authScreen: document.getElementById("auth-screen"),
  appShell: document.getElementById("app-shell"),
  loginForm: document.getElementById("login-form"),
  loginError: document.getElementById("login-error"),
  registerForm: document.getElementById("register-form"),
  registerError: document.getElementById("register-error"),
  authSwitch: document.getElementById("auth-switch"),
  authTitle: document.getElementById("login-title"),
  authDescription: document.getElementById("auth-description"),
  userName: document.getElementById("user-name"),
  logoutButton: document.getElementById("logout-btn"),
  weekList: document.getElementById("week-list"),
  days: document.getElementById("days-container"),
  progressText: document.getElementById("progress-text"),
  progressPercent: document.getElementById("progress-percent"),
  progressFill: document.getElementById("progress-fill"),
  todayButton: document.getElementById("today-btn"),
  resetButton: document.getElementById("reset-btn"),
  printButton: document.getElementById("print-btn"),
  bookmarkButton: document.getElementById("bookmark-btn"),
  adminNav: document.getElementById("admin-nav"),
  adminRoadmapButton: document.getElementById("admin-roadmap-btn"),
  adminAccessButton: document.getElementById("admin-access-btn"),
  changePasswordButton: document.getElementById("change-password-btn"),
  passwordDialog: document.getElementById("password-dialog"),
  passwordForm: document.getElementById("password-form"),
  passwordError: document.getElementById("password-error"),
  closePasswordButton: document.getElementById("close-password-btn"),
  profileTrigger: document.getElementById("profile-trigger"),
  profileMenu: document.getElementById("profile-menu"),
  profileAvatar: document.getElementById("profile-avatar"),
  profileName: document.getElementById("profile-name"),
  profileEmail: document.getElementById("profile-email"),
  profileRole: document.getElementById("profile-role"),
  profilePasswordButton: document.getElementById("profile-password-btn"),
  progressDialog: document.getElementById("user-progress-dialog"),
  progressDialogTitle: document.getElementById("progress-dialog-title"),
  progressDialogSummary: document.getElementById("progress-dialog-summary"),
  progressDialogDays: document.getElementById("progress-dialog-days"),
  closeProgressButton: document.getElementById("close-progress-btn"),
  pendingPanel: document.getElementById("pending-panel"),
  pendingLogoutButton: document.getElementById("pending-logout-btn"),
  adminPanel: document.getElementById("admin-panel"),
  adminStats: document.getElementById("admin-stats"),
  usersTable: document.getElementById("users-table-body"),
  adminError: document.getElementById("admin-error"),
};

const progressElements = {
  text: elements.progressText,
  percent: elements.progressPercent,
  fill: elements.progressFill,
};
let currentUser;
let currentWeek = 1;
let completedDays = [];

function setView(view) {
  document.querySelectorAll("[data-user-view]").forEach((element) => {
    element.hidden = view !== "user";
  });
  elements.pendingPanel.hidden = view !== "pending";
  elements.adminPanel.hidden = view !== "admin";
  elements.adminNav.hidden = !currentUser || currentUser.role !== "admin";
  elements.profileTrigger.hidden = !currentUser;
}

function refresh() {
  const week = plan.find((item) => item.week === currentWeek);
  renderWeeks(elements.weekList, plan, currentWeek, completedDays, selectWeek);
  renderDays(elements.days, week, completedDays, toggleDay);
  updateProgress(progressElements, completedDays, 60);
}

function selectWeek(weekNumber) {
  currentWeek = weekNumber;
  refresh();
}

async function toggleDay(dayNumber) {
  completedDays = completedDays.includes(dayNumber)
    ? completedDays.filter((day) => day !== dayNumber)
    : [...completedDays, dayNumber];
  completedDays = await saveCompletedDays(completedDays);
  refresh();
}

async function showApp(user) {
  currentUser = user;
  elements.authScreen.hidden = true;
  elements.appShell.hidden = false;
  elements.userName.textContent = `${user.name} (${user.email})`;
  elements.profileAvatar.textContent = user.name.charAt(0).toUpperCase();
  elements.profileName.textContent = user.name;
  elements.profileEmail.textContent = user.email;
  elements.profileRole.textContent =
    user.role === "admin" ? "Administrator" : "Roadmap member";
  if (!user.approved) {
    setView("pending");
    return;
  }
  if (user.role === "admin") {
    setView("admin");
    await refreshAdmin();
    return;
  }
  completedDays = await getCompletedDays();
  refresh();
}

async function refreshAdmin() {
  try {
    const users = await getUsers();
    const pending = users.filter((user) => !user.approved).length;
    const approved = users.filter((user) => user.approved).length;
    elements.adminStats.innerHTML = `<div><strong>${users.length}</strong><span>Total accounts</span></div><div><strong>${pending}</strong><span>Pending review</span></div><div><strong>${approved}</strong><span>Approved</span></div>`;
    elements.usersTable.innerHTML = users
      .map(
        (user) =>
          `<tr><td><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.email)}</small></td><td><span class="role-pill ${escapeHtml(user.role)}">${escapeHtml(user.role)}</span></td><td><span class="status-pill ${user.approved ? "approved" : "pending"}">${user.approved ? "Approved" : "Pending"}</span></td><td><button class="progress-link" data-progress-id="${escapeHtml(user.id)}">${user.completedCount}/60 days</button></td><td>${user.role === "admin" ? '<span class="muted">Protected</span>' : `<button class="table-action" data-user-id="${escapeHtml(user.id)}" data-approved="${!user.approved}">${user.approved ? "Suspend" : "Approve"}</button><button class="delete-action" data-delete-id="${escapeHtml(user.id)}" type="button" aria-label="Delete ${escapeHtml(user.name)}"><i class="fas fa-trash"></i></button>`}</td></tr>`,
      )
      .join("");
    elements.usersTable.querySelectorAll("[data-user-id]").forEach((button) =>
      button.addEventListener("click", async () => {
        button.disabled = true;
        try {
          await setApproval(
            button.dataset.userId,
            button.dataset.approved === "true",
          );
          await refreshAdmin();
        } catch (error) {
          elements.adminError.textContent = error.message;
          elements.adminError.hidden = false;
          button.disabled = false;
        }
      }),
    );
    elements.usersTable
      .querySelectorAll("[data-progress-id]")
      .forEach((button) =>
        button.addEventListener("click", () => {
          showUserProgress(
            users.find((user) => user.id === button.dataset.progressId),
          );
        }),
      );
    elements.usersTable.querySelectorAll("[data-delete-id]").forEach((button) =>
      button.addEventListener("click", async () => {
        const user = users.find((item) => item.id === button.dataset.deleteId);
        if (
          !user ||
          !confirm(`Delete ${user.name}'s account and progress permanently?`)
        )
          return;
        try {
          await deleteUser(user.id);
          await refreshAdmin();
        } catch (error) {
          elements.adminError.textContent = error.message;
          elements.adminError.hidden = false;
        }
      }),
    );
  } catch (error) {
    elements.adminError.textContent = error.message;
    elements.adminError.hidden = false;
  }
}

function showUserProgress(user) {
  if (!user) return;
  elements.progressDialogTitle.textContent = `${user.name}'s progress`;
  elements.progressDialogSummary.innerHTML = `<strong>${user.completedCount}/60</strong><span>days completed</span>`;
  elements.progressDialogDays.innerHTML = user.completedDays.length
    ? user.completedDays.map((day) => `<span>Day ${day}</span>`).join("")
    : '<p class="muted">No completed days yet.</p>';
  elements.progressDialog.showModal();
}

function showAuth() {
  elements.appShell.hidden = true;
  elements.authScreen.hidden = false;
  elements.loginForm.hidden = false;
  elements.registerForm.hidden = true;
  elements.authTitle.textContent = "Welcome back";
  elements.authDescription.textContent =
    "Sign in to keep your roadmap progress synced to this browser.";
  elements.authSwitch.textContent = "Create a new account";
  elements.adminNav.hidden = true;
  elements.profileMenu.hidden = true;
  elements.profileTrigger.setAttribute("aria-expanded", "false");
  setView("user");
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ],
  );
}

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.loginForm);
  elements.loginError.hidden = true;
  try {
    const user = await signIn(formData.get("email"), formData.get("password"));
    elements.loginForm.reset();
    await showApp(user);
  } catch (error) {
    elements.loginError.textContent = error.message;
    elements.loginError.hidden = false;
  }
});

elements.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.registerForm);
  elements.registerError.hidden = true;
  if (formData.get("password") !== formData.get("confirmPassword")) {
    elements.registerError.textContent = "Passwords do not match.";
    elements.registerError.hidden = false;
    return;
  }
  try {
    const user = await register(
      formData.get("name"),
      formData.get("email"),
      formData.get("password"),
    );
    elements.registerForm.reset();
    await showApp(user);
  } catch (error) {
    elements.registerError.textContent = error.message;
    elements.registerError.hidden = false;
  }
});

elements.authSwitch.addEventListener("click", () => {
  const showingLogin = !elements.loginForm.hidden;
  elements.loginForm.hidden = showingLogin;
  elements.registerForm.hidden = !showingLogin;
  elements.authTitle.textContent = showingLogin
    ? "Create your account"
    : "Welcome back";
  elements.authDescription.textContent = showingLogin
    ? "Create a secure account to save your roadmap progress."
    : "Sign in to keep your roadmap progress synced to this browser.";
  elements.authSwitch.textContent = showingLogin
    ? "Already have an account? Sign in"
    : "Create a new account";
});

elements.logoutButton.addEventListener("click", async () => {
  await signOut();
  currentUser = null;
  showAuth();
});
elements.pendingLogoutButton.addEventListener("click", async () => {
  await signOut();
  currentUser = null;
  showAuth();
});

elements.adminRoadmapButton.addEventListener("click", async () => {
  completedDays = await getCompletedDays();
  setView("user");
  refresh();
});

elements.adminAccessButton.addEventListener("click", async () => {
  setView("admin");
  await refreshAdmin();
});

elements.changePasswordButton.addEventListener("click", () => {
  elements.passwordError.hidden = true;
  elements.passwordForm.reset();
  elements.passwordDialog.showModal();
});

elements.closePasswordButton.addEventListener("click", () =>
  elements.passwordDialog.close(),
);
elements.closeProgressButton.addEventListener("click", () =>
  elements.progressDialog.close(),
);

elements.profileTrigger.addEventListener("click", () => {
  const isOpen = !elements.profileMenu.hidden;
  elements.profileMenu.hidden = isOpen;
  elements.profileTrigger.setAttribute("aria-expanded", String(!isOpen));
});
elements.profilePasswordButton.addEventListener("click", () => {
  elements.profileMenu.hidden = true;
  elements.changePasswordButton.click();
});

elements.passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.passwordForm);
  elements.passwordError.hidden = true;
  if (formData.get("newPassword") !== formData.get("confirmNewPassword")) {
    elements.passwordError.textContent = "The new passwords do not match.";
    elements.passwordError.hidden = false;
    return;
  }
  try {
    await changePassword(
      formData.get("currentPassword"),
      formData.get("newPassword"),
    );
    elements.passwordDialog.close();
  } catch (error) {
    elements.passwordError.textContent = error.message;
    elements.passwordError.hidden = false;
  }
});

elements.todayButton.addEventListener("click", () => {
  const targetDay = 12;
  currentWeek = plan.find((week) =>
    week.days.some((day) => day.day === targetDay),
  ).week;
  refresh();
  const target = document.querySelector(`[data-day="${targetDay}"]`);
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
});

elements.resetButton.addEventListener("click", async () => {
  if (!confirm("Are you sure you want to reset your progress?")) return;
  completedDays = [];
  completedDays = await saveCompletedDays(completedDays);
  refresh();
});

elements.printButton.addEventListener("click", () => window.print());
elements.bookmarkButton.addEventListener("click", () => {
  const isBookmarked =
    elements.bookmarkButton.getAttribute("aria-pressed") === "true";
  elements.bookmarkButton.setAttribute("aria-pressed", String(!isBookmarked));
  elements.bookmarkButton.innerHTML = `<i class="fas fa-star"></i> ${isBookmarked ? "Bookmark" : "Bookmarked"}`;
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
const session = await getCurrentUser();
if (session) await showApp(session);
