document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");
  console.log(window);

  // // TOTAL INCOME
  let income = await window.api.totalIncome();
  let incomeData = document.getElementById("totalIncome");
  incomeData.innerHTML = income + " FCFA";

  // // TOTAL RUNNING COST
  let Rcost = await window.api.runningCost();
  let RcostData = document.getElementById("runningCost");
  RcostData.innerHTML = Rcost + " FCFA";

  // // TOTAL RUNNING COST BALANCE
  let RcostBalance = await window.api.runningCostBalance();
  let RcostBalanceData = document.getElementById("runningCostBalance");
  RcostBalanceData.innerHTML = RcostBalance + " FCFA";

  // // TOTAL NUMBER OF STUDENTS
  let studentNumber = await window.api.getStudents();
  let ttlStudent = document.getElementById("studentNumber");
  ttlStudent.innerHTML = studentNumber.length;

  // GETTING ALL DEPARTMENTS
  let departments = await window.api.getDepartments();
  let deptNumber = document.getElementById("departmentNumber");
  deptNumber.innerHTML = departments.length; // NUMBER OF DEPARTMENTS

  // LISTING DEPARTMES
  let tableData = document.getElementById("departments");
  console.log(departments);
  let departmentString = departments
    .map((dept) => {
      return `<option id="${dept.Did}" value="${dept.department_name}">${dept.department_name}</option>`;
    })
    .join("<br/>");

  tableData.innerHTML = departmentString;

  // ADDING A NEW EXPENDITURE
  const expenseForm = document.getElementById("expenseForm");
  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const expenditure = {
      department: document.querySelector("#departments").value,
      category: document.querySelector("#category").value,
      amount: document.querySelector("#amount").value,
      issuedTo: document.querySelector("#issuedTo").value,
    };

    let newExpenditure = window.api.addExpenditure(
      (department = expenditure.department),
      (category = expenditure.category),
      (amount = expenditure.amount),
      (issuedTo = expenditure.issuedTo)
    );
  });
});
