document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const department = {
      department_name: document.querySelector("#departmentName").value,
      description: document.querySelector("#departmentDescription").value,
      fee_amount: document.querySelector("#feeAmount").value,
    };

    // ADDING A STUDENT
    let newDepartment = window.api.addDepartment(
      (department_name = department.department_name),
      (description = department.description),
      (fee_amount = department.fee_amount)
    );
  });
});
