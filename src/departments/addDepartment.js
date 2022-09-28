document.addEventListener("DOMContentLoaded", async () => {
  console.log("Renderer > DOMContentLoaded");
  console.log(window);
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const department = {
      department_name: document.querySelector("#departmentName").value,
      description: document.querySelector("#departmentDescription").value,
      running_cost: document.querySelector("#runningCost").value,
      balance: document.querySelector("#runningCost").value,
    };

    // ADDING A STUDENT
    let newDepartment = window.api.addDepartment(
      (department_name = department.department_name),
      (description = department.description),
      (running_cost = department.running_cost),
      (balance = department.balance)
    );
  });
});
