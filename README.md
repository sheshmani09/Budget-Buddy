# Budget-Buddy
a fully functional expense tracker built using html, tailwind css and javaScript



| Role         | Color Name             | Light Mode Color | Dark Mode Color | Usage                               |
| ------------ | ---------------------- | ---------------- | --------------- | ----------------------------------- |
| Primary      | Orange                 | `#FFA500`        | `#FFA500`       | Buttons, highlights, main actions   |
| Positive     | Green                  | `#4CAF50`        | `#22C55E`       | Income indicators, positive amounts |
| Negative     | Red                    | `#F44336`        | `#F87171`       | Expenses, negative amounts          |
| Background   | Light Gray             | `#F0F0F0`        | `#1F2A3B`       | App background                      |
| Card/Surface | Medium Gray            | `#E0E0E0`        | `#2D3748`       | Cards, tables, sections             |
| Text         | Dark Gray / Light Gray | `#111827`        | `#E5E7EB`       | Main text                           |

| Role         | Tailwind Class (Light Mode) | Tailwind Class (Dark Mode) | Usage                               |
| ------------ | --------------------------- | -------------------------- | ----------------------------------- |
| Primary      | `bg-orange-500 text-white`  | `bg-orange-500 text-black` | Buttons, highlights, main actions   |
| Positive     | `text-green-500`            | `text-green-500`           | Income indicators, positive amounts |
| Negative     | `text-red-500`              | `text-red-400`             | Expenses, negative amounts          |
| Background   | `bg-gray-100`               | `dark:bg-gray-900`         | App background                      |
| Card/Surface | `bg-gray-200`               | `dark:bg-gray-700`         | Cards, tables, sections             |
| Text         | `text-gray-900`             | `dark:text-gray-200`       | Main text                           |


Alright — let’s walk through this step by step, like building blocks. You’ll just focus on **HTML structure first**, nothing fancy.

### 🔹 Step 1: Header

* Add a header at the very top.
* It has:

  * A **title** (your app name — “BudgetBuddy”)
  * A short **subtitle/tagline** (“Track your expenses easily”).

---

### 🔹 Step 2: Summary Cards

* Just below the header, create a section with **three small blocks** side by side.
* Each block has:

  * A heading (Income / Expenses / Balance)
  * A number (₹0.00 for now).

---

### 🔹 Step 3: Main Section (Split into 2 columns)

This is the biggest part of the page.

* Left side → **Transaction Form**

  * Type (Income / Expense buttons)
  * Description (input field)
  * Amount (input field)
  * Date (date picker)
  * Category (dropdown)
  * Submit button

* Right side → **Transactions List**

  * Heading ("Transactions")
  * Filter dropdown (All / Income / Expenses)
  * Placeholder text (“No transactions found”).

---

### 🔹 Step 4: Monthly Overview

At the bottom, another wide section split into **two parts**:

* Left → Expense Categories (list of categories + progress bars).
* Right → Recent Transactions (list of past transactions with date + amount).

---

### 🔹 Step 5: Footer (optional, later)

If you want, you can add a simple footer (e.g., “Made with ❤️ by Sheshmani”).

---

👉 If you follow this order, you’ll have the exact skeleton ready.

Do you want me to also give you a **visual block diagram** (like boxes showing how these sections are stacked and split), so you can see the structure at a glance before coding?
