//globals

let transactionType = "income";

// getting elements
const themeBtn = document.getElementById("theme-toggle");
const bodyEl = document.body;
const form = document.querySelector("form")
const incomeBtn = document.getElementById("income-btn");
const expenseBtn = document.getElementById("expense-btn");
const desc = document.getElementById("desc")
const amount = document.getElementById("amount")
const date = document.getElementById("date")


//theme-toggle
if (localStorage.getItem("theme") === "dark") {
  bodyEl.classList.add("dark");
  themeBtn.textContent = "🌙";
}

// theme-event
themeBtn.addEventListener("click", () => {
  if (bodyEl.classList.contains("dark")) {
    bodyEl.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeBtn.textContent = "☀";
  } else {
    bodyEl.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeBtn.textContent = "🌙";
  }
});

//income type
incomeBtn.addEventListener("click", () => {
  transactionType = "income";
  incomeBtn.classList.add("bg-green-500", "dark:bg-green-700");
  expenseBtn.classList.remove("bg-red-500", "dark:bg-red-700");
});
//expense type
expenseBtn.addEventListener("click", () => {
  transactionType = "expense";
  expenseBtn.classList.add("bg-red-500", "dark:bg-red-700");
  incomeBtn.classList.remove("bg-green-500", "dark:bg-green-700");
});

//form
