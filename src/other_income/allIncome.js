document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  // GETTING ALL DEPARTMENTS
  let incomes = await window.api.getOtherIncomes();
  let tableData = document.getElementById("allincomes");
  let incomeString = incomes
    .map((dept, index) => {
      return `<tr class="accordion">
          <td>${index + 1}</td>
          <td>${dept.source}</td>
          <td>${dept.source_name}</td>
          <td>${dept.amount}</td>
          <td>${dept.Timestamp}</td>
          </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = incomeString;
});
