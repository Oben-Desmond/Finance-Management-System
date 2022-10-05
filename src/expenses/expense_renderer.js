let initialized = false;

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

  let tableElSum = document.getElementById("exptotalSums");
  tableElSum.innerHTML = `<tr>
  <td colspan="4">SUM TOTAL</td>
  <td>${formatMoney(sum)}</td>
  </tr>`;

  if (initialized) {
    return;
  }

  try {
    $("#studentExpenseList").DataTable({
      aLengthMenu: [
        [25, 50, 75, -1],
        [25, 50, 75, "All"],
      ],
      iDisplayLength: 75,
      dom: "Bfrtip",
      buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
    });
  } catch (err) {
    console.log(err);
  }

  initialized = true;
}

async function getBudgetStats(total_sum, sum) {
  document.getElementById("select-bh").innerHTML = budgetHeadState.map(
    (bh, index) => {
      return `<option value='${bh.id}'>${bh.name}</option>`;
    }
  );
  document.getElementById("select-bh").innerHTML = budgetHeadState.map(
    (bh, index) => {
      return `<option value='${bh.id}'>${bh.name}</option>`;
    }
  );
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
