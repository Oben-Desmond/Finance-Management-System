

// const expense_error = document.getElementById("expense_error");
let budgetHeadState = []



async function addExpense(expense) {
    // expense_error.innerHTML = ""
    try {
        await window.api.addIncomeExpense(expense)
    } catch (err) {
        // expense_error.innerHTML = err + "";
        console.log(err)
    }
}

async function updateExpensesView() {
    let expenses = await window.api.totalIncomeExpenses();
    let expensesEl = document.getElementById("total-expenses");
    expensesEl.innerHTML = expenses.length;
    let tableEl = document.getElementById("expenses-table");
    let tableString = expenses
        .map((expense, index) => {
            return `<tr>
          <td>${index + 1}</td>
          <td>${expense.name}</td>
          <td>${expense.amount}</td>
          <td>${expense.description}</td>
          
          </tr>`;
        })
        .join("<br/>");

    tableEl.innerHTML = tableString;


}


async function addBudgetHead(budget) {
    // expense_error.innerHTML = ""
    await window.api.addBudgetHeadIncome(budget)

}

async function updateBudgetHeadView() {
    let bh = await window.api.getBudgetData();
    let bhEl = document.getElementById("total-bh");

    bhEl.innerHTML = bh.length;
    let tableEl = document.getElementById("expense-table");
    budgetHeadState = bh;
    let tableString = bh
        .map((expense) => {
            return `<tr>
          <td>${expense.id}</td>
          <td>${expense.name}</td>
          <td>${expense.amount}</td>
          <td>${expense.description}</td>
          <td>
            <button onclick="editBudgetHead(${expense.id})" id="editBtn">Edit</button>
            <button onclick="deleteBudgetHead(${expense.id})" id="deleteBtn">Delete</button>
          </td>
          </tr>`;
        })
        .join("<br/>");

    tableEl.innerHTML = tableString;

    let selectBH = document.getElementById("select-bh");
    selectBH.innerHTML = bh
        .map((exp, index) => {
            return `
    <option value='${exp.id}'>${exp.name}</option>
    `;
        })
        .join("<br/>");
}




document.addEventListener("DOMContentLoaded", async () => {
    console.log("Renderer > DOMContentLoaded");
    console.log(window);

    // // TOTAL INCOME
    // let income = await window.api.totalIncome();
    // let incomeData = document.getElementById("totalIncome");
    // incomeData.innerHTML = (income || '') + " FCFA";

    // // TOTAL INCOME

    updateExpensesView()
    updateBudgetHeadView()




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
