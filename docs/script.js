//globals

let transactionType = "expense";
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateSummary();
  renderTransactions();
});

// getting elements
const themeBtn = document.getElementById("theme-toggle");
const bodyEl = document.body;
const form = document.querySelector("form");
const incomeBtn = document.getElementById("income-btn");
const expenseBtn = document.getElementById("expense-btn");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const date = document.getElementById("date");
const categorySelector = document.getElementById("category-selector");
const incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const balanceAmount = document.getElementById("balance-amount");
const transactionList = document.getElementById("transaction-list");

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

//category selector
const categories = {
  income: ["Salary", "Bonus", "Allowance", "Investment", "Cash", "Other"],
  expense: [
    "Food",
    "Rent",
    "Grocery",
    "Shopping",
    "Health",
    "Transport",
    "Entertainment",
    "Education",
    "Other",
  ],
};

function addCategories(type) {
  categorySelector.innerHTML = "";
  categories[type].forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelector.append(option);
  });
}
addCategories(transactionType);

//income type
incomeBtn.addEventListener("click", () => {
  transactionType = "income";
  incomeBtn.classList.add("bg-green-500", "dark:bg-green-700");
  expenseBtn.classList.remove("bg-red-500", "dark:bg-red-700");
  addCategories("income");
});
//expense type
expenseBtn.addEventListener("click", () => {
  transactionType = "expense";
  expenseBtn.classList.add("bg-red-500", "dark:bg-red-700");
  incomeBtn.classList.remove("bg-green-500", "dark:bg-green-700");
  addCategories("expense");
});

//form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    id: Date.now(), //to give unique id to transactions
    type: transactionType,
    description: desc.value.trim(),
    amount: parseFloat(amount.value),
    date: date.value || new Date().toISOString().split("T")[0],
    category: categorySelector.value,
  };
  transactions.unshift(transaction); //adds transaction to array
  localStorage.setItem("transactions", JSON.stringify(transactions)); //adds to local storage

  updateSummary(); //updates summary
  renderTransactions();

  form.reset();

  transactionType = "expense";
  expenseBtn.classList.add("bg-red-500", "dark:bg-red-700");
  incomeBtn.classList.remove("bg-green-500", "dark:bg-green-700");
  addCategories("expense");
});

//summary updates

function updateSummary() {
  let income = 0;
  let expense = 0;
  transactions.forEach((tx) => {
    if (tx.type === "income") {
      income += tx.amount;
    } else if (tx.type === "expense") {
      expense += tx.amount;
    }
  });

  let balance = income - expense;

  incomeAmount.textContent = income.toFixed(2);
  expenseAmount.textContent = expense.toFixed(2);
  balanceAmount.textContent = balance.toFixed(2);
}

function renderTransactions() {
  transactionList.innerHTML = ""; // clear old content
  const filteredTx = txFilter();

  if (filteredTx.length === 0) {
    transactionList.innerHTML = `<p class="text-center text-slate-500 pt-12 sm:pt-20">No transaction yet.</p>`;
    return;
  }

  filteredTx.forEach((tx) => {
    const item = document.createElement("div");
    item.className =
      "flex justify-between items-center bg-slate-300 dark:bg-slate-800 px-3 py-2 my-2 rounded-lg shadow-md hover:shadow-md hover:scale-105 transition-shadow";

    item.innerHTML = `
      <div>
        <p class="font-semibold">${
          tx.category
        } • <span class="text-slate-500">${dateToIN(tx.date)}</span> </p>
        <p class="text-sm text-slate-700 dark:text-slate-500">${
          tx.description
        }</p>
      </div >
      <div class="flex gap-2">
  <div class="font-bold ${
    tx.type === "income" ? "text-green-600" : "text-red-600"
  }">
        ${tx.type === "income" ? "+" : "-"} ₹${tx.amount.toFixed(2)}
      </div>
      <button class="delete-btn hover:text-red-600 hover:scale-125 cursor-pointer">
      <i class="fa-solid fa-trash"></i>
      </button>
</div>
    `;

    const deleteBtn = item.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => deleteTx(tx.id));

    transactionList.appendChild(item);
  });
}

//to handle change in dropdown

document
  .getElementById("transaction-filter")
  .addEventListener("change", renderTransactions);

//date formatter

function dateToIN(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
// transaction delete

function deleteTx(id) {
  transactions = transactions.filter((t) => t.id != id);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateSummary();
  renderTransactions();
}

// filter transactions

function txFilter() {
  const filter = document.getElementById("transaction-filter").value;

  if (filter === "Incomes") {
    return transactions.filter((t) => t.type === "income");
  } else if (filter === "Expenses") {
    return transactions.filter((t) => t.type === "expense");
  } else {
    return transactions;
  }
}
