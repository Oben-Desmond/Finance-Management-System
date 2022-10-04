async function addExpense(expense) {
  // expense_error.innerHTML = ""
  try {
    await window.api.addIncomeExpense(expense);
  } catch (err) {
    // expense_error.innerHTML = err + "";
    console.log(err);
  }
}

async function updateExpensesView() {
  let expenses = await window.api.totalIncomeExpenses();
  let expensesEl = document.getElementById("total-expenses");
  expensesEl.innerHTML = expenses.length;
  expensesState = expenses;
  let tableEl = document.getElementById("expenses-table");
  let tableString = expenses
    .map((expense, index) => {
      return `<tr>
          <td>${index + 1}</td>
          <td>${expense.name}</td>
          <td>${expense.person}</td>
          <td>${expense.description}</td>
          <td>${formatMoney(expense.amount)}</td>
          </tr>`;
    })
    .join("<br/>");



  tableEl.innerHTML = tableString;
  updateBudgetHeadView();

  let sum = 0;
  expenses.map((exp) => {
    sum += +exp.amount;
  });

  tableEl.innerHTML += `<tr>
  <td></td>
  <td> </td>
  <td></td>
  <td></td>
  <td>${formatMoney(sum)}</td>
  </tr>`;
}

async function getBudgetStats(total_sum, sum) {
  document.getElementById("assigned-budget").innerHTML = formatMoney(total_sum);
  document.getElementById("balance-budget").innerHTML = formatMoney(sum);
  document.getElementById("total-bh").innerHTML = budgetHeadState.length;
  document.getElementById("select-bh").innerHTML = budgetHeadState.map(
    (bh, index) => {
      return `<option value='${bh.id}'>${bh.name}</option>`;
    }
  );
  document.getElementById("total-bh").innerHTML = budgetHeadState.length
  document.getElementById("select-bh").innerHTML = budgetHeadState.map((bh, index) => {
    return `<option value='${bh.id}'>${bh.name}</option>`;
  })

}

function formatMoney(price) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(price);
}

async function updateBudgetHeadView() {
  let bh = await window.api.getBudgetData();
  console.log(bh);
  budgetHeadState = bh;
  let total_bh_expenses = [];
  let total_sum = 0;
  bh.map((expense) => {
    let sum = 0;
    const bh_expense_match = expensesState.filter(
      (exp) => exp.budget_head == expense.id
    );
    total_bh_expenses = [...total_bh_expenses, ...bh_expense_match];

    bh_expense_match.map((exp) => {
      sum += Math.abs(exp.amount);
    });
    total_sum += Math.abs(expense.amount - sum);
  });
  let sum = 0;
  bh.map((b) => {
    sum += Math.abs(b.amount);
  });

  getBudgetStats(total_sum, sum);
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");
  console.log(window);

  updateExpensesView();
});
