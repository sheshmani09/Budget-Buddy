//globals

let transactionType = "expense";
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateSummary();
  renderTransactions();
  showOverview();
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
    themeBtn.textContent = "🌞";
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
    description: desc.value.trim() || categorySelector.value,
    amount: parseFloat(amount.value),
    date: date.value || new Date().toISOString().split("T")[0],
    category: categorySelector.value,
  };
  transactions.unshift(transaction); //adds transaction to array
  localStorage.setItem("transactions", JSON.stringify(transactions)); //adds to local storage

  updateSummary(); //updates summary
  renderTransactions();
  showOverview();

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
      "flex justify-between items-center bg-slate-200 dark:bg-slate-800 px-3 py-2 my-2 rounded-lg shadow-md hover:shadow-lg hover:scale-103 transition-all";

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
  transactions = transactions.filter((t) => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateSummary();
  renderTransactions();
  showOverview();
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

// overview section

const categoryIcons = {
  Food: "fa-utensils",
  Rent: "fa-house",
  Grocery: "fa-basket-shopping",
  Shopping: "fa-cart-shopping",
  Health: "fa-heart-pulse",
  Transport: "fa-car",
  Entertainment: "fa-photo-film",
  Education: "fa-book",
  Salary: "fa-money-bill-wave",
  Bonus: "fa-gift",
  Allowance: "fa-wallet",
  Investment: "fa-chart-line",
  Cash: "fa-coins",
  Other: "fa-circle-question",
};

const expenseColors = {
  Food: "bg-orange-500 text-orange-600",
  Rent: "bg-purple-500 text-purple-600",
  Grocery: "bg-green-500 text-green-600",
  Shopping: "bg-pink-500 text-pink-600",
  Health: "bg-red-500 text-red-600",
  Transport: "bg-blue-500 text-blue-600",
  Entertainment: "bg-yellow-500 text-yellow-600",
  Education: "bg-indigo-500 text-indigo-600",
  Other: "bg-gray-500 text-gray-600",
};
const incomeColors = {
  Salary: "bg-green-500 text-green-600",
  Bonus: "bg-blue-500 text-blue-600",
  Allowance: "bg-purple-500 text-purple-600",
  Investment: "bg-teal-500 text-teal-600",
  Cash: "bg-yellow-500 text-yellow-600",
  Other: "bg-gray-500 text-gray-600",
};

function showOverview() {
  renderOverview(
    transactions.filter((t) => t.type === "income"),
    document.getElementById("income-overview"),
    incomeColors
  );
  renderOverview(
    transactions.filter((t) => t.type === "expense"),
    document.getElementById("expense-overview"),
    expenseColors
  );
}

function renderOverview(items, container, colorsMap) {
  if (items.length === 0) {
    container.innerHTML = `<p class="placeholder text-center text-slate-500">No Data Available!</p>`;
    return;
  }

  const groups = {};
  let total = 0;

  items.forEach((tx) => {
    groups[tx.category] = (groups[tx.category] || 0) + tx.amount;
    total += tx.amount;
  });

  const sortedGroups = Object.entries(groups).sort((a, b) => b[1] - a[1]);

  let html = "";
  for (const [cat, amt] of sortedGroups) {
    const percent = ((amt / total) * 100).toFixed(1);
    const iconClass = categoryIcons[cat] || "fa-circle";
    const colorClass = colorsMap[cat] || "bg-gray-500 text-gray-600";

    const [bgClass, textClass] = colorClass.split(" ");

    html += `<div class="bg-slate-200 dark:bg-slate-800 p-3 rounded-lg shadow-lg hover:scale-103 transition-all">
      <div class="flex justify-between items-center text-sm font-medium mb-1">
        <div class="flex items-center gap-2">
          <i class="fa-solid ${iconClass} ${textClass}"></i> 
          <span>${cat}</span>
        </div>
        <span>${percent}% • ₹${amt.toFixed(
      2
    )}</span> <!-- 🔹 changed (added amount display) -->
      </div>
      <div class="w-full bg-slate-300 dark:bg-slate-700 h-2 rounded">
        <div class="${bgClass} h-2 rounded" style="width:${percent}%"></div> 
      </div>
    </div>`;
  }

  container.innerHTML = html;
}
