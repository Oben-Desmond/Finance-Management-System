let initialized = false;

async function updateExpensesView() {
  let expenses = await window.api.totalIncomeExpenses();
  expensesState = expenses;

  getBudgetStats();
}

async function getBudgetStats(total_sum, sum) {


}

function formatMoney(price) {
  let dollarUSLocale = Intl.NumberFormat("en-US");
  return dollarUSLocale.format(price);
}

async function addBudgetHead(budget) {
  // expense_error.innerHTML = ""
  await window.api.addBudgetHeadIncome(budget);
}

async function updateBudgetHeadView() {
  let bh = await window.api.getBudgetData();


  let tableEl = document.getElementById("expense-table");
  budgetHeadState = bh;
  let total_bh_expenses = []
  let total_sum = 0;
  let tableString = bh
    .map((expense) => {

      let sum = 0;
      const bh_expense_match = expensesState.filter(
        (exp) => exp.budget_head == expense.id
      );
      total_bh_expenses = [...total_bh_expenses, ...bh_expense_match]

      bh_expense_match.map((exp) => {
        sum += Math.abs(exp.amount)
      })
      total_sum += Math.abs(expense.amount - sum)


      return `<tr>
          <td>${expense.id}</td>
          <td>${expense.name}</td>
          <td>${expense.description}</td>
          <td>${Math.abs(expense.amount - sum)}</td>
          <td>${expense.amount}</td>
          <td>
            <button onclick="editBudgetHead(${expense.id})" id="editBtn">Edit</button>
            <button onclick="deleteBudgetHead(${expense.id})" id="deleteBtn">Delete</button>
          </td>
          </tr>`;
    })
    .join("<br/>");

  tableEl.innerHTML = tableString;
  let sum = 0;
  bh.map((b) => {
    sum += Math.abs(b.amount);
  })

  // let bh_expense_total = 0;
  // total_bh_expenses.map(res => {
  //   bh_expense_total += Math.abs(res.amount)
  // })

  tableEl.innerHTML += `<tr>
  <td></td>
  <td> </td>
  <td></td>
  <td>${formatMoney(total_sum)}</td>
  <td>${formatMoney(sum)}</td>
  <td></td>
</tr>`;

  if (initialized) {
    return;
  }

  try {
    $("#studentList").DataTable({
      aLengthMenu: [
        [25, 50, 75, -1],
        [25, 50, 75, "All"],
      ],
      iDisplayLength: 75,
      dom: "Bfrtip",
    });
  } catch (err) {
    console.log(err)
  }

  initialized = true;

  getBudgetStats(total_sum, sum);
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");
  console.log(window);

  // // TOTAL INCOME
  // let income = await window.api.totalIncome();
  // let incomeData = document.getElementById("totalIncome");
  // incomeData.innerHTML = (income || '') + " FCFA";

  // // TOTAL INCOME

  updateExpensesView();
  updateBudgetHeadView();

  // // // TOTAL RUNNING COST
  // let Rcost = await window.api.runningCost();
  // let RcostData = document.getElementById("runningCost");
  // RcostData.innerHTML = Rcost + " FCFA";

  // // // TOTAL RUNNING COST BALANCE
  // let RcostBalance = await window.api.runningCostBalance();
  // let RcostBalanceData = document.getElementById("runningCostBalance");
  // RcostBalanceData.innerHTML = RcostBalance + " FCFA";

  // // // TOTAL NUMBER OF STUDENTS
  // let studentNumber = await window.api.getStudents();
  // let ttlStudent = document.getElementById("studentNumber");
  // ttlStudent.innerHTML = studentNumber.length;

  // // GETTING ALL DEPARTMENTS
  // let departments = await window.api.getDepartments();
  // let deptNumber = document.getElementById("departmentNumber");
  // deptNumber.innerHTML = departments.length; // NUMBER OF DEPARTMENTS

  // // LISTING DEPARTMES
  // let tableData = document.getElementById("departments");
  // console.log(departments);
  // let departmentString = departments
  //   .map((dept) => {
  //     return `<option id="${dept.Did}" value="${dept.department_name}">${dept.department_name}</option>`;
  //   })
  //   .join("<br/>");

  // tableData.innerHTML = departmentString;

  // // ADDING A NEW EXPENDITURE
  // const expenseForm = document.getElementById("expenseForm");
  // expenseForm.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   const expenditure = {
  //     department: document.querySelector("#departments").value,
  //     category: document.querySelector("#category").value,
  //     amount: document.querySelector("#amount").value,
  //     issuedTo: document.querySelector("#issuedTo").value,
  //   };

  //   let newExpenditure = window.api.addExpenditure(
  //     (department = expenditure.department),
  //     (category = expenditure.category),
  //     (amount = expenditure.amount),
  //     (issuedTo = expenditure.issuedTo)
  //   );
  // });
});
