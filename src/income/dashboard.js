document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  function formatMoney(price) {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(price);
  }

  // // TOTAL FEE INCOME
  let totalFeeIncome = await window.api.totalFeeIncome();
  let feeIncomeData = document.getElementById("feeIncome");
  feeIncomeData.innerHTML = formatMoney(totalFeeIncome) + " FCFA";

  // // TOTAL OTHER INCOME
  let totalOtherIncome = await window.api.otherIncomeTotal();
  let otherIncomeData = document.getElementById("otherIncome");
  otherIncomeData.innerHTML = formatMoney(totalOtherIncome) + " FCFA";

  // // TOTAL INCOME
  let income = parseInt(totalFeeIncome) + parseInt(totalOtherIncome);
  let incomeData = document.getElementById("totalIncome");
  incomeData.innerHTML = formatMoney(income) + " FCFA";

  // // TOTAL NUMBER OF STUDENTS
  let studentNumber = await window.api.getStudents();
  let ttlStudent = document.getElementById("studentNumber");
  ttlStudent.innerHTML = studentNumber.length;

  // GETTING ALL DEPARTMENTS
  let departments = await window.api.getDepartments();
  let deptNumber = document.getElementById("departmentNumber");
  deptNumber.innerHTML = departments.length; // NUMBER OF DEPARTMENTS

  // ADDING A NEW LEVEL
  const levelForm = document.getElementById("addLevel");
  levelForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const level = {
      level_name: document.querySelector("#level").value,
    };

    let newExpenditure = window.api.addLevel((level_name = level.level_name));
  });
});
