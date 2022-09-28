document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  // GETTING ALL DEPARTMENTS
  let expenditures = await window.api.getExpenditures();
  let tableData = document.getElementById("expenditureList");
  let expenditureString = expenditures
    .map((exps) => {
      return `<tr>
          <td>${exps.Eid}</td>
          <td>${exps.department}</td>
          <td>${exps.category}</td>
          <td>${exps.amount}</td>
          <td>${exps.issuedTo}</td>
          <td>${exps.Timestamp}</td>
          </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = expenditureString;
});
