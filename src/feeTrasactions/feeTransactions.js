document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  // ############# GET ALL TRANSACTIONS ###################################################################
  let transations = await window.api.getFeeTransactions();
  let tableData = document.getElementById("students");

  let transationsString = transations
    .map((stud, index) => {
      return `<tr id="${stud.id}">
      <td>${index + 1}</td>
          <td>${stud.student_number}</td>
          <td>${stud.reg_number}</td>
          <td>${stud.student_name}</td>
          <td>${stud.amount}</td>
          <td>${stud.balance}</td>
          <td>${stud.Timestamp}</td>
          </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = transationsString;
});
