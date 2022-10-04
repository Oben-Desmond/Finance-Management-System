document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  function formatMoney(price) {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(price);
  }

  // GETTING ALL DEPARTMENTS
  let incomes = await window.api.getOtherIncomes();
  let tableData = document.getElementById("allincomes");
  let incomeString = incomes
    .map((dept, index) => {
      return `<tr class="accordion">
          <td>${index + 1}</td>
          <td>${dept.source}</td>
          <td>${dept.source_name}</td>
          <td>${formatMoney(dept.amount)}</td>
          <td>${dept.Timestamp}</td>
          </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = incomeString;
});
