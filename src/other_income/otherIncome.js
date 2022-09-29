document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");

  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const income = {
      source: document.querySelector("#source").value,
      sourceName: document.querySelector("#sourceName").value,
      amount: document.querySelector("#amount").value,
    };

    // ADDING OTHER INCOME
    let newIncome = window.api.addIncome(
      (source = income.source),
      (sourceName = income.sourceName),
      (amount = income.amount)
    );
  });
});
