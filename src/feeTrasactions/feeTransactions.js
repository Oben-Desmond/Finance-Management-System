document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  function formatMoney(price) {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(price);
  }

  // ############# GET ALL TRANSACTIONS ###################################################################
  let transations = await window.api.getFeeTransactions();
  let tableData = document.getElementById("students");
  let tableFooter = document.getElementById("totalSums");

  let totalFee = 0;
  let totalBalance = 0;

  let totalFeeString = transations.map((fee, index) => {
    return (totalFee += fee.amount);
  });
  let totalBalanceString = transations.map((fee, index) => {
    return (totalBalance += fee.balance);
  });

  var totalSums = `<tr>
  <td colspan="4">SUM TOTALS</td>
  <td>${formatMoney(totalFee)}</td>
  <td>${formatMoney(totalBalance)}</td>
  </tr>`;

  let transationsString = transations
    .map((stud, index) => {
      return `<tr id="${stud.id}">
      <td>${index + 1}</td>
          <td>${stud.student_number}</td>
          <td>${stud.reg_number}</td>
          <td>${stud.student_name}</td>
          <td>${formatMoney(stud.amount)}</td>
          <td>${formatMoney(stud.balance)}</td>
          <td>${stud.Timestamp}</td>
          </tr>`;
    })
    .join("<br/>");

  tableData.innerHTML = transationsString;
  tableFooter.innerHTML = totalSums;
});
